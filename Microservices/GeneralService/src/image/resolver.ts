import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  Int,
} from "type-graphql";
import { Request } from "express";

@Resolver()
export class ImageResolver {
  @Query(() => String)
  dummy(): string {
    return "OK";
  }

  @Authorized("user")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => String)
  template(@Ctx() Request: Request): string {
    const user = Request.user?.id;
    console.log(user);
    
    return "AuthorizedTemplate";
  }

  @Authorized("user")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => String)
  async getById(
    @Ctx() Request: Request,
    @Arg("id", () => String) id: string,
  ): Promise<string> {
    const user = Request.user?.id;
    console.log(user);
    
    return id;
  }
}
