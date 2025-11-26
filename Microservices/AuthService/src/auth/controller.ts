import {
  Body,
  Controller,
  Post,
  Security,
  Response,
  Route,
  Get,
  Request,
  Query
} from 'tsoa'
import { Authenticated, Credentials, GoogleToken, NewUser, User } from '.'
import { AuthService } from './service'
import { SessionUser } from '../types';


@Route('auth')
export class AuthController extends Controller {
  @Post('login')
  @Response('401', 'Unauthorised')
  public async login(
    @Body() credentials: Credentials,
  ): Promise<Authenticated | undefined> {
    try {
      const authenticatedUser = await new AuthService().login(credentials);
      if (!authenticatedUser) {
        this.setStatus(401);
        return;
      }
      return authenticatedUser;
    } catch (error) {
      console.error('Error during authcontroller:', error);
      this.setStatus(500);
      return;
    }
  }
  @Post('google-login')
  @Response('401', 'Unauthorised')
  public async googleLogin(
    @Body() credentials: GoogleToken,
  ): Promise<Authenticated | undefined> {
    try {
      const authenticatedUser = await new AuthService().loginGoogle(credentials);
      if (!authenticatedUser) {
        this.setStatus(401);
        return;
      }
      return authenticatedUser;
    } catch (error) {
      console.error('Error during authcontroller:', error);
      this.setStatus(500);
      return;
    }
  }

  @Get('checkRole')
  @Security("jwt")
  @Response('401', 'Unauthorized')
  public async checkRole(
    @Request() request: Express.Request,
    @Query() scope?: string
  ): Promise<SessionUser | undefined> {
    const user = request.user as SessionUser;

    const userScope = user.roles || undefined

    const noScopeSetDefaultTo200 = !scope
    if (noScopeSetDefaultTo200) {
      this.setStatus(200)
      return user
    }

    if (userScope?.includes(scope)) {
      this.setStatus(200); 
      return user
    } else {
      this.setStatus(401); 
    }
  }

  @Get('userInfo')
  @Security("jwt")
  @Response('401', 'Unauthorised')
  public async getUserInfo(
    @Request() request: Express.Request,
  ): Promise<User | undefined> {
    const requestor = request.user as SessionUser;
    const requestorId = requestor.id;
    try {
      const userInfo = await new AuthService().getUserInfo(requestorId)
      return userInfo
    } catch {
      return undefined;
    }
  }

  @Get('validJwt')
  @Security("jwt")
  @Response('401', 'Unauthorised')
  public async validJwt(
    @Request() request: Express.Request,
  ): Promise<SessionUser | undefined> {
    const requestor = request.user as SessionUser;
    return requestor;
  }

  @Post('signup')
  @Response('201', 'user successfully signed up')
  @Response('409', 'Email already associated')
  public async signup(
    @Body() credentials: NewUser,
  ): Promise<Authenticated | undefined> {
    try {
      const emailExists = await new AuthService().emailExistsService(credentials.email)
      if (emailExists) {
        this.setStatus(409)
        return
      }
    } catch (error) {
      console.error('Error during signup for checking if emial exists:', error);
      return;
    }

    try {
      const createdUser = await new AuthService().signUp(credentials);
      this.setStatus(201); 
      return createdUser
    } catch (error) {
      console.error('Error during authcontroller:', error);
      return;
    }
  }



}
