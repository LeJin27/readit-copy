"use client";

import {
  IconActivity,
  IconChevronRight,
  IconFingerprint,
  IconGauge,
  IconHome,
} from "@tabler/icons-react";
import { Box, Center, Container, NavLink, Typography } from "@mantine/core";
import React from "react";
import { getAll } from "../actions";
import { Community } from "@/types";
import { useRouter } from "next/navigation";
import { NavCreateCommunity } from "./nav_create_community";

export function CommunitiesNavbar() {
  const [communities, setCommunities] = React.useState<Community[]>([]);

  const [active, setActive] = React.useState(0);
  const router = useRouter();

  const data = [
    { icon: IconGauge, label: "Home", description: "Welcome to Readit" },
    {
      icon: IconFingerprint,
      label: "Popular",
      rightSection: <IconChevronRight size={16} stroke={1.5} />,
      //onClick: (indexInput: number) => setActive(indexInput),
    },
    { icon: IconActivity, label: "Activity" },
    { icon: IconActivity, label: "Start a Community", cannotBeActive: true },
  ];
  const offSetIndexForFavorites = data.length;

  const mainNavItems = data.map((item, index) => {
    return (
      <NavLink
        href="#required-for-focus"
        key={item.label}
        active={index === active}
        label={item.label}
        description={item.description}
        rightSection={item.rightSection}
        leftSection={<item.icon size={16} stroke={1.5} />}
        onClick={() => {
          setActive(index);
          //item.onClick?.(index);
        }}
      />
    );
  });

  const communityCard = (community: Community, index : number) => {
    const handleClick = (id: string) => {
      router.push("/community/" + id);
    };
    return (
      <NavLink
        key={community.id}
        label={community.description}
        href="#required-for-focus"
        active={index === active}
        onClick={() => {
          setActive(index);
          handleClick(community.id);
        }}
        leftSection={<IconHome size={16} stroke={1.5} />}
        
      />
    );
  };

  React.useEffect(() => {
    const setCommunityData = async () => {
      const list = await getAll();
      if (list) {
        //setCommunities(list.slice(0,5));
        setCommunities(list);
      }
    };
    setCommunityData();
  }, []);


  return (
    <Box>
      <NavCreateCommunity/>
      {mainNavItems}


      <Typography>Recent</Typography>
      {communities.map((c, index) => communityCard(c, index + offSetIndexForFavorites))}
    </Box>
  );
}
