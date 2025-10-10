import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Authorized,
  Ctx,
  Int
} from "type-graphql"
import { Mob, NewMob } from "./schema";
import { Request } from "express"
import { MobService } from "./service";


@Resolver()
export class MobResolver {

  @Query(() => String)
  dummy(): string {
    return "OK";
  }

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
}



