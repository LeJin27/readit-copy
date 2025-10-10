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
export class TemplateResolver {
  @Query(() => String)
  dummy(): string {
    return "OK";
  }

  @Authorized("driver")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => String)
  template(@Ctx() Request: Request): string {
    const user = Request.user?.id;
    console.log(user);
    
    return "AuthorizedTemplate";
  }
}
