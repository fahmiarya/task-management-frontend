'use client';

/**
 * Client-side navigation filtering based on RBAC.
 *
 * This filtering is for UI visibility only.
 * Actual authorization must always be enforced by the backend.
 */

import { useMemo } from 'react';
import type { NavItem, NavGroup } from '@/types';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Hook to filter navigation items based on RBAC.
 *
 * @param items - Array of navigation items to filter
 * @returns Filtered items
 */
export function useFilteredNavItems(items: NavItem[]) {
  const { user, organizationId, permissions } = useAuthStore();

  const accessContext = useMemo(() => {
    return {
      user,
      permissions,
      role: user?.role,
      hasOrg: !!organizationId
    };
  }, [user, organizationId, permissions]);

  const canAccess = (item: NavItem) => {
    // No access restrictions
    if (!item.access) {
      return true;
    }

    // Organization/client context required
    if (item.access.requireOrg && !accessContext.hasOrg) {
      return false;
    }

    // Permission check
    if (item.access.permission) {
      if (!accessContext.hasOrg) {
        return false;
      }

      if (!accessContext.permissions.includes(item.access.permission)) {
        return false;
      }
    }

    // Role check
    if (item.access.role) {
      if (!accessContext.hasOrg) {
        return false;
      }

      if (accessContext.role !== item.access.role) {
        return false;
      }
    }

    // Plan/feature checks are not implemented yet.
    // They should not be treated as backend authorization.
    if (item.access.plan || item.access.feature) {
      console.warn(
        `Plan/feature checks for navigation items are not implemented. ` +
          `Item "${item.title}" will be shown.`
      );
    }

    return true;
  };

  return useMemo(() => {
    return items.filter(canAccess).map((item) => {
      if (!item.items || item.items.length === 0) {
        return item;
      }

      return {
        ...item,
        items: item.items.filter(canAccess)
      };
    });
  }, [items, user, organizationId, permissions]);
}

/**
 * Hook to filter navigation groups based on RBAC.
 *
 * Empty groups are removed.
 */
export function useFilteredNavGroups(groups: NavGroup[]) {
  const allItems = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  const filteredItems = useFilteredNavItems(allItems);

  return useMemo(() => {
    const filteredSet = new Set(filteredItems.map((item) => item.title));

    return groups
      .map((group) => ({
        ...group,
        items: filteredItems.filter((item) =>
          group.items.some(
            (groupItem) => groupItem.title === item.title && filteredSet.has(groupItem.title)
          )
        )
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, filteredItems]);
}
