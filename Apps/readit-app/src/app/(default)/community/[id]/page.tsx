"use client";

import { useRouter } from "next/navigation";
import { Community } from "../../../../types";
import React from "react";
import { getById } from "../actions";
import { Box } from "@mantine/core";


export default function Page({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const [community, setCommunity] = React.useState<Community>();
  const { id } = React.use(params);

  React.useEffect(() => {
    const setCommunityData = async () => {
      const item = await getById(id);
      if (item) {
        setCommunity(item);
      }
    };
    setCommunityData();
  }, []);

  return (
    <Box>
      {community?.description}
      {community?.created_at}
      {community?.created_by}
    </Box>
  );
}
