/**
 * Example usage of @moduli/types
 */

import {
  // Graph types
  type Concept,
  type ConceptRelation,
  RelationType,
  ConceptSchema,

  // User types
  type User,
  UserRole,
  hasPermission,

  // Content types
  type ParsedConcept,
  type CollectionDefinition,

  // Utilities
  type AsyncState,
  type ValidationResult,
  z,
} from "@moduli/types";

// ===== Creating and validating a concept =====

const rawConcept = {
  id: "a-1-1",
  title: "Introduksjon til algebra",
  description: "Grunnleggende konsepter i algebra",
  content: "# Algebra\n\nAlgebra er...",
  metadata: {
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    difficulty: 2,
    estimatedTime: 30,
    prerequisites: ["a-0-1", "a-0-2"],
    tags: ["algebra", "grunnleggende"],
  },
};

// Validate with Zod
const validationResult = ConceptSchema.safeParse(rawConcept);
if (validationResult.success) {
  const concept: Concept = validationResult.data;
  console.log("Valid concept:", concept.title);
} else {
  console.error("Validation errors:", validationResult.error.issues);
}

// ===== Working with relations =====

const relation: ConceptRelation = {
  source: "a-1-1",
  target: "a-1-2",
  type: RelationType.PREREQUISITE,
  strength: 0.8,
  metadata: {
    description: "Understanding basic algebra is required for equations",
  },
};

// ===== User permissions =====

const teacher: User = {
  id: "user-123",
  email: "teacher@school.no",
  name: "Kari Nordmann",
  role: UserRole.TEACHER,
  schoolId: "school-456",
  preferences: {
    theme: "light",
    language: "nb-NO",
  },
  metadata: {
    createdAt: new Date(),
    isActive: true,
  },
};

// Check permissions
const canEditConcept = hasPermission(teacher, "concept", "write");
const canDeleteUser = hasPermission(teacher, "user", "delete");

console.log("Teacher can edit concepts:", canEditConcept); // true
console.log("Teacher can delete users:", canDeleteUser); // false

// ===== Async state management =====

type ConceptsState = AsyncState<Concept[]>;

let state: ConceptsState = { status: "idle" };

// Loading
state = { status: "loading" };

// Success
state = {
  status: "success",
  data: [concept as Concept],
};

// Error
state = {
  status: "error",
  error: new Error("Failed to load concepts"),
};

// ===== Working with collections =====

const algebraCollection: CollectionDefinition = {
  id: "coll-algebra-basics",
  title: "Grunnleggende algebra",
  description: "En samling av grunnleggende algebraiske konsepter",
  members: [
    "a-1-1", // Simple member
    {
      id: "a-1-2",
      title: "Ligninger (tilpasset)", // Override title in this collection
      description: "Fokus på praktiske eksempler",
    },
  ],
  order: "sequential",
  theme: "mathematics",
  icon: "calculator",
};

// ===== Type-safe API responses =====

interface ConceptService {
  getConcept(id: string): Promise<ValidationResult<Concept>>;
  updateProgress(
    userId: string,
    conceptId: string,
    score: number,
  ): Promise<void>;
}

const conceptService: ConceptService = {
  async getConcept(id) {
    try {
      const response = await fetch(`/api/concepts/${id}`);
      const data = await response.json();

      const result = ConceptSchema.safeParse(data);
      if (result.success) {
        return { valid: true, data: result.data };
      } else {
        return {
          valid: false,
          errors: result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        };
      }
    } catch (error) {
      return {
        valid: false,
        errors: [{ path: "", message: "Network error" }],
      };
    }
  },

  async updateProgress(userId, conceptId, score) {
    // Implementation
  },
};

// ===== Export for testing =====
export { teacher, concept, relation, algebraCollection };
