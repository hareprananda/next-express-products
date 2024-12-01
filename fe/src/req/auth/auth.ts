import apiCall from '..';
import * as Model from './authmodel';

class AuthReqClass {
  login = (payload: Model.LoginPayload) => {
    return apiCall<Model.LoginRes>({
      method: 'POST',
      url: '/auth/login',
      data: payload,
      withToken: false
    });
  };

  register = (payload: Model.RegisterPayload) => {
    return apiCall<Model.RegisterRes>({
      method: 'POST',
      url: '/auth/login',
      data: payload,
      withToken: false
    });
  };
}

const AuthReq = new AuthReqClass();

export default AuthReq;
