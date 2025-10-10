import {
  Box,
  CardMedia,
  Divider,
  Fab,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Mob, NewMob} from "../../mob";
import GlobeIcon from "../../../public/place_holder.webp";
import { ChangeEvent, useContext, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateMobAction } from "./action";
import MobContext from "./MobContext";

export default function MobCard({ mob }: { mob: Mob }) {
  const [editViewDescription, setEditViewDescription] =
    useState<boolean>(false);
  

  // edit button
  const handleClickEdit = () => {
    setEditViewDescription(true);
  };


  const editDescriptionButton = () => {
    return (
      <Fab
        size="small"
        sx={{ position: "fixed", translate: "3rem" }}
        onClick={handleClickEdit}
      >
        <EditIcon />
      </Fab>
    );
  };


const context = useContext(MobContext);

  if (!context) {
    throw new Error("Context error");
  }
  const { setCurrentMob } = context;


  const handleClickConfirmEdit = async() => {
    setEditViewDescription(false);
    const newMob = await updateMobAction(mob.id, mobDetails)
    setCurrentMob(newMob)
  };


  const confirmEditButton = () => {
    return (
      <Fab
        size="small"
        sx={{ position: "fixed", translate: "3rem" }}
        onClick={handleClickConfirmEdit}
      >
        <CheckCircleIcon />
      </Fab>
    );
  };
  const [mobDetails, setMobDetails] = useState<NewMob>({
    name: mob.name,
    size: mob.size,
    description: mob.description,
    image: mob.image,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: textFieldValue, name: textFieldName } = event.currentTarget;
    setMobDetails((prev) => ({
      ...prev,
      [textFieldName]: textFieldValue,
    }));
  };

  const descriptionComponent = () => {
    return (
      <>
        {editViewDescription ? confirmEditButton() : editDescriptionButton() }
        {editViewDescription ? (
          <TextField name = "description" fullWidth sx = {{minHeight: "10vh"}} multiline={true}
            minRows={3} onChange={handleInputChange} value={mob.description ? mob.description : ''}></TextField>
        ) : (
          <Paper square={false} sx={{ p: 2, width: "100%", minHeight: "9.40vh" }}>
            <Typography>{mob.description}</Typography>
          </Paper>
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "20vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "secondary.main",
          borderRadius: 100,
          padding: 1,
          position: "relative",
        }}
      >
        <Fab
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translate(150%, -50%)",
          }}
          size="small"
        >
          <Typography fontSize="large">
            <strong>{mob.size}</strong>
          </Typography>
        </Fab>

        <CardMedia
          component="img"
          image={GlobeIcon.src}
          sx={{ height: 300, width: 300 }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", width: "60%", my: 2 }}>
        <Divider sx={{ flex: 1, borderColor: "secondary.main" }} />
        <Typography variant="h4" align="center" sx={{ mx: 2 }}>
          <strong>{mob.name}</strong>
        </Typography>
        <Divider sx={{ flex: 1, borderColor: "secondary.main" }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "60%",
          justifyContent: "flex-end",
        }}
      >
        {descriptionComponent()}
      </Box>
    </Box>
  );
}
