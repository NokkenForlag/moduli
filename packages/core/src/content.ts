// Minimal content loader for Moduli
import matter from 'gray-matter';
import { readFile } from 'fs/promises';
import { join } from 'path';

export interface ConceptRelation {
  to: string;
  type: 'prerequisite-for' | 'related-to' | 'part-of' | 'leads-to';
}

export interface ConceptMeta {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  difficulty?: number;
  relations?: ConceptRelation[];
  rive?: {
    animation?: string;
    state?: string;
  };
}

export interface Concept {
  meta: ConceptMeta;
  content: string;
  excerpt?: string;
}

export async function loadConcept(conceptId: string, basePath: string = 'content/concepts'): Promise<Concept> {
  try {
    const filePath = join(basePath, `${conceptId}.md`);
    const fileContent = await readFile(filePath, 'utf-8');
    
    const { data, content, excerpt } = matter(fileContent, { excerpt: true });
    
    // Validate required fields
    if (!data.id || !data.title) {
      throw new Error(`Concept ${conceptId} missing required fields (id, title)`);
    }
    
    return {
      meta: data as ConceptMeta,
      content,
      excerpt
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to load concept ${conceptId}: ${message}`);
  }
} // <-- DENNE MANGLET!

export async function loadConcepts(conceptIds: string[], basePath?: string): Promise<Concept[]> {
  const concepts = await Promise.all(
    conceptIds.map(id => loadConcept(id, basePath))
  );
  return concepts;
}

// Parse relations from multiple concepts and build edges
export function extractRelations(concepts: Concept[]): Array<{ from: string; to: string; type: string }> {
  const relations: Array<{ from: string; to: string; type: string }> = [];
  
  for (const concept of concepts) {
    if (concept.meta.relations) {
      for (const relation of concept.meta.relations) {
        relations.push({
          from: concept.meta.id,
          to: relation.to,
          type: relation.type
        });
      }
    }
  }
  
  return relations;
}

// Helper to create a test concept file
export function createTestConcept(): string {
  return `---
id: r1-grenseverdi
title: Grenseverdi
description: Grunnleggende konsept for å forstå kontinuitet og derivasjon
tags: [grenser, funksjoner, kalkulus]
difficulty: 3
relations:
  - to: r1-kontinuitet
    type: prerequisite-for
  - to: r1-derivasjon
    type: prerequisite-for
rive:
  animation: limit-visualization
  state: interactive
---

# Grenseverdi

Grenseverdier er fundamentale i kalkulus og beskriver hva som skjer med en funksjon når vi nærmer oss et bestemt punkt.

## Definisjon

Vi sier at $\\lim_{x \\to a} f(x) = L$ hvis funksjonen $f(x)$ nærmer seg verdien $L$ når $x$ nærmer seg $a$.

## Eksempel

La $f(x) = \\frac{x^2 - 1}{x - 1}$. Hva skjer når $x$ nærmer seg 1?

Vi kan forenkle uttrykket:
$$f(x) = \\frac{(x+1)(x-1)}{x-1} = x + 1$$

Derfor er $\\lim_{x \\to 1} f(x) = 2$.`;
}