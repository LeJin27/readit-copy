
"use client";

import { IconHome2 } from "@tabler/icons-react";
import {Box, Center, Container, NavLink } from "@mantine/core";
import React from "react";
import { getAll } from "../actions";
import { Community } from "../../types";


type CommunitiesCardProps = {
  community: Community;
};

export function CommunitiesCard({ community }: CommunitiesCardProps) {






  return (
        <NavLink
        label= {community.description}
        leftSection={<IconHome2 size={16} stroke={1.5} />}
      />
  );
}
