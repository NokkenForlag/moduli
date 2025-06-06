import { z } from "zod";

// ===== Core Graph Types =====

/**
 * Unique identifier for a concept (e.g., "a-1-1", "g-2-3")
 */
export type ConceptId = string;

/**
 * Core metadata that all graph nodes share
 */
export interface NodeMetadata {
  createdAt: Date;
  updatedAt: Date;
  version: number;
  tags?: string[];
}

/**
 * A concept represents a single learning unit in the knowledge graph
 */
export interface Concept {
  id: ConceptId;
  title: string;
  description?: string;
  content: string; // Markdown content
  metadata: NodeMetadata & {
    difficulty?: number; // 1-5
    estimatedTime?: number; // minutes
    prerequisites?: ConceptId[];
    outcomes?: string[];
  };
}

/**
 * Types of relationships between concepts
 */
export enum RelationType {
  PREREQUISITE = "prerequisite",
  RELATED = "related",
  EXTENDS = "extends",
  ALTERNATIVE = "alternative",
  PRACTICAL_APPLICATION = "practical_application",
  THEORETICAL_BASIS = "theoretical_basis",
}

/**
 * A relation defines how two concepts are connected
 */
export interface ConceptRelation {
  source: ConceptId;
  target: ConceptId;
  type: RelationType;
  strength?: number; // 0-1, how strong the connection is
  metadata?: {
    description?: string;
    bidirectional?: boolean;
  };
}

/**
 * A collection groups related concepts together
 */
export interface Collection {
  id: string;
  title: string;
  description?: string;
  members: ConceptId[];
  metadata: {
    order?: "sequential" | "parallel" | "custom";
    theme?: string;
    icon?: string;
  };
}

/**
 * A learning path is a curated sequence through the graph
 */
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  concepts: ConceptId[];
  prerequisites: ConceptId[];
  outcomes: string[];
  metadata: {
    difficulty: number;
    estimatedTime: number; // total minutes
    targetAudience?: string;
  };
}

// ===== Zod Schemas for Validation =====

export const NodeMetadataSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  version: z.number().int().positive(),
  tags: z.array(z.string()).optional(),
});

export const ConceptSchema = z.object({
  id: z.string().regex(/^[a-z]-\d+-\d+$/, "Invalid concept ID format"),
  title: z.string().min(1),
  description: z.string().optional(),
  content: z.string(),
  metadata: NodeMetadataSchema.extend({
    difficulty: z.number().int().min(1).max(5).optional(),
    estimatedTime: z.number().positive().optional(),
    prerequisites: z.array(z.string()).optional(),
    outcomes: z.array(z.string()).optional(),
  }),
});

export const RelationTypeSchema = z.nativeEnum(RelationType);

export const ConceptRelationSchema = z.object({
  source: z.string(),
  target: z.string(),
  type: RelationTypeSchema,
  strength: z.number().min(0).max(1).optional(),
  metadata: z
    .object({
      description: z.string().optional(),
      bidirectional: z.boolean().optional(),
    })
    .optional(),
});

export const CollectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  members: z.array(z.string()),
  metadata: z.object({
    order: z.enum(["sequential", "parallel", "custom"]).optional(),
    theme: z.string().optional(),
    icon: z.string().optional(),
  }),
});

export const LearningPathSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  concepts: z.array(z.string()),
  prerequisites: z.array(z.string()),
  outcomes: z.array(z.string()),
  metadata: z.object({
    difficulty: z.number().int().min(1).max(5),
    estimatedTime: z.number().positive(),
    targetAudience: z.string().optional(),
  }),
});

// ===== Type Guards =====

export const isConcept = (obj: unknown): obj is Concept => {
  return ConceptSchema.safeParse(obj).success;
};

export const isConceptRelation = (obj: unknown): obj is ConceptRelation => {
  return ConceptRelationSchema.safeParse(obj).success;
};

export const isCollection = (obj: unknown): obj is Collection => {
  return CollectionSchema.safeParse(obj).success;
};

export const isLearningPath = (obj: unknown): obj is LearningPath => {
  return LearningPathSchema.safeParse(obj).success;
};
