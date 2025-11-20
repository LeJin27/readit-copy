import { Credentials } from ".";

export class AuthService {
  public async login(credentials: Credentials): Promise<undefined> {
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
      console.log(response.json());
      return undefined;
    } catch (error) {
      console.error("authetncaitcaon failed", error);
      return undefined;
    }
  }
}
