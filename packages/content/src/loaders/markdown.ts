import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import type { Concept, ConceptMeta } from '../types.js';
import { getContentPath } from '../paths.js';

export async function loadConcept(conceptId: string): Promise<Concept> {
  const contentPath = getContentPath('konsepter');
  const filePath = path.join(contentPath, `${conceptId}.md`);
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    meta: data as ConceptMeta,
    content
  };
}

export async function loadConcepts(conceptIds: string[]): Promise<Concept[]> {
  const concepts = await Promise.all(
    conceptIds.map(id => loadConcept(id))
  );
  return concepts;
}

export async function getAllConceptIds(): Promise<string[]> {
  const contentPath = getContentPath('konsepter');
  const files = await fs.readdir(contentPath);
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

export function extractRelations(concepts: Concept[]): Array<{ from: string; to: string; type: string }> {
  const relations: Array<{ from: string; to: string; type: string }> = [];
  
  concepts.forEach(concept => {
    if (concept.meta.relations) {
      concept.meta.relations.forEach(rel => {
        relations.push({
          from: concept.meta.id,
          to: rel.to,
          type: rel.type
        });
      });
    }
  });
  
  return relations;
}
