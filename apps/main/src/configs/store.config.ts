import { AuthSlice } from '@app/features/auth/authSlice';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

type AppStore = AuthSlice;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-empty-interface
export interface SliceInterface<T>
  extends StateCreator<AppStore, [['zustand/devtools', never]], [], T> {}

const useStore = create<AppStore>()(devtools((...a) => ({})));
export default useStore;
