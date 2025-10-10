import {
  Box,
  Card,
  CardMedia,
  Fab,
  Paper,
  Typography,
} from "@mui/material";
import { Mob } from "../../mob";
import GlobeIcon from "../../../public/place_holder.webp";
import { useContext } from "react";
import MobContext from "./MobContext";

const growFull = { flexGrow: 1, height: "100%" };

export default function MobListCard({ mob }: { mob: Mob }) {
  const context = useContext(MobContext);

  if (!context) {
    throw new Error("Context error");
  }
  const { setCurrentMob } = context;

  const rightButtons = () => {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Fab size="small"></Fab>
        <Fab size="small"></Fab>
      </Box>
    );
  };

  const handleClickMob = () => {
    setCurrentMob(mob)
  }

  return (
    <Box
      sx={{ display: "flex", height: "100%", width: "100%", minHeight: "5vh" }}
    >
      <Paper sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <Card sx={{ ...growFull }}>
          <Box
            sx={{
              ...growFull,
              display: "flex",
              alignItems:"center",
              justifyContent: "space-between",
              gap: 2,
              p: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Fab
                component="div"
                color="secondary"
                sx={{
                  "&:hover": {
                    bgcolor: "secondary.main",
                  },
                }}
                onClick={() => handleClickMob()}
              >
                <CardMedia
                  component="image"
                  image={GlobeIcon.src}
                  color="white"
                  sx={{ height: 60, width: 60 }}
                />
              </Fab>

                <Box>
              <Typography>
                <strong>{mob.name}</strong>
              </Typography>
              <Typography>
                Size: {mob.size}
              </Typography>
</Box>
            </Box>
            {rightButtons()}
          </Box>
        </Card>
      </Paper>
    </Box>
  );
}
