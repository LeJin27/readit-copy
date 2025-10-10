import {
  Authenticated,
  Credentials,
  GoogleToken,
  NewUser,
  User,
} from ".";
import { pool } from "../db";
import { midt, SessionUser, UUID } from "../types";
import { OAuth2Client } from "google-auth-library";
import * as jwt from "jsonwebtoken";
import {
  emailExistsQuery as emailExistsQuery,
  insertIntoMember,
  insertIntoMemberGoogle,
  selectByCredentials,
  selectUserById,
  selectUserBySub,
  selectUserInfoById,
} from "./queries";

const envSecret = process.env.MASTER_SECRET;
if (!envSecret) {
  throw new Error("JWT_SECRET is not set");
}
const JWT_SECRET = envSecret;

const JWT_OPTIONS: jwt.SignOptions = {
  expiresIn: "30m",
  algorithm: "HS256",
};
export function generateToken(userId: UUID, text = ""): midt {
  return jwt.sign({ id: userId }, JWT_SECRET + text, JWT_OPTIONS);
}

export class AuthService {
  public async check(token: string, scopes?: string[]): Promise<SessionUser> {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      const decodedTokenId = decodedToken.id;

      const query = {
        text: selectUserById,
        values: [decodedTokenId],
      };
      const { rows } = await pool.query(query);
      if (rows.length === 1) {
        const decodedUser = { id: rows[0].id, roles: rows[0].roles };
        if (scopes) {
          for (const scope of scopes) {
            if (!decodedUser.roles || !decodedUser.roles.includes(scope)) {
              throw {
                status: 401,
                message: "Unauthorized: Missing required role",
              };
            }
          }
        }
        return decodedUser;
      } else {
        throw { status: 401, message: "Unauthorized: Nonexistant user" };
      }
    } catch (error) {
      throw { status: 401, message: error };
    }
  }

  public async login(
    credentials: Credentials
  ): Promise<Authenticated | undefined> {
    const query = {
      text: selectByCredentials,
      values: [credentials.email, credentials.password],
    };

    try {
      const { rows } = await pool.query(query);
      if (rows.length === 1) {
        const user = rows[0];
        const accessToken = generateToken(user.id);
        return { name: user.name, accessToken: accessToken, email: user.email };
      } else {
        return undefined;
      }
    } catch {
      return undefined;
    }
  }

  public async loginGoogle(
    googleToken: GoogleToken
  ): Promise<Authenticated | undefined> {
    const CLIENT_ID_GOOGLE = process.env.GOOGLE_CLIENT_ID;
    try {
      const client = new OAuth2Client(CLIENT_ID_GOOGLE);
      const ticket = await client.verifyIdToken({
        idToken: googleToken.token,
        audience: CLIENT_ID_GOOGLE,
      });
      const subId = ticket.getPayload()?.sub
      const query = {
        text: selectUserBySub,
        values: [subId],
      };
      const { rows } = await pool.query(query);
      if (rows.length === 1) {
        const user = rows[0];
        const accessToken = generateToken(user.id);
        return { name: user.name, email: user.email, accessToken: accessToken};
      } else {
        return this.signUpGoogle(googleToken)
      }
    } catch {
      return undefined
    }
  }

  public async signUpGoogle(
    googleToken: GoogleToken
  ): Promise<Authenticated | undefined> {
    const CLIENT_ID_GOOGLE = process.env.GOOGLE_CLIENT_ID;
    try {
      const client = new OAuth2Client(CLIENT_ID_GOOGLE);
      const ticket = await client.verifyIdToken({
        idToken: googleToken.token,
        audience: CLIENT_ID_GOOGLE,
      });
      const email = ticket.getPayload()?.email
      const name = ticket.getPayload()?.name
      const subId = ticket.getPayload()?.sub
      const query = {
        text: insertIntoMemberGoogle,
        values: [email, name, subId],
      };
      const { rows } = await pool.query(query);
      if (rows.length === 1) {
        const user = rows[0];
        const accessToken = generateToken(user.id);
        return { name: user.name, email: user.email, accessToken: accessToken};
      } else {
        return undefined
      }
    } catch {
      return undefined
    }
  }


  public async emailExistsService(email: string | undefined): Promise<boolean> {
    const query = {
      text: emailExistsQuery,
      values: [email],
    };
    try {
      const { rows } = await pool.query(query);
      if (rows.length === 1) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  public async getUserInfo(userId: UUID): Promise<User | undefined> {
    const query = {
      text: selectUserInfoById,
      values: [userId],
    };
    try {
      const { rows } = await pool.query(query);
      if (rows.length === 1) {
        const user = rows[0];
        return { name: user.name, email: user.email };
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  public async signUp(
    newUserCredentials: NewUser
  ): Promise<Authenticated | undefined> {
    const query = {
      text: insertIntoMember,
      values: [
        newUserCredentials.email,
        newUserCredentials.password,
        newUserCredentials.name,
      ],
    };

    try {
      const { rows } = await pool.query(query);
      if (rows.length === 1) {
        const user = rows[0];
        const accessToken = generateToken(user.id);
        return { name: user.name, accessToken: accessToken, email: user.email };
      } else {
        return undefined;
      }
    } catch {
      return undefined;
    }
  }
}
