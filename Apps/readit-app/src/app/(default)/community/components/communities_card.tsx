
"use client";

import { IconHome2 } from "@tabler/icons-react";
import {NavLink } from "@mantine/core";
import React from "react";
import { Community } from "@/types";
import { useRouter } from "next/navigation";


type CommunitiesCardProps = {
  community: Community;
};

export function CommunitiesCard({ community }: CommunitiesCardProps) {

  const router = useRouter();
  const handleClick = (id: string) =>{
    router.push("/community/" + id);
  }

  return (
        <NavLink
        label= {community.description}
        onClick={ () => {handleClick(community.id)}}
        leftSection={<IconHome2 size={16} stroke={1.5} />}
      />
  );
}
