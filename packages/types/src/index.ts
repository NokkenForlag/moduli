/**
 * @moduli/types - Core type definitions for Moduli
 *
 * This package provides all TypeScript interfaces, types, and Zod schemas
 * used throughout the Moduli monorepo.
 */

// ===== Graph Types =====
export {
  // Types
  type ConceptId,
  type NodeMetadata,
  type Concept,
  RelationType,
  type ConceptRelation,
  type Collection,
  type LearningPath,

  // Schemas
  NodeMetadataSchema,
  ConceptSchema,
  RelationTypeSchema,
  ConceptRelationSchema,
  CollectionSchema,
  LearningPathSchema,

  // Type Guards
  isConcept,
  isConceptRelation,
  isCollection,
  isLearningPath,
} from "./graph.js";

// ===== User Types =====
export {
  // Types
  UserRole,
  type User,
  type UserPreferences,
  type School,
  type UserProgress,
  type LearningSession,
  type Permission,
  DEFAULT_PERMISSIONS,

  // Schemas
  UserRoleSchema,
  UserPreferencesSchema,
  UserSchema,
  SchoolSchema,
  UserProgressSchema,

  // Type Guards & Helpers
  isUser,
  isSchool,
  hasPermission,
} from "./user.js";

// ===== Content Types =====
export {
  // Types
  type ConceptFrontmatter,
  type RelationDefinition,
  type ParsedConcept,
  type Heading,
  type CodeBlock,
  type CollectionDefinition,
  type CollectionMember,
  type ViewConfig,
  type SectionConfig,
  type NavigationConfig,
  type NavItem,
  type ThemeConfig,

  // Schemas
  RelationDefinitionSchema,
  ConceptFrontmatterSchema,
  HeadingSchema,
  CodeBlockSchema,
  ParsedConceptSchema,
  CollectionMemberSchema,
  CollectionDefinitionSchema,

  // Type Guards
  isConceptFrontmatter,
  isParsedConcept,
  isCollectionMember,
} from "./content.js";

// ===== Utility Types =====
export {
  // Generic Utilities
  type DeepPartial,
  type DeepRequired,
  type ArrayElement,
  type RequireKeys,
  type PartialKeys,

  // API Types
  type ApiResponse,
  type ApiError,
  type PaginatedResponse,

  // Event Types
  type BaseEvent,
  type ConceptEvent,
  type ProgressEvent,

  // Query Types
  type Filter,
  type Sort,
  type QueryOptions,

  // Validation Types
  type ValidationResult,
  type ValidationError,

  // Branded Types
  type Brand,
  type UserId,
  type SchoolId,
  type SessionId,
  brand,

  // Async Types
  type AsyncState,
  type CacheEntry,

  // Constants
  DIFFICULTY_LEVELS,
  PROGRESS_STATES,
  RELATION_STRENGTHS,
} from "./utils.js";

// ===== Re-export commonly used Zod utilities =====
export { z } from "zod";
export type { ZodError, ZodIssue } from "zod";
