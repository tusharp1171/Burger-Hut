export interface TokenPayload {
    sub: string; // or 'username', depending on how backend structures it
    exp: number;
    iat: number;
    [key: string]: any; // for additional fields
  }