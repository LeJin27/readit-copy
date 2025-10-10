import { Request } from "express"
import { SessionUser } from '../types'
import { AuthService } from './service';

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<SessionUser> {
  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    throw { status: 401, message: "Unauthorized: No Token" }
  }
  return new AuthService().check(token, scopes);
}