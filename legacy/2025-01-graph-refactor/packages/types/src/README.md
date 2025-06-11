# @moduli/types

Core TypeScript type definitions and Zod schemas for the Moduli platform.

## Overview

This package provides:

- 🎯 **Type-safe interfaces** for all core domain models
- ✅ **Zod schemas** for runtime validation
- 🛡️ **Type guards** for safe type narrowing
- 🔧 **Utility types** for common patterns

## Installation

```bash
pnpm add @moduli/types
```

## Core Types

### Graph Types (`/graph`)

- `Concept` - Learning units in the knowledge graph
- `ConceptRelation` - Connections between concepts
- `Collection` - Grouped concepts
- `LearningPath` - Curated learning sequences

### User Types (`/user`)

- `User` - User accounts with roles
- `UserRole` - Student, Teacher, Admin, Parent
- `School` - School organizations
- `UserProgress` - Learning progress tracking

### Content Types (`/content`)

- `ConceptFrontmatter` - Markdown metadata
- `ParsedConcept` - Processed content
- `CollectionDefinition` - Collection configurations
- `ViewConfig` - UI layout configurations

## Usage

### Basic Type Usage

```typescript
import { type Concept, RelationType } from "@moduli/types";

const concept: Concept = {
  id: "a-1-1",
  title: "Introduction to Algebra",
  content: "# Algebra basics...",
  metadata: {
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    difficulty: 2,
    estimatedTime: 30,
  },
};
```

### Validation with Zod

```typescript
import { ConceptSchema, type ValidationResult } from "@moduli/types";

const validateConcept = (data: unknown): ValidationResult<Concept> => {
  const result = ConceptSchema.safeParse(data);

  if (result.success) {
    return { valid: true, data: result.data };
  }

  return {
    valid: false,
    errors: result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
};
```

### Type Guards

```typescript
import { isConcept, isUser, hasPermission } from "@moduli/types";

// Runtime type checking
if (isConcept(data)) {
  // TypeScript knows data is Concept here
  console.log(data.title);
}

// Permission checking
if (hasPermission(user, "concept", "write")) {
  // User can edit concepts
}
```

### Async State Management

```typescript
import { type AsyncState } from "@moduli/types";

type ConceptState = AsyncState<Concept>;

let state: ConceptState = { status: "idle" };
state = { status: "loading" };
state = { status: "success", data: concept };
state = { status: "error", error: new Error("Failed") };
```

## Type Categories

### Essential Types

- Domain models (Concept, User, etc.)
- Enums (UserRole, RelationType)
- Configuration types (ViewConfig, ThemeConfig)

### Utility Types

- `DeepPartial<T>` - Recursive partial
- `AsyncState<T>` - Loading states
- `Brand<K, T>` - Branded types for IDs
- `Filter<T>`, `Sort<T>` - Query builders

### API Types

- `ApiResponse<T>` - Standardized responses
- `PaginatedResponse<T>` - Paginated data
- `ValidationResult<T>` - Validation outcomes

## Best Practices

1. **Always validate external data**

   ```typescript
   const result = ConceptSchema.safeParse(apiData);
   if (!result.success) {
     handleValidationError(result.error);
   }
   ```

2. **Use branded types for IDs**

   ```typescript
   import { type UserId, brand } from "@moduli/types";
   const userId = brand<UserId>("user-123");
   ```

3. **Prefer type guards over assertions**

   ```typescript
   // Good
   if (isConcept(data)) {
     /* ... */
   }

   // Avoid
   const concept = data as Concept;
   ```

## Development

```bash
# Build the package
pnpm build

# Watch mode
pnpm dev

# Type check
pnpm typecheck
```

## Exports

The package provides multiple entry points:

```typescript
// Main exports
import { Concept, User } from "@moduli/types";

// Domain-specific imports
import { ConceptRelation } from "@moduli/types/graph";
import { UserRole } from "@moduli/types/user";
import { ParsedConcept } from "@moduli/types/content";
```

## Contributing

When adding new types:

1. Add the TypeScript interface/type
2. Create corresponding Zod schema
3. Add type guard if applicable
4. Export from appropriate module
5. Update this README

## License

Part of the Moduli platform by Nøkken Forlag AS.
