"use server";
import { cookies } from "next/headers";



  export async function getCookieThemeAction(): Promise<string> {
    try {
      const cookie = (await cookies()).get("theme")?.value;
      if (cookie) {
        return cookie;
      } else {
        return 'light'
      }
    } catch {
      return 'light';
    }
  }


export async function storeCookieTheme(theme: string): Promise<void> {
  if (theme) {
    const cookieStore = await cookies()

    cookieStore.set('theme', theme, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    })
  }
}