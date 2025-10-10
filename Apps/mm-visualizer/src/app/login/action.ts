"use server";
import { cookies } from "next/headers"
import { Credentials, GoogleToken, User } from "../../auth"
import { AuthService } from "../../auth/service"

export async function loginAction(credential: Credentials): Promise<User | undefined> {
  const user = await new AuthService().login(credential)
  if (user) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000)
    const session = user.accessToken
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
    return { name: user.name, email : user.email}
  }
  return undefined
}

export async function loginGoogleAction(token: GoogleToken): Promise<User | undefined> {
  const user = await new AuthService().loginGoogle(token)
  if (user) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000)
    const session = user.accessToken
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
    return { name: user.name, email : user.email}
  }
  return undefined
}

export async function logout() {
  (await cookies()).delete('session');
}
