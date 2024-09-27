export interface LoginResponse {
  userId: number;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export interface ReissueResponse {
  accessToken: string;
  refreshToken: string;
}
