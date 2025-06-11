/**
 * Utility types for Moduli
 */
/**
 * Make all properties in T optional recursively
 */
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
/**
 * Make all properties in T required recursively
 */
export type DeepRequired<T> = T extends object ? {
    [P in keyof T]-?: DeepRequired<T[P]>;
} : T;
/**
 * Extract the type of array elements
 */
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
/**
 * Make specified keys required
 */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;
/**
 * Make specified keys optional
 */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
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
export interface Filter<T> {
    field: keyof T;
    operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in" | "nin" | "contains";
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
    include?: string[];
}
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
/**
 * Create a branded type for stronger type safety
 */
export type Brand<K, T> = K & {
    __brand: T;
};
/**
 * Branded ID types for extra type safety
 */
export type UserId = Brand<string, "UserId">;
export type SchoolId = Brand<string, "SchoolId">;
export type SessionId = Brand<string, "SessionId">;
/**
 * Helper to create branded values
 */
export declare const brand: <T>(value: T) => T;
export type AsyncState<T> = {
    status: "idle";
} | {
    status: "loading";
} | {
    status: "success";
    data: T;
} | {
    status: "error";
    error: Error;
};
export interface CacheEntry<T> {
    data: T;
    timestamp: number;
    ttl?: number;
}
export declare const DIFFICULTY_LEVELS: {
    readonly 1: "Beginner";
    readonly 2: "Elementary";
    readonly 3: "Intermediate";
    readonly 4: "Advanced";
    readonly 5: "Expert";
};
export declare const PROGRESS_STATES: readonly ["not_started", "in_progress", "completed", "mastered"];
export declare const RELATION_STRENGTHS: {
    readonly WEAK: 0.3;
    readonly MODERATE: 0.6;
    readonly STRONG: 0.9;
};
//# sourceMappingURL=utils.d.ts.map