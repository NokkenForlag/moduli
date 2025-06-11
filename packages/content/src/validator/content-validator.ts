import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import chalk from 'chalk';
import Ajv from 'ajv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ConceptMetadata {
  id: string;
  title: string;
  course: string;
  cluster: string;
  dependencies?: {
    prerequisites?: Array<{
      id: string;
      type: string;
      reason?: string;
    }>;
    enables?: Array<{
      id: string;
      type: string;
      reason?: string;
    }>;
    related?: Array<{
      id: string;
      type: string;
      bidirectional?: boolean;
    }>;
  };
  graph_tags?: any;
  exam_tasks?: Array<{
    id: string;
    type: string;
    year: number;
    topics: string[];
  }>;
}

interface Collection {
  id: string;
  title: string;
  concepts?: string[];
  clusters?: string[];
  parent?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  stats: ValidationStats;
}

interface ValidationError {
  type: 'missing_ref' | 'circular_dep' | 'schema_error' | 'inconsistent_relation';
  file: string;
  message: string;
  details?: any;
}

interface ValidationWarning {
  type: 'missing_inverse' | 'orphan_concept' | 'missing_metadata';
  file: string;
  message: string;
}

interface ValidationStats {
  totalConcepts: number;
  totalCollections: number;
  totalRelations: number;
  graphDensity: number;
}

class ContentValidator {
  private concepts: Map<string, ConceptMetadata> = new Map();
  private collections: Map<string, Collection> = new Map();
  private errors: ValidationError[] = [];
  private warnings: ValidationWarning[] = [];
  private ajv: Ajv;

  constructor(private basePath: string) {
    this.ajv = new Ajv({ allErrors: true });
  }

  async validate(): Promise<ValidationResult> {
    console.log(chalk.blue('🔍 Starter validering av Moduli-innhold...\n'));

    // 1. Les alle filer
    await this.loadContent();

    // 2. Valider mot schema
    await this.validateSchemas();

    // 3. Sjekk referanser
    this.checkReferences();

    // 4. Sjekk konsistens
    this.checkConsistency();

    // 5. Sjekk for sirkulære dependencies
    this.checkCircularDependencies();

    // 6. Generer statistikk
    const stats = this.generateStats();

    // 7. Returner resultat
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      stats
    };
  }

  private async loadContent() {
    // Les konsepter
    const conceptsPath = path.join(this.basePath, 'concepts');
    try {
      const conceptFiles = await fs.readdir(conceptsPath);
      
      for (const file of conceptFiles) {
        if (file.endsWith('.md')) {
          const content = await fs.readFile(path.join(conceptsPath, file), 'utf-8');
          const { data } = matter(content);
          
          if (data.id) {
            this.concepts.set(data.id, data as ConceptMetadata);
          } else {
            this.errors.push({
              type: 'schema_error',
              file: `concepts/${file}`,
              message: 'Konsept mangler ID'
            });
          }
        }
      }
    } catch (e) {
      console.log(chalk.yellow('⚠️  Ingen concepts-mappe funnet\n'));
    }

    // Les collections
    const collectionsPath = path.join(this.basePath, 'collections');
    try {
      const collectionFiles = await fs.readdir(collectionsPath);
      
      for (const file of collectionFiles) {
        if (file.endsWith('.yaml')) {
          const content = await fs.readFile(path.join(collectionsPath, file), 'utf-8');
          const data = yaml.load(content) as Collection;
          
          if (data.id) {
            this.collections.set(data.id, data);
          }
        }
      }
    } catch (e) {
      console.log(chalk.yellow('⚠️  Ingen collections-mappe funnet\n'));
    }

    console.log(chalk.green(`✅ Lastet ${this.concepts.size} konsepter og ${this.collections.size} collections\n`));
  }

  private async validateSchemas() {
    // Last schema
    const schemaPath = path.join(this.basePath, 'schemas', 'concept.schema.json');
    let schema;
    
    try {
      const schemaContent = await fs.readFile(schemaPath, 'utf-8');
      schema = JSON.parse(schemaContent);
    } catch (e) {
      console.log(chalk.yellow('⚠️  Kunne ikke laste concept.schema.json, hopper over schema-validering\n'));
      return;
    }

    const validate = this.ajv.compile(schema);

    for (const [id, concept] of this.concepts) {
      if (!validate(concept)) {
        this.errors.push({
          type: 'schema_error',
          file: `concept: ${id}`,
          message: 'Schema-valideringsfeil',
          details: validate.errors
        });
      }
    }
  }

  private checkReferences() {
    console.log(chalk.blue('🔗 Sjekker referanser...\n'));

    for (const [id, concept] of this.concepts) {
      // Sjekk prerequisites
      if (concept.dependencies?.prerequisites) {
        for (const prereq of concept.dependencies.prerequisites) {
          if (!this.concepts.has(prereq.id)) {
            this.errors.push({
              type: 'missing_ref',
              file: `concept: ${id}`,
              message: `Prerequisite '${prereq.id}' eksisterer ikke`
            });
          }
        }
      }

      // Sjekk enables
      if (concept.dependencies?.enables) {
        for (const enabled of concept.dependencies.enables) {
          if (!this.concepts.has(enabled.id)) {
            this.errors.push({
              type: 'missing_ref',
              file: `concept: ${id}`,
              message: `Enables-referanse '${enabled.id}' eksisterer ikke`
            });
          }
        }
      }

      // Sjekk cluster-referanse
      if (concept.cluster && !this.collections.has(concept.cluster)) {
        this.errors.push({
          type: 'missing_ref',
          file: `concept: ${id}`,
          message: `Cluster '${concept.cluster}' eksisterer ikke`
        });
      }
    }

    // Sjekk collection-referanser
    for (const [id, collection] of this.collections) {
      if (collection.concepts) {
        for (const conceptId of collection.concepts) {
          if (!this.concepts.has(conceptId)) {
            this.errors.push({
              type: 'missing_ref',
              file: `collection: ${id}`,
              message: `Konsept '${conceptId}' i collection eksisterer ikke`
            });
          }
        }
      }
    }
  }

  private checkConsistency() {
    console.log(chalk.blue('🔄 Sjekker konsistens i relasjoner...\n'));

    // Bygg invers-map for enables
    const enabledBy = new Map<string, Set<string>>();
    
    for (const [id, concept] of this.concepts) {
      if (concept.dependencies?.enables) {
        for (const enabled of concept.dependencies.enables) {
          if (!enabledBy.has(enabled.id)) {
            enabledBy.set(enabled.id, new Set());
          }
          enabledBy.get(enabled.id)!.add(id);
        }
      }
    }

    // Sjekk at prerequisites har motsvarende enables
    for (const [id, concept] of this.concepts) {
      if (concept.dependencies?.prerequisites) {
        for (const prereq of concept.dependencies.prerequisites) {
          const enablers = enabledBy.get(id) || new Set();
          
          if (!enablers.has(prereq.id)) {
            this.warnings.push({
              type: 'missing_inverse',
              file: `concept: ${id}`,
              message: `Prerequisite '${prereq.id}' mangler tilsvarende enables-relasjon`
            });
          }
        }
      }
    }

    // Sjekk for konsepter uten relasjoner (orphans)
    for (const [id, concept] of this.concepts) {
      const hasIncoming = enabledBy.has(id);
      const hasOutgoing = concept.dependencies?.enables && concept.dependencies.enables.length > 0;
      const hasPrereqs = concept.dependencies?.prerequisites && concept.dependencies.prerequisites.length > 0;
      
      if (!hasIncoming && !hasOutgoing && !hasPrereqs) {
        this.warnings.push({
          type: 'orphan_concept',
          file: `concept: ${id}`,
          message: 'Konsept har ingen relasjoner til andre konsepter'
        });
      }
    }
  }

  private checkCircularDependencies() {
    console.log(chalk.blue('🔄 Sjekker for sirkulære avhengigheter...\n'));

    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const hasCycle = (nodeId: string, path: string[] = []): boolean => {
      visited.add(nodeId);
      recursionStack.add(nodeId);
      path.push(nodeId);

      const concept = this.concepts.get(nodeId);
      if (concept?.dependencies?.prerequisites) {
        for (const prereq of concept.dependencies.prerequisites) {
          if (!visited.has(prereq.id)) {
            if (hasCycle(prereq.id, [...path])) {
              return true;
            }
          } else if (recursionStack.has(prereq.id)) {
            // Funnet sirkulær dependency
            const cycleStart = path.indexOf(prereq.id);
            const cycle = [...path.slice(cycleStart), prereq.id];
            
            this.errors.push({
              type: 'circular_dep',
              file: `concept: ${nodeId}`,
              message: `Sirkulær avhengighet funnet: ${cycle.join(' → ')}`,
              details: { cycle }
            });
            return true;
          }
        }
      }

      recursionStack.delete(nodeId);
      return false;
    };

    // Sjekk alle noder
    for (const [id] of this.concepts) {
      if (!visited.has(id)) {
        hasCycle(id);
      }
    }
  }

  private generateStats(): ValidationStats {
    let totalRelations = 0;
    
    for (const [_, concept] of this.concepts) {
      if (concept.dependencies?.prerequisites) {
        totalRelations += concept.dependencies.prerequisites.length;
      }
      if (concept.dependencies?.enables) {
        totalRelations += concept.dependencies.enables.length;
      }
      if (concept.dependencies?.related) {
        totalRelations += concept.dependencies.related.length;
      }
    }

    const maxPossibleRelations = this.concepts.size * (this.concepts.size - 1);
    const graphDensity = maxPossibleRelations > 0 ? totalRelations / maxPossibleRelations : 0;

    return {
      totalConcepts: this.concepts.size,
      totalCollections: this.collections.size,
      totalRelations,
      graphDensity: Math.round(graphDensity * 100) / 100
    };
  }

  printReport(result: ValidationResult) {
    console.log(chalk.blue('\n📊 VALIDERINGSRAPPORT\n'));
    console.log('═'.repeat(50));

    // Statistikk
    console.log(chalk.cyan('\n📈 Statistikk:'));
    console.log(`  • Konsepter: ${result.stats.totalConcepts}`);
    console.log(`  • Collections: ${result.stats.totalCollections}`);
    console.log(`  • Relasjoner: ${result.stats.totalRelations}`);
    console.log(`  • Graf-tetthet: ${result.stats.graphDensity * 100}%`);

    // Feil
    if (result.errors.length > 0) {
      console.log(chalk.red(`\n❌ Feil (${result.errors.length}):`));
      for (const error of result.errors) {
        console.log(chalk.red(`  • [${error.type}] ${error.file}: ${error.message}`));
        if (error.details) {
          console.log(chalk.gray(`    Detaljer: ${JSON.stringify(error.details, null, 2)}`));
        }
      }
    }

    // Advarsler
    if (result.warnings.length > 0) {
      console.log(chalk.yellow(`\n⚠️  Advarsler (${result.warnings.length}):`));
      for (const warning of result.warnings) {
        console.log(chalk.yellow(`  • [${warning.type}] ${warning.file}: ${warning.message}`));
      }
    }

    // Oppsummering
    console.log('\n' + '═'.repeat(50));
    if (result.valid) {
      console.log(chalk.green('\n✅ Validering fullført uten kritiske feil!\n'));
    } else {
      console.log(chalk.red(`\n❌ Validering feilet med ${result.errors.length} feil.\n`));
    }
  }
}

// CLI-kjøring
async function main() {
  const basePath = path.join(process.cwd(), 'src');
  const validator = new ContentValidator(basePath);
  
  try {
    const result = await validator.validate();
    validator.printReport(result);
    
    // Exit med feilkode hvis validering feiler
    process.exit(result.valid ? 0 : 1);
  } catch (error) {
    console.error(chalk.red('\n💥 Uventet feil under validering:'), error);
    process.exit(2);
  }
}

// Kjør main hvis dette er hovedfilen
main();

export { ContentValidator, ValidationResult };
