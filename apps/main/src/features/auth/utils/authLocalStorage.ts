import { TokenPayload } from '@libs/api/interfaces';
import { Account } from '@libs/api/interfaces/account.interface';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function getTokenFromLocalStorage(): TokenPayload | null {
  const data = localStorage.getItem(TOKEN_KEY);
  if (!data) return null;

  return JSON.parse(data);
}

export function saveTokenToLocalStorage(token: TokenPayload): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
}

export function getUserInfoFromLocalStorage(): Account | null {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;

  return JSON.parse(data);
}

export function saveUserInfoToLocalStorage(user: Account): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuthLocalStorage(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
