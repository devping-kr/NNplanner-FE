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

export interface SendRequest {
  email: string;
}

export interface VerifyRequest {
  email: string;
  verifyCode: string;
}
