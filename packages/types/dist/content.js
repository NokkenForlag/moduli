import { z } from "zod";
// ===== Zod Schemas =====
export const RelationDefinitionSchema = z.object({
  target: z.string(),
  type: z.string(),
  strength: z.number().min(0).max(1).optional(),
  description: z.string().optional(),
});
export const ConceptFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  difficulty: z.number().int().min(1).max(5).optional(),
  estimatedTime: z.number().positive().optional(),
  tags: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  relations: z.array(RelationDefinitionSchema).optional(),
  metadata: z.record(z.unknown()).optional(),
});
export const HeadingSchema = z.object({
  level: z.number().int().min(1).max(6),
  text: z.string(),
  id: z.string(),
});
export const CodeBlockSchema = z.object({
  language: z.string().optional(),
  content: z.string(),
  meta: z.string().optional(),
});
export const ParsedConceptSchema = z.object({
  frontmatter: ConceptFrontmatterSchema,
  content: z.string(),
  excerpt: z.string().optional(),
  headings: z.array(HeadingSchema).optional(),
  codeBlocks: z.array(CodeBlockSchema).optional(),
});
export const CollectionMemberSchema = z.union([
  z.string(),
  z.object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    hidden: z.boolean().optional(),
    metadata: z.record(z.unknown()).optional(),
  }),
]);
export const CollectionDefinitionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  members: z.array(CollectionMemberSchema),
  order: z.enum(["sequential", "parallel", "custom"]).optional(),
  theme: z.string().optional(),
  icon: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
// ===== Type Guards =====
export const isConceptFrontmatter = (obj) => {
  return ConceptFrontmatterSchema.safeParse(obj).success;
};
export const isParsedConcept = (obj) => {
  return ParsedConceptSchema.safeParse(obj).success;
};
export const isCollectionMember = (obj) => {
  return typeof obj === "object" && obj !== null && "id" in obj;
};
//# sourceMappingURL=content.js.map
