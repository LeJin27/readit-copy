import { Grid } from "@mui/material";
import SignUpBox from "./SignUpBox";

export default function SignUpView() {
  return (
      <Grid
        container
        sx={{
          justifyContent: "center",
          height: "100vh",
          mt: 10,
        }}
      >
        <Grid size={4}>
          <SignUpBox />
        </Grid>
      </Grid>
  );
}
