"use server";
import { cookies } from "next/headers";
import { Credentials, User } from "../../types";
import { AuthService } from "../../service/auth/service";

export async function loginAction(
  credential: Credentials,
): Promise<User | undefined> {
  const user = await new AuthService().login(credential);
  if (user) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const session = user.accessToken;
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
    console.log("Action: User midt cookie set");
    return { name: user.name, email: user.email };
  }
  return undefined;
}
