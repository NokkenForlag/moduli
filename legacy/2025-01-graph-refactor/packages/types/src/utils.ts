/**
 * Utility types for Moduli
 */

// ===== Generic Utilities =====

/**
 * Make all properties in T optional recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Make all properties in T required recursively
 */
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;

/**
 * Extract the type of array elements
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Make specified keys required
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specified keys optional
 */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

// ===== API Response Types =====

export interface ApiResponse<T> {
  data: T;
  meta?: {
    timestamp: string;
    version: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ===== Event Types =====

export interface BaseEvent {
  id: string;
  type: string;
  timestamp: Date;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface ConceptEvent extends BaseEvent {
  type: "concept.viewed" | "concept.completed" | "concept.bookmarked";
  conceptId: string;
}

export interface ProgressEvent extends BaseEvent {
  type: "progress.updated" | "progress.milestone";
  conceptId: string;
  oldStatus?: string;
  newStatus: string;
}

// ===== Filter & Query Types =====

export interface Filter<T> {
  field: keyof T;
  operator:
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "in"
    | "nin"
    | "contains";
  value: unknown;
}

export interface Sort<T> {
  field: keyof T;
  direction: "asc" | "desc";
}

export interface QueryOptions<T> {
  filters?: Filter<T>[];
  sort?: Sort<T>[];
  pagination?: {
    page: number;
    pageSize: number;
  };
  include?: string[]; // relations to include
}

// ===== Validation Result Types =====

export interface ValidationResult<T = unknown> {
  valid: boolean;
  data?: T;
  errors?: ValidationError[];
}

export interface ValidationError {
  path: string;
  message: string;
  code?: string;
}

// ===== Type Helpers =====

/**
 * Create a branded type for stronger type safety
 */
export type Brand<K, T> = K & { __brand: T };

/**
 * Branded ID types for extra type safety
 */
export type UserId = Brand<string, "UserId">;
export type SchoolId = Brand<string, "SchoolId">;
export type SessionId = Brand<string, "SessionId">;

/**
 * Helper to create branded values
 */
export const brand = <T>(value: T): T => value as T;

// ===== Async Types =====

export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl?: number; // time to live in ms
}

// ===== Constants =====

export const DIFFICULTY_LEVELS = {
  1: "Beginner",
  2: "Elementary",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
} as const;

export const PROGRESS_STATES = [
  "not_started",
  "in_progress",
  "completed",
  "mastered",
] as const;

export const RELATION_STRENGTHS = {
  WEAK: 0.3,
  MODERATE: 0.6,
  STRONG: 0.9,
} as const;
