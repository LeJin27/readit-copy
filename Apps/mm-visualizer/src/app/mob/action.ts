"use server";
import { cookies } from "next/headers"
import { Mob, NewMob} from "../../mob";
import { MobService } from "../../mob/service";

export async function getAllMobsAction(): Promise<Mob[] | undefined> {
  const cookie = (await cookies()).get('session')?.value;

  try {
    return new MobService().getAll(cookie);
  } catch {
    return undefined
  }
}

export async function getCountMobsAction(): Promise<number> {
  const cookie = (await cookies()).get('session')?.value;

  try {
    return new MobService().getCount(cookie);
  } catch {
    return 0
  }
}

export async function createMobAction(mob: NewMob): Promise<Mob | undefined> {
  const cookie = (await cookies()).get('session')?.value;

  try {
    return new MobService().create(mob, cookie);
  } catch {
    return undefined
  }
}
export async function updateMobAction(mobId: string, mob: NewMob): Promise<Mob | undefined> {
  const cookie = (await cookies()).get('session')?.value;

  try {
    const createdMob = await new MobService().update(mobId, mob, cookie);
    console.log(createdMob.description)
    return createdMob;
  } catch {
    return undefined
  }
}