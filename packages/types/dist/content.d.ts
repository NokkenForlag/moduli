import { z } from "zod";
import type { ConceptId, RelationType } from "./graph";
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
    id: string;
}
/**
 * Code block extracted from markdown
 */
export interface CodeBlock {
    language?: string;
    content: string;
    meta?: string;
}
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
    title?: string;
    description?: string;
    hidden?: boolean;
    metadata?: Record<string, unknown>;
}
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
        conditions?: string;
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
export declare const RelationDefinitionSchema: z.ZodObject<{
    target: z.ZodString;
    type: z.ZodString;
    strength: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: string;
    target: string;
    description?: string | undefined;
    strength?: number | undefined;
}, {
    type: string;
    target: string;
    description?: string | undefined;
    strength?: number | undefined;
}>;
export declare const ConceptFrontmatterSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    difficulty: z.ZodOptional<z.ZodNumber>;
    estimatedTime: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    relations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        target: z.ZodString;
        type: z.ZodString;
        strength: z.ZodOptional<z.ZodNumber>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        target: string;
        description?: string | undefined;
        strength?: number | undefined;
    }, {
        type: string;
        target: string;
        description?: string | undefined;
        strength?: number | undefined;
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    difficulty?: number | undefined;
    prerequisites?: string[] | undefined;
    tags?: string[] | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    estimatedTime?: number | undefined;
    relations?: {
        type: string;
        target: string;
        description?: string | undefined;
        strength?: number | undefined;
    }[] | undefined;
}, {
    id: string;
    title: string;
    difficulty?: number | undefined;
    prerequisites?: string[] | undefined;
    tags?: string[] | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    estimatedTime?: number | undefined;
    relations?: {
        type: string;
        target: string;
        description?: string | undefined;
        strength?: number | undefined;
    }[] | undefined;
}>;
export declare const HeadingSchema: z.ZodObject<{
    level: z.ZodNumber;
    text: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    level: number;
    text: string;
}, {
    id: string;
    level: number;
    text: string;
}>;
export declare const CodeBlockSchema: z.ZodObject<{
    language: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    meta: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content: string;
    language?: string | undefined;
    meta?: string | undefined;
}, {
    content: string;
    language?: string | undefined;
    meta?: string | undefined;
}>;
export declare const ParsedConceptSchema: z.ZodObject<{
    frontmatter: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        difficulty: z.ZodOptional<z.ZodNumber>;
        estimatedTime: z.ZodOptional<z.ZodNumber>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        prerequisites: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        relations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            target: z.ZodString;
            type: z.ZodString;
            strength: z.ZodOptional<z.ZodNumber>;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: string;
            target: string;
            description?: string | undefined;
            strength?: number | undefined;
        }, {
            type: string;
            target: string;
            description?: string | undefined;
            strength?: number | undefined;
        }>, "many">>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title: string;
        difficulty?: number | undefined;
        prerequisites?: string[] | undefined;
        tags?: string[] | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        estimatedTime?: number | undefined;
        relations?: {
            type: string;
            target: string;
            description?: string | undefined;
            strength?: number | undefined;
        }[] | undefined;
    }, {
        id: string;
        title: string;
        difficulty?: number | undefined;
        prerequisites?: string[] | undefined;
        tags?: string[] | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        estimatedTime?: number | undefined;
        relations?: {
            type: string;
            target: string;
            description?: string | undefined;
            strength?: number | undefined;
        }[] | undefined;
    }>;
    content: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    headings: z.ZodOptional<z.ZodArray<z.ZodObject<{
        level: z.ZodNumber;
        text: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        level: number;
        text: string;
    }, {
        id: string;
        level: number;
        text: string;
    }>, "many">>;
    codeBlocks: z.ZodOptional<z.ZodArray<z.ZodObject<{
        language: z.ZodOptional<z.ZodString>;
        content: z.ZodString;
        meta: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        content: string;
        language?: string | undefined;
        meta?: string | undefined;
    }, {
        content: string;
        language?: string | undefined;
        meta?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    content: string;
    frontmatter: {
        id: string;
        title: string;
        difficulty?: number | undefined;
        prerequisites?: string[] | undefined;
        tags?: string[] | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        estimatedTime?: number | undefined;
        relations?: {
            type: string;
            target: string;
            description?: string | undefined;
            strength?: number | undefined;
        }[] | undefined;
    };
    excerpt?: string | undefined;
    headings?: {
        id: string;
        level: number;
        text: string;
    }[] | undefined;
    codeBlocks?: {
        content: string;
        language?: string | undefined;
        meta?: string | undefined;
    }[] | undefined;
}, {
    content: string;
    frontmatter: {
        id: string;
        title: string;
        difficulty?: number | undefined;
        prerequisites?: string[] | undefined;
        tags?: string[] | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        estimatedTime?: number | undefined;
        relations?: {
            type: string;
            target: string;
            description?: string | undefined;
            strength?: number | undefined;
        }[] | undefined;
    };
    excerpt?: string | undefined;
    headings?: {
        id: string;
        level: number;
        text: string;
    }[] | undefined;
    codeBlocks?: {
        content: string;
        language?: string | undefined;
        meta?: string | undefined;
    }[] | undefined;
}>;
export declare const CollectionMemberSchema: z.ZodUnion<[z.ZodString, z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    hidden: z.ZodOptional<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    hidden?: boolean | undefined;
}, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    hidden?: boolean | undefined;
}>]>;
export declare const CollectionDefinitionSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    members: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
        id: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        title?: string | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        hidden?: boolean | undefined;
    }, {
        id: string;
        title?: string | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        hidden?: boolean | undefined;
    }>]>, "many">;
    order: z.ZodOptional<z.ZodEnum<["sequential", "parallel", "custom"]>>;
    theme: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    members: (string | {
        id: string;
        title?: string | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        hidden?: boolean | undefined;
    })[];
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    theme?: string | undefined;
    icon?: string | undefined;
    order?: "custom" | "sequential" | "parallel" | undefined;
}, {
    id: string;
    title: string;
    members: (string | {
        id: string;
        title?: string | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        hidden?: boolean | undefined;
    })[];
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    theme?: string | undefined;
    icon?: string | undefined;
    order?: "custom" | "sequential" | "parallel" | undefined;
}>;
export declare const isConceptFrontmatter: (obj: unknown) => obj is ConceptFrontmatter;
export declare const isParsedConcept: (obj: unknown) => obj is ParsedConcept;
export declare const isCollectionMember: (obj: unknown) => obj is CollectionMember;
//# sourceMappingURL=content.d.ts.map