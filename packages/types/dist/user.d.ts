import { z } from "zod";
import type { ConceptId } from "./graph";
export declare enum UserRole {
    STUDENT = "student",
    TEACHER = "teacher",
    ADMIN = "admin",
    PARENT = "parent"
}
export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    schoolId?: string;
    preferences: UserPreferences;
    metadata: {
        createdAt: Date;
        lastLogin?: Date;
        isActive: boolean;
    };
}
export interface UserPreferences {
    theme?: "light" | "dark" | "system";
    language?: string;
    difficulty?: number;
    notifications?: {
        email: boolean;
        inApp: boolean;
    };
}
export interface School {
    id: string;
    name: string;
    domain?: string;
    subscription: {
        plan: "basic" | "premium" | "enterprise";
        validUntil: Date;
        maxUsers?: number;
    };
    settings: {
        allowStudentSelfSignup?: boolean;
        requireEmailVerification?: boolean;
        customBranding?: {
            logo?: string;
            primaryColor?: string;
        };
    };
}
export interface UserProgress {
    userId: string;
    conceptId: ConceptId;
    status: "not_started" | "in_progress" | "completed" | "mastered";
    startedAt?: Date;
    completedAt?: Date;
    attempts: number;
    score?: number;
    timeSpent: number;
    metadata?: {
        notes?: string;
        bookmarked?: boolean;
    };
}
export interface LearningSession {
    id: string;
    userId: string;
    startedAt: Date;
    endedAt?: Date;
    concepts: ConceptId[];
    path?: string;
    metadata: {
        device?: string;
        location?: string;
    };
}
export interface Permission {
    resource: string;
    action: "read" | "write" | "delete" | "admin";
    conditions?: Record<string, unknown>;
}
export declare const DEFAULT_PERMISSIONS: Record<UserRole, Permission[]>;
export declare const UserRoleSchema: z.ZodNativeEnum<typeof UserRole>;
export declare const UserPreferencesSchema: z.ZodObject<{
    theme: z.ZodOptional<z.ZodEnum<["light", "dark", "system"]>>;
    language: z.ZodOptional<z.ZodString>;
    difficulty: z.ZodOptional<z.ZodNumber>;
    notifications: z.ZodOptional<z.ZodObject<{
        email: z.ZodBoolean;
        inApp: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        email: boolean;
        inApp: boolean;
    }, {
        email: boolean;
        inApp: boolean;
    }>>;
}, "strip", z.ZodTypeAny, {
    difficulty?: number | undefined;
    theme?: "light" | "dark" | "system" | undefined;
    language?: string | undefined;
    notifications?: {
        email: boolean;
        inApp: boolean;
    } | undefined;
}, {
    difficulty?: number | undefined;
    theme?: "light" | "dark" | "system" | undefined;
    language?: string | undefined;
    notifications?: {
        email: boolean;
        inApp: boolean;
    } | undefined;
}>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    role: z.ZodNativeEnum<typeof UserRole>;
    schoolId: z.ZodOptional<z.ZodString>;
    preferences: z.ZodObject<{
        theme: z.ZodOptional<z.ZodEnum<["light", "dark", "system"]>>;
        language: z.ZodOptional<z.ZodString>;
        difficulty: z.ZodOptional<z.ZodNumber>;
        notifications: z.ZodOptional<z.ZodObject<{
            email: z.ZodBoolean;
            inApp: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            inApp: boolean;
        }, {
            email: boolean;
            inApp: boolean;
        }>>;
    }, "strip", z.ZodTypeAny, {
        difficulty?: number | undefined;
        theme?: "light" | "dark" | "system" | undefined;
        language?: string | undefined;
        notifications?: {
            email: boolean;
            inApp: boolean;
        } | undefined;
    }, {
        difficulty?: number | undefined;
        theme?: "light" | "dark" | "system" | undefined;
        language?: string | undefined;
        notifications?: {
            email: boolean;
            inApp: boolean;
        } | undefined;
    }>;
    metadata: z.ZodObject<{
        createdAt: z.ZodDate;
        lastLogin: z.ZodOptional<z.ZodDate>;
        isActive: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        createdAt: Date;
        isActive: boolean;
        lastLogin?: Date | undefined;
    }, {
        createdAt: Date;
        isActive: boolean;
        lastLogin?: Date | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    metadata: {
        createdAt: Date;
        isActive: boolean;
        lastLogin?: Date | undefined;
    };
    email: string;
    name: string;
    role: UserRole;
    preferences: {
        difficulty?: number | undefined;
        theme?: "light" | "dark" | "system" | undefined;
        language?: string | undefined;
        notifications?: {
            email: boolean;
            inApp: boolean;
        } | undefined;
    };
    schoolId?: string | undefined;
}, {
    id: string;
    metadata: {
        createdAt: Date;
        isActive: boolean;
        lastLogin?: Date | undefined;
    };
    email: string;
    name: string;
    role: UserRole;
    preferences: {
        difficulty?: number | undefined;
        theme?: "light" | "dark" | "system" | undefined;
        language?: string | undefined;
        notifications?: {
            email: boolean;
            inApp: boolean;
        } | undefined;
    };
    schoolId?: string | undefined;
}>;
export declare const SchoolSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    domain: z.ZodOptional<z.ZodString>;
    subscription: z.ZodObject<{
        plan: z.ZodEnum<["basic", "premium", "enterprise"]>;
        validUntil: z.ZodDate;
        maxUsers: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        plan: "basic" | "premium" | "enterprise";
        validUntil: Date;
        maxUsers?: number | undefined;
    }, {
        plan: "basic" | "premium" | "enterprise";
        validUntil: Date;
        maxUsers?: number | undefined;
    }>;
    settings: z.ZodObject<{
        allowStudentSelfSignup: z.ZodOptional<z.ZodBoolean>;
        requireEmailVerification: z.ZodOptional<z.ZodBoolean>;
        customBranding: z.ZodOptional<z.ZodObject<{
            logo: z.ZodOptional<z.ZodString>;
            primaryColor: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            logo?: string | undefined;
            primaryColor?: string | undefined;
        }, {
            logo?: string | undefined;
            primaryColor?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        allowStudentSelfSignup?: boolean | undefined;
        requireEmailVerification?: boolean | undefined;
        customBranding?: {
            logo?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    }, {
        allowStudentSelfSignup?: boolean | undefined;
        requireEmailVerification?: boolean | undefined;
        customBranding?: {
            logo?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    subscription: {
        plan: "basic" | "premium" | "enterprise";
        validUntil: Date;
        maxUsers?: number | undefined;
    };
    settings: {
        allowStudentSelfSignup?: boolean | undefined;
        requireEmailVerification?: boolean | undefined;
        customBranding?: {
            logo?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    };
    domain?: string | undefined;
}, {
    id: string;
    name: string;
    subscription: {
        plan: "basic" | "premium" | "enterprise";
        validUntil: Date;
        maxUsers?: number | undefined;
    };
    settings: {
        allowStudentSelfSignup?: boolean | undefined;
        requireEmailVerification?: boolean | undefined;
        customBranding?: {
            logo?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    };
    domain?: string | undefined;
}>;
export declare const UserProgressSchema: z.ZodObject<{
    userId: z.ZodString;
    conceptId: z.ZodString;
    status: z.ZodEnum<["not_started", "in_progress", "completed", "mastered"]>;
    startedAt: z.ZodOptional<z.ZodDate>;
    completedAt: z.ZodOptional<z.ZodDate>;
    attempts: z.ZodNumber;
    score: z.ZodOptional<z.ZodNumber>;
    timeSpent: z.ZodNumber;
    metadata: z.ZodOptional<z.ZodObject<{
        notes: z.ZodOptional<z.ZodString>;
        bookmarked: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        notes?: string | undefined;
        bookmarked?: boolean | undefined;
    }, {
        notes?: string | undefined;
        bookmarked?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "not_started" | "in_progress" | "completed" | "mastered";
    userId: string;
    conceptId: string;
    attempts: number;
    timeSpent: number;
    metadata?: {
        notes?: string | undefined;
        bookmarked?: boolean | undefined;
    } | undefined;
    startedAt?: Date | undefined;
    completedAt?: Date | undefined;
    score?: number | undefined;
}, {
    status: "not_started" | "in_progress" | "completed" | "mastered";
    userId: string;
    conceptId: string;
    attempts: number;
    timeSpent: number;
    metadata?: {
        notes?: string | undefined;
        bookmarked?: boolean | undefined;
    } | undefined;
    startedAt?: Date | undefined;
    completedAt?: Date | undefined;
    score?: number | undefined;
}>;
export declare const isUser: (obj: unknown) => obj is User;
export declare const isSchool: (obj: unknown) => obj is School;
export declare const hasPermission: (user: User, resource: string, action: Permission["action"]) => boolean;
//# sourceMappingURL=user.d.ts.map