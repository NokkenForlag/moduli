import { z } from "zod";
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
  content: string;
  metadata: NodeMetadata & {
    difficulty?: number;
    estimatedTime?: number;
    prerequisites?: ConceptId[];
    outcomes?: string[];
  };
}
/**
 * Types of relationships between concepts
 */
export declare enum RelationType {
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
  strength?: number;
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
    estimatedTime: number;
    targetAudience?: string;
  };
}
export declare const NodeMetadataSchema: z.ZodObject<
  {
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    version: z.ZodNumber;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
  },
  "strip",
  z.ZodTypeAny,
  {
    createdAt: Date;
    updatedAt: Date;
    version: number;
    tags?: string[] | undefined;
  },
  {
    createdAt: Date;
    updatedAt: Date;
    version: number;
    tags?: string[] | undefined;
  }
>;
export declare const ConceptSchema: z.ZodObject<
  {
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    metadata: z.ZodObject<
      {
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        version: z.ZodNumber;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      } & {
        difficulty: z.ZodOptional<z.ZodNumber>;
        estimatedTime: z.ZodOptional<z.ZodNumber>;
        prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        outcomes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
      },
      "strip",
      z.ZodTypeAny,
      {
        createdAt: Date;
        updatedAt: Date;
        version: number;
        difficulty?: number | undefined;
        estimatedTime?: number | undefined;
        tags?: string[] | undefined;
        prerequisites?: string[] | undefined;
        outcomes?: string[] | undefined;
      },
      {
        createdAt: Date;
        updatedAt: Date;
        version: number;
        difficulty?: number | undefined;
        estimatedTime?: number | undefined;
        tags?: string[] | undefined;
        prerequisites?: string[] | undefined;
        outcomes?: string[] | undefined;
      }
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: string;
    metadata: {
      createdAt: Date;
      updatedAt: Date;
      version: number;
      difficulty?: number | undefined;
      estimatedTime?: number | undefined;
      tags?: string[] | undefined;
      prerequisites?: string[] | undefined;
      outcomes?: string[] | undefined;
    };
    title: string;
    content: string;
    description?: string | undefined;
  },
  {
    id: string;
    metadata: {
      createdAt: Date;
      updatedAt: Date;
      version: number;
      difficulty?: number | undefined;
      estimatedTime?: number | undefined;
      tags?: string[] | undefined;
      prerequisites?: string[] | undefined;
      outcomes?: string[] | undefined;
    };
    title: string;
    content: string;
    description?: string | undefined;
  }
>;
export declare const RelationTypeSchema: z.ZodNativeEnum<typeof RelationType>;
export declare const ConceptRelationSchema: z.ZodObject<
  {
    source: z.ZodString;
    target: z.ZodString;
    type: z.ZodNativeEnum<typeof RelationType>;
    strength: z.ZodOptional<z.ZodNumber>;
    metadata: z.ZodOptional<
      z.ZodObject<
        {
          description: z.ZodOptional<z.ZodString>;
          bidirectional: z.ZodOptional<z.ZodBoolean>;
        },
        "strip",
        z.ZodTypeAny,
        {
          description?: string | undefined;
          bidirectional?: boolean | undefined;
        },
        {
          description?: string | undefined;
          bidirectional?: boolean | undefined;
        }
      >
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    type: RelationType;
    target: string;
    source: string;
    metadata?:
      | {
          description?: string | undefined;
          bidirectional?: boolean | undefined;
        }
      | undefined;
    strength?: number | undefined;
  },
  {
    type: RelationType;
    target: string;
    source: string;
    metadata?:
      | {
          description?: string | undefined;
          bidirectional?: boolean | undefined;
        }
      | undefined;
    strength?: number | undefined;
  }
>;
export declare const CollectionSchema: z.ZodObject<
  {
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    members: z.ZodArray<z.ZodString, "many">;
    metadata: z.ZodObject<
      {
        order: z.ZodOptional<z.ZodEnum<["sequential", "parallel", "custom"]>>;
        theme: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
      },
      "strip",
      z.ZodTypeAny,
      {
        theme?: string | undefined;
        order?: "custom" | "sequential" | "parallel" | undefined;
        icon?: string | undefined;
      },
      {
        theme?: string | undefined;
        order?: "custom" | "sequential" | "parallel" | undefined;
        icon?: string | undefined;
      }
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: string;
    metadata: {
      theme?: string | undefined;
      order?: "custom" | "sequential" | "parallel" | undefined;
      icon?: string | undefined;
    };
    title: string;
    members: string[];
    description?: string | undefined;
  },
  {
    id: string;
    metadata: {
      theme?: string | undefined;
      order?: "custom" | "sequential" | "parallel" | undefined;
      icon?: string | undefined;
    };
    title: string;
    members: string[];
    description?: string | undefined;
  }
>;
export declare const LearningPathSchema: z.ZodObject<
  {
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    concepts: z.ZodArray<z.ZodString, "many">;
    prerequisites: z.ZodArray<z.ZodString, "many">;
    outcomes: z.ZodArray<z.ZodString, "many">;
    metadata: z.ZodObject<
      {
        difficulty: z.ZodNumber;
        estimatedTime: z.ZodNumber;
        targetAudience: z.ZodOptional<z.ZodString>;
      },
      "strip",
      z.ZodTypeAny,
      {
        difficulty: number;
        estimatedTime: number;
        targetAudience?: string | undefined;
      },
      {
        difficulty: number;
        estimatedTime: number;
        targetAudience?: string | undefined;
      }
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: string;
    metadata: {
      difficulty: number;
      estimatedTime: number;
      targetAudience?: string | undefined;
    };
    description: string;
    title: string;
    prerequisites: string[];
    outcomes: string[];
    concepts: string[];
  },
  {
    id: string;
    metadata: {
      difficulty: number;
      estimatedTime: number;
      targetAudience?: string | undefined;
    };
    description: string;
    title: string;
    prerequisites: string[];
    outcomes: string[];
    concepts: string[];
  }
>;
export declare const isConcept: (obj: unknown) => obj is Concept;
export declare const isConceptRelation: (
  obj: unknown,
) => obj is ConceptRelation;
export declare const isCollection: (obj: unknown) => obj is Collection;
export declare const isLearningPath: (obj: unknown) => obj is LearningPath;
//# sourceMappingURL=graph.d.ts.map
