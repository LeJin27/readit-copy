import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  Int
} from "type-graphql"
import { Request } from "express"
import { CommunityService } from "./service";
import { Community } from "./schema";


@Resolver()
export class CommunityResolver {

  @Query(() => String)
  dummy(): string {
    return "OK";
  }

  @Authorized('user')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => [Community])
  async getAll(
    @Ctx() Request: Request 
  ): Promise<Community[]> {
    const user = Request.user?.id

    const communities = await new CommunityService().getAll();
    return communities;

  }






  /*

  @Authorized('user')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => [Mob])
  async getAll(
    @Ctx() Request: Request
  ): Promise<Mob[]> {

    const user = Request.user?.id
    const mobs = await new MobService().getAll();
    return mobs;
  }

  @Authorized('user')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(() => Number)
  async getCount(
    @Ctx() Request: Request
  ): Promise<number> {

    const user = Request.user?.id
    const count = await new MobService().getCount();
    return count;
  }

  @Authorized('user')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(() => Mob)
  async create(
    @Ctx() Request: Request,
    @Arg("mob", () => NewMob) input: NewMob
  ): Promise<Mob> {
    console.log("called once")

    const user = Request.user?.id
    const mobRes = await new MobService().createMob(input);
    return mobRes;
  }

  @Authorized('user')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(() => Mob)
  async update(
    @Ctx() Request: Request,
    @Arg("id", () => String) mobId: string,
    @Arg("mob", () => NewMob) input: NewMob,
  ): Promise<Mob> {
    console.log("called once")

    const user = Request.user?.id




    const mobRes = await new MobService().updateMob(mobId, input);
    return mobRes;
  }
    */
}



