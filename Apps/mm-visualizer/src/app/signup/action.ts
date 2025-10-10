"use server";
import { cookies } from "next/headers"
import { NewUserCredentials, User } from "../../auth"
import { AuthService } from "../../auth/service"

export async function signUpAction(credential: NewUserCredentials): Promise<User | undefined> {
  try {
    const user = await new AuthService().signUp(credential)
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

  } catch {
    return undefined
  }
}

