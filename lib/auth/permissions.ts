
// old versions of permission functions for reference
// import { AdminUser, AdminRole } from "@prisma/client";

// export function isFounder(admin: AdminUser) {
//   return admin.isFounder === true;
// }

// export function canDeleteEvent(admin: AdminUser) {
//   if (isFounder(admin)) return true;

//   return admin.role === AdminRole.SUPER_ADMIN;
// }

// export function canEditEvent(admin: AdminUser) {
//   if (isFounder(admin)) return true;

//   return (
//     admin.role === AdminRole.SUPER_ADMIN ||
//     admin.role === AdminRole.DEPARTMENT_ADMIN ||
//     admin.role === AdminRole.EDITOR
//   );
// }

// export function canCreateEvent(admin: AdminUser) {
//   return canEditEvent(admin);
// }

// -------------------------------------------------------------------------------------------------------------

// veritas-website\lib\auth\permissions.ts
import { AdminUser, AdminRole } from "@prisma/client";

// Role Checks and helper functions
export function isFounder(admin: AdminUser) {
  return admin.isFounder === true;
}

export function isSuperAdmin(admin: AdminUser) {
  return admin.role === AdminRole.SUPER_ADMIN;
}

export function isDepartmentAdmin(admin: AdminUser) {
  return admin.role === AdminRole.DEPARTMENT_ADMIN;
}

export function isContentAdmin(admin: AdminUser) {
  return admin.role === AdminRole.CONTENT_ADMIN;
}

// Admin / User Management
export function canViewAdmins(admin: AdminUser) {
  return isFounder(admin) || isSuperAdmin(admin);
}

export function canApproveAdmins(admin: AdminUser) {
  return isFounder(admin) || isSuperAdmin(admin);
}

export function canRemoveAdmins(admin: AdminUser) {
  return isFounder(admin) || isSuperAdmin(admin);
}

export function canAssignRoles(admin: AdminUser) {
  return isFounder(admin) || isSuperAdmin(admin);
}

export function canEditAdminRole(admin: AdminUser) {
  return isFounder(admin) || isSuperAdmin(admin);
}

// Events
export function canCreateEvent(admin: AdminUser) {
  if (isFounder(admin)) return true;
  return isSuperAdmin(admin) || isDepartmentAdmin(admin);
}

export function canEditEvent(admin: AdminUser) {
  return canCreateEvent(admin);
}

export function canDeleteEvent(admin: AdminUser) {
  if (isFounder(admin)) return true;
  return isSuperAdmin(admin);
}

// Content
export function canManageContent(admin: AdminUser) {
  if (isFounder(admin)) return true;
  return isSuperAdmin(admin) || isContentAdmin(admin);
}

// Team
export function canManageTeam(admin: AdminUser) {
  if (isFounder(admin)) return true;
  return isSuperAdmin(admin) || isDepartmentAdmin(admin);
}

//VSD
export function canAccessVSD(admin: AdminUser) {
  if (isFounder(admin)) return true;
  return isSuperAdmin(admin) || isContentAdmin(admin);
}

// Global Override
export function canOverrideEverything(admin: AdminUser) {
  return isFounder(admin) || isSuperAdmin(admin);
}
