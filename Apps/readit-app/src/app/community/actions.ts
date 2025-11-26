"use server";

import { cookies } from "next/headers";
import { Community } from "../../types";
import { CommunityService } from "../../service/community/service"; 

export async function getAll(): Promise<Community[]> {
  const cookie = (await cookies()).get('session')?.value
  const communities = new CommunityService().getAll(cookie);
  return communities;
}