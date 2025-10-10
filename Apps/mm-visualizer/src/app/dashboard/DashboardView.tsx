"use client";
import { Box, Fab, Grid, Typography } from "@mui/material";
import DashboardCard from "./DashboardCard";
import AdbIcon from "@mui/icons-material/Adb";
import { useEffect, useState } from "react";
import { getCountMobsAction } from "../mob/action";
import { useRouter } from "next/navigation";

export default function DashboardView() {
  const [mobCount, setMobCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getCount = async () => {
      const mobCountResponse = await getCountMobsAction();
      setMobCount(mobCountResponse);
    };
    getCount();
  }, []);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        border: "1px solid black",
      }}
    >
      <Grid
        container
        justifyContent="center"
        size={12}
        sx={{ border: "1px solid black" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems:"center"}}>
          <Typography variant="h2">
            <strong>Mod Bloat Webapp</strong>
          </Typography>
          <Typography>Welcome to the mod bloat webapp! Where there is a lot of effort spent for the most useless webapp!</Typography>
        <Box sx = {{display:"flex", gap: 2}}>
        <Fab color ="primary" variant="extended">See beginners guide</Fab>
        <Fab variant="extended">Posts</Fab>
        <Fab variant="extended">Contribute</Fab>
        <Fab variant="extended">Github</Fab>
</Box>
        </Box>

      </Grid>




      <Grid size={2}>
        <DashboardCard
          name="Mobs"
          icon={<AdbIcon color="secondary" fontSize="large" />}
          number={mobCount}
          onClick={() => router.push("/mob")}
        />
      </Grid>
      <Grid size={2}>
        <DashboardCard
          name="Mashes"
          icon={<AdbIcon color="secondary" fontSize="large" />}
          number={0}
        />
      </Grid>
      <Grid size={2}>
        <DashboardCard
          name="Regions"
          icon={<AdbIcon color="secondary" fontSize="large" />}
          number={0}
        />
      </Grid>
      <Grid size={2}>
        <DashboardCard
          name="Classes"
          icon={<AdbIcon color="secondary" fontSize="large" />}
          number={0}
        />
      </Grid>
    </Grid>
  );
}
