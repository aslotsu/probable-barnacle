import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  sessionId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  validateSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  sessionId: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
        sessionId: data.sessionId
      });

      // Store session ID in localStorage
      localStorage.setItem('sessionId', data.sessionId);
    } catch (error: any) {
      set({
        error: error.message || 'An error occurred during login',
        isLoading: false
      });
      throw error;
    }
  },

  logout: async () => {
    const sessionId = localStorage.getItem('sessionId');

    if (sessionId) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }

    set({ user: null, isAuthenticated: false, sessionId: null });
    localStorage.removeItem('sessionId');
  },

  validateSession: async () => {
    const sessionId = localStorage.getItem('sessionId');

    if (!sessionId) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (data.valid && data.user) {
        set({
          user: data.user,
          isAuthenticated: true,
          sessionId
        });
      } else {
        set({ isAuthenticated: false, user: null, sessionId: null });
        localStorage.removeItem('sessionId');
      }
    } catch (error) {
      console.error('Session validation error:', error);
      set({ isAuthenticated: false, user: null, sessionId: null });
      localStorage.removeItem('sessionId');
    }
  }
}));