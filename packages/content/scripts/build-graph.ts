#!/usr/bin/env tsx
import { loadAllConcepts } from "../src/loaders/concept-loader";
import { buildGraph } from "../src/graph/graph-builder";
import { validateGraph } from "../src/validators/graph-validator";
import { writeFileSync } from "fs";

async function main() {
  console.log("🔨 Building concept graph...");

  // 1. Load all concepts
  const concepts = await loadAllConcepts();
  console.log(`📚 Loaded ${concepts.length} concepts`);

  // 2. Build graph
  const graph = buildGraph(concepts);

  // 3. Validate
  const validation = validateGraph(graph);
  if (!validation.valid) {
    console.error("❌ Graph validation failed:", validation.errors);
    process.exit(1);
  }

  // 4. Generate indices
  const indices = {
    conceptGraph: graph.export(),
    searchIndex: buildSearchIndex(concepts),
    collectionIndex: buildCollectionIndex(concepts),
    learningPaths: generateLearningPaths(graph),
  };

  // 5. Write to disk
  writeFileSync("src/indices/graph.json", JSON.stringify(indices, null, 2));
  console.log("✅ Graph built successfully!");
}

main().catch(console.error);
