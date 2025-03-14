import { AuthSlice, createAuthSlice } from '../features/auth/authSlice';
import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AppStore = AuthSlice;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface SliceInterface<T>
  extends StateCreator<AppStore, [['zustand/devtools', never]], [], T> {}

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
      }),
      {
        name: 'fmentor-store',
      }
    )
  )
);
export default useAppStore;
