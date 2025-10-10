import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { DashboardComponentProps } from ".";

export default function DashboardCard(props: DashboardComponentProps) {
  return (
    <Card sx={{ m: 1 }}>
      <CardActionArea sx ={{p:3}} onClick={props.onClick}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box     bgcolor="backgroundLight.main" sx ={{ aspectRatio: '1 / 1', display:'flex', alignItems:"center", justifyContent:"center", borderRadius: 2, p:1}}>
        {props.icon}
        </Box>
        <Typography variant="h6"><strong>{props.name}</strong></Typography>
        <Typography variant="h4">{props.number}</Typography>
      </Box>
</CardActionArea>
    </Card>
  );
}
