/**
 * @moduli/types - Core type definitions for Moduli
 *
 * This package provides all TypeScript interfaces, types, and Zod schemas
 * used throughout the Moduli monorepo.
 */
// ===== Graph Types =====
export {
  RelationType,
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
  brand,
  // Constants
  DIFFICULTY_LEVELS,
  PROGRESS_STATES,
  RELATION_STRENGTHS,
} from "./utils.js";
// ===== Re-export commonly used Zod utilities =====
export { z } from "zod";
//# sourceMappingURL=index.js.map
