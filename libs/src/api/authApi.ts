import axiosClient from './axiosClient';
import { TokenPayload } from './interfaces';

interface IAuthApi {
  login(code: string): Promise<TokenPayload>;
}

export const authApi: IAuthApi = {
  async login(code: string): Promise<TokenPayload> {
    const res: TokenPayload = await axiosClient.post('/authentication/login', {
      contentHash: code,
    });

    return res;
  },
};
export default authApi;
