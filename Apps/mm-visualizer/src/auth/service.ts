import { Authenticated, Credentials, GoogleToken, NewUserCredentials } from ".";

export class AuthService {
  public async validJwt(cookie: string | undefined): Promise<void> {
    const response = await fetch("http://localhost:3010/api/v0/auth/validJwt", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Unauthorized: Invalid JWT");
    }
  }

  public async login(credentials: Credentials): Promise<Authenticated | undefined> {
    try {
      const response = await fetch("http://localhost:3010/api/v0/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.error("Authentication failed:", error);
      return undefined;
    }
  }

  public async loginGoogle(token: GoogleToken): Promise<Authenticated | undefined> {
    try {
      const response = await fetch("http://localhost:3010/api/v0/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token),
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.error("Authentication failed:", error);
      return undefined;
    }
  }
    public async signUp(credentials: NewUserCredentials): Promise<Authenticated | undefined> {
    try {
      const response = await fetch("http://localhost:3010/api/v0/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.status !== 201) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch {
      //console.error("New account failed:", error);
      return undefined;
    }
  }
}
