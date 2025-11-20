/**
 * Email pattern (simplified RFC 5322)
 * @pattern ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
 */
export type email = string;

export interface Credentials {
  email: email;
  password: string;
}
