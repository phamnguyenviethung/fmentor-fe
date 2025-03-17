import { TokenPayload } from '@libs';
import { Account } from '@libs';
import { SliceInterface } from '../../configs/store.config';

export interface AuthSlice {
  token: TokenPayload | null;
  user: Account | null;
  setToken: (token: TokenPayload | null) => void;
  setUser: (user: Account | null) => void;
  logout: () => void;
}
export const createAuthSlice: SliceInterface<AuthSlice> = (set) => {
  return {
    token: null,
    user: null,
    setToken: (token: TokenPayload | null) => {
      localStorage.setItem('token', token?.accessToken ?? 'null');
      set({ token });
    },
    setUser: (user: Account | null) => set({ user }),
    logout: () => {
      set({ token: null });
      set({ user: null });
    },
  };
};
