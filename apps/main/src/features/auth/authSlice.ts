import { TokenPayload } from '@libs/api/interfaces';
import { Account } from '@libs/api/interfaces/account.interface';
import {
  clearAuthLocalStorage,
  getTokenFromLocalStorage,
  getUserInfoFromLocalStorage,
} from './utils/authLocalStorage';
import { SliceInterface } from '@app/configs/store.config';

export interface AuthSlice {
  token: TokenPayload | null;
  user: Account | null;
  setToken: (token: TokenPayload | null) => void;
  setUser: (user: Account | null) => void;
  logout: () => void;
}
export const createAuthSlice: SliceInterface<AuthSlice> = (set) => {
  const token = getTokenFromLocalStorage();
  const user = getUserInfoFromLocalStorage();
  return {
    token,
    user,
    setToken: (token: TokenPayload | null) => set({ token }),
    setUser: (user: Account | null) => set({ user }),
    logout: () => {
      set({ token: null });
      set({ user: null });
      clearAuthLocalStorage();
    },
  };
};
