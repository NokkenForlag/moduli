import { z } from 'zod';

// Base types
export type ConceptId = string;
export type CollectionId = string;
export type PathId = string;
// Enums
export enum RelationType {
  REQUIRES = 'requires',
  TEACHES = 'teaches',
  PRACTICES = 'practices',
  APPLIES = 'applies',
  EXTENDS = 'extends',
  CONTRADICTS = 'contradicts',
  SUPPORTS = 'supports',
  PART_OF = 'part_of',
  LEADS_TO = 'leads_to',
  SIMILAR_TO = 'similar_to',
}

export enum NodeType {
  CONCEPT = 'concept',
  COLLECTION = 'collection',
  PATH = 'path',
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

// Node metadata
export interface NodeMetadata {
  difficulty?: DifficultyLevel;
  timeEstimate?: number; // minutes
  prerequisites?: ConceptId[];
  tags?: string[];
  weight?: number;
  position?: {
    x: number;
    y: number;
  };
}

// Core graph types
export interface Concept {
  id: ConceptId;
  type: NodeType.CONCEPT;
  title: string;
  description?: string;
  metadata?: NodeMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConceptRelation {
  from: ConceptId;
  to: ConceptId;
  type: RelationType;
  weight?: number;
  metadata?: Record<string, unknown>;
}

export interface Collection {
  id: CollectionId;
  title: string;
  description?: string;
  concepts: ConceptId[];
  metadata?: {
    theme?: string;
    icon?: string;
    color?: string;
  };
}

export interface LearningPath {
  id: PathId;
  title: string;
  description?: string;
  steps: ConceptId[];
  metadata?: {
    estimatedTime?: number;
    difficulty?: DifficultyLevel;
    targetAudience?: string;
  };
}

// Graph structure
export interface ConceptGraph {
  nodes: Map<ConceptId, Concept>;
  edges: ConceptRelation[];
  collections: Map<CollectionId, Collection>;
  paths: Map<PathId, LearningPath>;
}

// Zod schemas for validation
export const NodeMetadataSchema = z.object({
  difficulty: z.nativeEnum(DifficultyLevel).optional(),
  timeEstimate: z.number().positive().optional(),
  prerequisites: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  weight: z.number().optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }).optional(),
});

export const ConceptSchema = z.object({
  id: z.string(),
  type: z.literal(NodeType.CONCEPT),
  title: z.string(),
  description: z.string().optional(),
  metadata: NodeMetadataSchema.optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const RelationTypeSchema = z.nativeEnum(RelationType);

export const ConceptRelationSchema = z.object({
  from: z.string(),
  to: z.string(),
  type: RelationTypeSchema,
  weight: z.number().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const CollectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  concepts: z.array(z.string()),
  metadata: z.object({
    theme: z.string().optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
  }).optional(),
});

export const LearningPathSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  steps: z.array(z.string()),
  metadata: z.object({
    estimatedTime: z.number().optional(),
    difficulty: z.nativeEnum(DifficultyLevel).optional(),
    targetAudience: z.string().optional(),
  }).optional(),
});

// Type guards
export function isConcept(node: unknown): node is Concept {
  return ConceptSchema.safeParse(node).success;
}

export function isConceptRelation(relation: unknown): relation is ConceptRelation {
  return ConceptRelationSchema.safeParse(relation).success;
}

export function isCollection(collection: unknown): collection is Collection {
  return CollectionSchema.safeParse(collection).success;
}

export function isLearningPath(path: unknown): path is LearningPath {
  return LearningPathSchema.safeParse(path).success;
}

// Graph operations interface
export interface GraphOperations {
  addNode(concept: Concept): void;
  removeNode(id: ConceptId): void;
  addEdge(relation: ConceptRelation): void;
  removeEdge(from: ConceptId, to: ConceptId): void;
  getNeighbors(id: ConceptId): ConceptId[];
  getIncomingEdges(id: ConceptId): ConceptRelation[];
  getOutgoingEdges(id: ConceptId): ConceptRelation[];
  findPath(from: ConceptId, to: ConceptId): ConceptId[] | null;
  getSubgraph(ids: ConceptId[]): ConceptGraph;
}

// Types for graphology integration
export interface GraphNode extends Concept {
  // Additional properties for graph visualization
  x?: number;
  y?: number;
  size?: number;
  color?: string;
}

export interface GraphEdge extends ConceptRelation {
  // Additional properties for edge visualization
  size?: number;
  color?: string;
  label?: string;
}
