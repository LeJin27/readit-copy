"use client";

import {
} from "@tabler/icons-react";
import {Box, Center, Container } from "@mantine/core";
import React from "react";
import { getAll } from "../actions";
import { Community } from "../../types";
import { CommunitiesCard } from "./communities_card";



export function CommunitiesNavbar() {
  const [communities, setCommunities] = React.useState<Community[]>([]);

  React.useEffect(() => {
    const setCommunityData = async () => {
      const list = await getAll();
      if (list) {
        setCommunities(list);
      }
    }
    setCommunityData();
  }, [])




  return (
      <Center>
    <Box>
      {communities.map((c) => (
        <CommunitiesCard key={c.id} community={c} />
      ))}
        
    </Box>
    </Center>
  );
}
