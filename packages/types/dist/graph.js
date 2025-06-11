import { z } from 'zod';
// Enums
export var RelationType;
(function (RelationType) {
    RelationType["REQUIRES"] = "requires";
    RelationType["TEACHES"] = "teaches";
    RelationType["PRACTICES"] = "practices";
    RelationType["APPLIES"] = "applies";
    RelationType["EXTENDS"] = "extends";
    RelationType["CONTRADICTS"] = "contradicts";
    RelationType["SUPPORTS"] = "supports";
    RelationType["PART_OF"] = "part_of";
    RelationType["LEADS_TO"] = "leads_to";
    RelationType["SIMILAR_TO"] = "similar_to";
})(RelationType || (RelationType = {}));
export var NodeType;
(function (NodeType) {
    NodeType["CONCEPT"] = "concept";
    NodeType["COLLECTION"] = "collection";
    NodeType["PATH"] = "path";
})(NodeType || (NodeType = {}));
export var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["BEGINNER"] = "beginner";
    DifficultyLevel["INTERMEDIATE"] = "intermediate";
    DifficultyLevel["ADVANCED"] = "advanced";
    DifficultyLevel["EXPERT"] = "expert";
})(DifficultyLevel || (DifficultyLevel = {}));
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
export function isConcept(node) {
    return ConceptSchema.safeParse(node).success;
}
export function isConceptRelation(relation) {
    return ConceptRelationSchema.safeParse(relation).success;
}
export function isCollection(collection) {
    return CollectionSchema.safeParse(collection).success;
}
export function isLearningPath(path) {
    return LearningPathSchema.safeParse(path).success;
}
//# sourceMappingURL=graph.js.map