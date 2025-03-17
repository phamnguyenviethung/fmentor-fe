import { Term } from '@libs';
import { SliceInterface } from '../../configs/store.config';

export interface TermSlice {
  term: Term | null;
  setTerm: (token: Term | null) => void;
}
export const createTermSlice: SliceInterface<TermSlice> = (set) => {
  return {
    term: null,
    setTerm: (term: Term | null) => {
      set({ term });
    },
  };
};
