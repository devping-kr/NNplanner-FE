export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  loginType: 'LOCAL';
}

export interface LoginRequest {
  email: string;
  password: string;
  loginType: 'LOCAL';
}
