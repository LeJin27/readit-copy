
export class AuthService {
  public async validJwt(cookie: string | undefined): Promise<void> {
    const response = await fetch("http://localhost:3010/api/v0/auth/validJwt", {
      method: "GET",

      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });
  }
}
