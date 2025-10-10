import { email, midt} from "../types"

export interface Credentials {
  email: email,
  password: string
}

export interface Authenticated {
  name: string,
  email?: string,
  accessToken: midt
}

export interface User {
  name: string,
  email?: string,
}

export interface NewUser {
  name: string,
  email?: string,
  password: string,
}

export interface GoogleToken {
  token: string
}