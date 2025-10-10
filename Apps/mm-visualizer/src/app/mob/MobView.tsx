"use client";

import { Grid } from "@mui/material";
import MobList from "./MobList";
import MobCreator from "./MobCreator";
import { useEffect, useState } from "react";
import { Mob } from "../../mob";
import { getAllMobsAction } from "./action";
import MobContext from "./MobContext";
import NavigationBar from "../components/NavigationBar";
import MobCard from "./MobCard";

export default function MobView() {
  const [mobList, setMobList] = useState<Mob[]>([]);
  const [currentMob, setCurrentMob] = useState<Mob | undefined>(undefined);

  useEffect(() => {
    const getAllMobsHelper = async () => {
      const mobs = await getAllMobsAction();
      if (mobs) {
        setMobList(mobs);
      } else {
        setMobList([]);
      }
    };
    getAllMobsHelper();
  }, []);

  return (
    <MobContext.Provider value={{ mobList, setMobList, setCurrentMob, currentMob}}>
      <Grid
        container
        sx={{
          justifyContent: "center",
          border: "1px solid black",
          height: "100vh",
        }}
      >
        <Grid size={2}>
          <NavigationBar />
        </Grid>
        <Grid size={6} sx={{ border: "1px solid black", height: "100%" }}>
          {currentMob && <MobCard mob={currentMob}/>}
          <MobCreator />
        </Grid>
        <Grid size={4} sx={{ border: "1px solid black", height: "100%" }}>
          <MobList />
        </Grid>
      </Grid>
    </MobContext.Provider>
  );
}
