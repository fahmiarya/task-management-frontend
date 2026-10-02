'use client';

import { create } from 'zustand';

export type UserRole = 'PM' | 'UI_UX' | 'FRONTEND' | 'BACKEND' | 'CLIENT';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  clientId?: string;
};

type AuthState = {
  user: AuthUser | null;
  organizationId: string | null;
  permissions: string[];

  setAuth: (user: AuthUser, organizationId?: string | null, permissions?: string[]) => void;

  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  organizationId: null,
  permissions: [],

  setAuth: (user, organizationId = null, permissions = []) => {
    set({
      user,
      organizationId,
      permissions
    });
  },

  clearAuth: () => {
    set({
      user: null,
      organizationId: null,
      permissions: []
    });
  }
}));
