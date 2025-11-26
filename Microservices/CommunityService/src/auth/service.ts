import { SessionUser } from "../../types/index";

export class AuthService {
  public async check(
    authHeader?: string,
    scopes?: string[]
  ): Promise<SessionUser> {
    const token = authHeader?.split(" ")[1];

    const url = new URL("http://localhost:3010/api/v0/auth/check");

    if (scopes) {
      for (const scope of scopes) {
        url.searchParams.append("scope", scope);
      }
    }
    console.log(url.toString())

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Unauthorized");
    }

    return response.json();
  }
}
