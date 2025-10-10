import { Grid } from "@mui/material";
import LoginBox from "./LoginBox";

export default function LoginView() {
  return (
    
    <Grid
      container
      sx={{
        justifyContent: "center",
        height: "100vh",
        mt: 10
      }}
    >
      <Grid size={4}>
        <LoginBox />
      </Grid>
    </Grid>
  );
}
