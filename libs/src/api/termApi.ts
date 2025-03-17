import { Pagination } from './interfaces/index';
import axiosClient from './axiosClient';
import { Term } from './interfaces/term.inteface';

interface ITermApi {
  getTerms(): Promise<Pagination<Term>>;
}

export const TermApi: ITermApi = {
  async getTerms(): Promise<Pagination<Term>> {
    const res: Pagination<Term> = await axiosClient.get('/terms');
    return res;
  },
};
export default TermApi;
