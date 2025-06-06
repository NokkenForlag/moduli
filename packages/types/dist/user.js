import { z } from "zod";
// ===== User Types =====
export var UserRole;
(function (UserRole) {
  UserRole["STUDENT"] = "student";
  UserRole["TEACHER"] = "teacher";
  UserRole["ADMIN"] = "admin";
  UserRole["PARENT"] = "parent";
})(UserRole || (UserRole = {}));
export const DEFAULT_PERMISSIONS = {
  [UserRole.STUDENT]: [
    { resource: "concept", action: "read" },
    { resource: "own_progress", action: "read" },
    { resource: "own_progress", action: "write" },
  ],
  [UserRole.TEACHER]: [
    { resource: "concept", action: "read" },
    { resource: "concept", action: "write" },
    { resource: "student_progress", action: "read" },
    { resource: "collection", action: "write" },
    { resource: "learning_path", action: "write" },
  ],
  [UserRole.ADMIN]: [{ resource: "*", action: "admin" }],
  [UserRole.PARENT]: [
    { resource: "child_progress", action: "read" },
    { resource: "concept", action: "read" },
  ],
};
// ===== Zod Schemas =====
export const UserRoleSchema = z.nativeEnum(UserRole);
export const UserPreferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).optional(),
  language: z.string().optional(),
  difficulty: z.number().int().min(1).max(5).optional(),
  notifications: z
    .object({
      email: z.boolean(),
      inApp: z.boolean(),
    })
    .optional(),
});
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  role: UserRoleSchema,
  schoolId: z.string().optional(),
  preferences: UserPreferencesSchema,
  metadata: z.object({
    createdAt: z.date(),
    lastLogin: z.date().optional(),
    isActive: z.boolean(),
  }),
});
export const SchoolSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  domain: z.string().optional(),
  subscription: z.object({
    plan: z.enum(["basic", "premium", "enterprise"]),
    validUntil: z.date(),
    maxUsers: z.number().positive().optional(),
  }),
  settings: z.object({
    allowStudentSelfSignup: z.boolean().optional(),
    requireEmailVerification: z.boolean().optional(),
    customBranding: z
      .object({
        logo: z.string().optional(),
        primaryColor: z.string().optional(),
      })
      .optional(),
  }),
});
export const UserProgressSchema = z.object({
  userId: z.string(),
  conceptId: z.string(),
  status: z.enum(["not_started", "in_progress", "completed", "mastered"]),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  attempts: z.number().int().nonnegative(),
  score: z.number().min(0).max(100).optional(),
  timeSpent: z.number().nonnegative(),
  metadata: z
    .object({
      notes: z.string().optional(),
      bookmarked: z.boolean().optional(),
    })
    .optional(),
});
// ===== Type Guards =====
export const isUser = (obj) => {
  return UserSchema.safeParse(obj).success;
};
export const isSchool = (obj) => {
  return SchoolSchema.safeParse(obj).success;
};
export const hasPermission = (user, resource, action) => {
  const permissions = DEFAULT_PERMISSIONS[user.role];
  return permissions.some(
    (p) =>
      (p.resource === resource || p.resource === "*") &&
      (p.action === action || p.action === "admin"),
  );
};
//# sourceMappingURL=user.js.map
