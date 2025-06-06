import { z } from "zod";
/**
 * Types of relationships between concepts
 */
export var RelationType;
(function (RelationType) {
  RelationType["PREREQUISITE"] = "prerequisite";
  RelationType["RELATED"] = "related";
  RelationType["EXTENDS"] = "extends";
  RelationType["ALTERNATIVE"] = "alternative";
  RelationType["PRACTICAL_APPLICATION"] = "practical_application";
  RelationType["THEORETICAL_BASIS"] = "theoretical_basis";
})(RelationType || (RelationType = {}));
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
export const isConcept = (obj) => {
  return ConceptSchema.safeParse(obj).success;
};
export const isConceptRelation = (obj) => {
  return ConceptRelationSchema.safeParse(obj).success;
};
export const isCollection = (obj) => {
  return CollectionSchema.safeParse(obj).success;
};
export const isLearningPath = (obj) => {
  return LearningPathSchema.safeParse(obj).success;
};
//# sourceMappingURL=graph.js.map
