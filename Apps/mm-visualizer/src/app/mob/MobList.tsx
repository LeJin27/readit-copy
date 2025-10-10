"use client";
import { useContext } from "react";
import {
  Autocomplete,
  Box,
  Fab,
  InputAdornment,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import MobListCard from "./MobListCard";
import MobContext from "./MobContext";

export default function MobList() {
  const context = useContext(MobContext);

  if (!context) {
    throw new Error("Context error");
  }
  const { mobList } = context;

  const enterNewMobButton = () => {
    return (
      <>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Fab size="small" color="success">
            <AddIcon />
          </Fab>
          <Fab size="small" color="error">
            <ClearIcon />
          </Fab>
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          overflowY: "auto",
          gap: 1
        }}
      >
        {mobList.map((mob) => (
          <MobListCard key={mob.id} mob={mob}></MobListCard>
        ))}
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Autocomplete
          fullWidth
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          freeSolo={true}
          options={mobList}
          disableClearable
          renderOption={(props, option) => (
            <li
              {...props}
              key={typeof option === "string" ? option : option.id}
            >
              {typeof option === "string" ? option : option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}

                    <InputAdornment position="end">
                      {enterNewMobButton()}
                    </InputAdornment>
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
}
