import { z } from 'zod';
export type ConceptId = string;
export type CollectionId = string;
export type PathId = string;
export declare enum RelationType {
    REQUIRES = "requires",
    TEACHES = "teaches",
    PRACTICES = "practices",
    APPLIES = "applies",
    EXTENDS = "extends",
    CONTRADICTS = "contradicts",
    SUPPORTS = "supports",
    PART_OF = "part_of",
    LEADS_TO = "leads_to",
    SIMILAR_TO = "similar_to"
}
export declare enum NodeType {
    CONCEPT = "concept",
    COLLECTION = "collection",
    PATH = "path"
}
export declare enum DifficultyLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
    EXPERT = "expert"
}
export interface NodeMetadata {
    difficulty?: DifficultyLevel;
    timeEstimate?: number;
    prerequisites?: ConceptId[];
    tags?: string[];
    weight?: number;
    position?: {
        x: number;
        y: number;
    };
}
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
export interface ConceptGraph {
    nodes: Map<ConceptId, Concept>;
    edges: ConceptRelation[];
    collections: Map<CollectionId, Collection>;
    paths: Map<PathId, LearningPath>;
}
export declare const NodeMetadataSchema: z.ZodObject<{
    difficulty: z.ZodOptional<z.ZodNativeEnum<typeof DifficultyLevel>>;
    timeEstimate: z.ZodOptional<z.ZodNumber>;
    prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    weight: z.ZodOptional<z.ZodNumber>;
    position: z.ZodOptional<z.ZodObject<{
        x: z.ZodNumber;
        y: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        x: number;
        y: number;
    }, {
        x: number;
        y: number;
    }>>;
}, "strip", z.ZodTypeAny, {
    difficulty?: DifficultyLevel | undefined;
    timeEstimate?: number | undefined;
    prerequisites?: string[] | undefined;
    tags?: string[] | undefined;
    weight?: number | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}, {
    difficulty?: DifficultyLevel | undefined;
    timeEstimate?: number | undefined;
    prerequisites?: string[] | undefined;
    tags?: string[] | undefined;
    weight?: number | undefined;
    position?: {
        x: number;
        y: number;
    } | undefined;
}>;
export declare const ConceptSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<NodeType.CONCEPT>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodObject<{
        difficulty: z.ZodOptional<z.ZodNativeEnum<typeof DifficultyLevel>>;
        timeEstimate: z.ZodOptional<z.ZodNumber>;
        prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        weight: z.ZodOptional<z.ZodNumber>;
        position: z.ZodOptional<z.ZodObject<{
            x: z.ZodNumber;
            y: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            x: number;
            y: number;
        }, {
            x: number;
            y: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        difficulty?: DifficultyLevel | undefined;
        timeEstimate?: number | undefined;
        prerequisites?: string[] | undefined;
        tags?: string[] | undefined;
        weight?: number | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }, {
        difficulty?: DifficultyLevel | undefined;
        timeEstimate?: number | undefined;
        prerequisites?: string[] | undefined;
        tags?: string[] | undefined;
        weight?: number | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    }>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    type: NodeType.CONCEPT;
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    description?: string | undefined;
    metadata?: {
        difficulty?: DifficultyLevel | undefined;
        timeEstimate?: number | undefined;
        prerequisites?: string[] | undefined;
        tags?: string[] | undefined;
        weight?: number | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | undefined;
}, {
    type: NodeType.CONCEPT;
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    description?: string | undefined;
    metadata?: {
        difficulty?: DifficultyLevel | undefined;
        timeEstimate?: number | undefined;
        prerequisites?: string[] | undefined;
        tags?: string[] | undefined;
        weight?: number | undefined;
        position?: {
            x: number;
            y: number;
        } | undefined;
    } | undefined;
}>;
export declare const RelationTypeSchema: z.ZodNativeEnum<typeof RelationType>;
export declare const ConceptRelationSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
    type: z.ZodNativeEnum<typeof RelationType>;
    weight: z.ZodOptional<z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    type: RelationType;
    from: string;
    to: string;
    weight?: number | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    type: RelationType;
    from: string;
    to: string;
    weight?: number | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const CollectionSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    concepts: z.ZodArray<z.ZodString, "many">;
    metadata: z.ZodOptional<z.ZodObject<{
        theme: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        color: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        theme?: string | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    }, {
        theme?: string | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    concepts: string[];
    description?: string | undefined;
    metadata?: {
        theme?: string | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    } | undefined;
}, {
    id: string;
    title: string;
    concepts: string[];
    description?: string | undefined;
    metadata?: {
        theme?: string | undefined;
        icon?: string | undefined;
        color?: string | undefined;
    } | undefined;
}>;
export declare const LearningPathSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    steps: z.ZodArray<z.ZodString, "many">;
    metadata: z.ZodOptional<z.ZodObject<{
        estimatedTime: z.ZodOptional<z.ZodNumber>;
        difficulty: z.ZodOptional<z.ZodNativeEnum<typeof DifficultyLevel>>;
        targetAudience: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        difficulty?: DifficultyLevel | undefined;
        estimatedTime?: number | undefined;
        targetAudience?: string | undefined;
    }, {
        difficulty?: DifficultyLevel | undefined;
        estimatedTime?: number | undefined;
        targetAudience?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    steps: string[];
    description?: string | undefined;
    metadata?: {
        difficulty?: DifficultyLevel | undefined;
        estimatedTime?: number | undefined;
        targetAudience?: string | undefined;
    } | undefined;
}, {
    id: string;
    title: string;
    steps: string[];
    description?: string | undefined;
    metadata?: {
        difficulty?: DifficultyLevel | undefined;
        estimatedTime?: number | undefined;
        targetAudience?: string | undefined;
    } | undefined;
}>;
export declare function isConcept(node: unknown): node is Concept;
export declare function isConceptRelation(relation: unknown): relation is ConceptRelation;
export declare function isCollection(collection: unknown): collection is Collection;
export declare function isLearningPath(path: unknown): path is LearningPath;
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
export interface GraphNode extends Concept {
    x?: number;
    y?: number;
    size?: number;
    color?: string;
}
export interface GraphEdge extends ConceptRelation {
    size?: number;
    color?: string;
    label?: string;
}
//# sourceMappingURL=graph.d.ts.map