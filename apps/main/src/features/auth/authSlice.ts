import { TokenPayload } from '@libs';
import { Account } from '@libs';
import { SliceInterface } from '../../configs/store.config';

export interface AuthSlice {
  user: Account | null;
  setToken: (token: TokenPayload | null) => void;
  setUser: (user: Account | null) => void;
  logout: () => void;
}
export const createAuthSlice: SliceInterface<AuthSlice> = (set) => {
  return {
    user: null,
    setToken: (token: TokenPayload | null) => {
      localStorage.setItem('token', JSON.stringify(token) ?? null);
    },
    setUser: (user: Account | null) => set({ user }),
    logout: () => {
      set({ user: null });
      localStorage.removeItem('token');
    },
  };
};
