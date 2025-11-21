import { Authenticated, Credentials } from "../../types";

export class AuthService {
  public async login(
    credentials: Credentials,
  ): Promise<undefined | Authenticated> {
    const url = "http://localhost:3010/api/v0/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      console.error("Authentication Error", error);
      return undefined;
    }
  }

  public async validJwt(cookie: string | undefined): Promise<void> {
    const url = "http://localhost:3010/api/v0/auth/validJwt";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    if (response.status !== 200) {
      console.log(response.status);
      throw new Error(response.statusText);
    }
  }
}
