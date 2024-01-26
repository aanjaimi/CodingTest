export interface JwtAuthPayload {
  email: string;
  sub: string;
  iss: string;
  iat?: number;
  exp?: number;
}
