import { z } from "zod";
import type { ConceptId, RelationType } from "./graph";

// ===== Content Types =====

/**
 * Frontmatter for concept markdown files
 */
export interface ConceptFrontmatter {
  id: ConceptId;
  title: string;
  description?: string;
  difficulty?: number;
  estimatedTime?: number;
  tags?: string[];
  prerequisites?: ConceptId[];
  relations?: RelationDefinition[];
  metadata?: Record<string, unknown>;
}

/**
 * Inline relation definition in frontmatter
 */
export interface RelationDefinition {
  target: ConceptId;
  type: RelationType | string;
  strength?: number;
  description?: string;
}

/**
 * Parsed markdown file with frontmatter and content
 */
export interface ParsedConcept {
  frontmatter: ConceptFrontmatter;
  content: string;
  excerpt?: string;
  headings?: Heading[];
  codeBlocks?: CodeBlock[];
}

/**
 * Heading extracted from markdown
 */
export interface Heading {
  level: number;
  text: string;
  id: string; // slugified version for anchors
}

/**
 * Code block extracted from markdown
 */
export interface CodeBlock {
  language?: string;
  content: string;
  meta?: string; // additional metadata like filename
}

// ===== Collection Types =====

/**
 * Collection definition (YAML file)
 */
export interface CollectionDefinition {
  id: string;
  title: string;
  description?: string;
  members: (ConceptId | CollectionMember)[];
  order?: "sequential" | "parallel" | "custom";
  theme?: string;
  icon?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Extended member definition with overrides
 */
export interface CollectionMember {
  id: ConceptId;
  title?: string; // override concept title in this collection
  description?: string; // override description
  hidden?: boolean;
  metadata?: Record<string, unknown>;
}

// ===== View Configuration =====

/**
 * Layout configuration for different user roles
 */
export interface ViewConfig {
  id: string;
  title: string;
  targetRoles: string[];
  layout: {
    sections: SectionConfig[];
    navigation?: NavigationConfig;
    theme?: ThemeConfig;
  };
  features?: {
    search?: boolean;
    progress?: boolean;
    recommendations?: boolean;
    collaboration?: boolean;
  };
}

export interface SectionConfig {
  id: string;
  type: "hero" | "grid" | "list" | "graph" | "custom";
  title?: string;
  props?: Record<string, unknown>;
  visibility?: {
    roles?: string[];
    conditions?: string; // expression to evaluate
  };
}

export interface NavigationConfig {
  primary?: NavItem[];
  secondary?: NavItem[];
  style?: "sidebar" | "topbar" | "both";
}

export interface NavItem {
  label: string;
  href?: string;
  icon?: string;
  children?: NavItem[];
  roles?: string[];
}

export interface ThemeConfig {
  colors?: Record<string, string>;
  fonts?: {
    heading?: string;
    body?: string;
    code?: string;
  };
  spacing?: Record<string, string>;
}

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

export const isConceptFrontmatter = (
  obj: unknown,
): obj is ConceptFrontmatter => {
  return ConceptFrontmatterSchema.safeParse(obj).success;
};

export const isParsedConcept = (obj: unknown): obj is ParsedConcept => {
  return ParsedConceptSchema.safeParse(obj).success;
};

export const isCollectionMember = (obj: unknown): obj is CollectionMember => {
  return typeof obj === "object" && obj !== null && "id" in obj;
};
