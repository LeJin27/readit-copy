"use client";

import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useState, ChangeEvent } from "react";
import { loginAction, loginGoogleAction } from "./action";
import { useRouter } from "next/navigation";
import { GoogleLogin, } from "@react-oauth/google";
export default function LoginBox() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [failedLogin, setFailedLogin] = useState(false);


  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: textFieldValue, name: textFieldName } = event.currentTarget;
    setCredentials((prev) => ({
      ...prev,
      [textFieldName]: textFieldValue,
    }));
  };

  const handleClickSignIn = async () => {
    const validUser = await loginAction({
      email: credentials.email,
      password: credentials.password,
    });
    if (validUser) {
      router.push("/dashboard");
    } else {
      setFailedLogin(true);
    }
  };

  const GoogleLoginComponentHelper = () => {
    return (
      <>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const credential = credentialResponse.credential!;
            const token = {token : credential};
            const validUser = await loginGoogleAction(token);
            if (validUser) {
              router.push("/dashboard");
            }

          }}
          onError={() => {
            console.log("Login Failed");
          }}
        ></GoogleLogin>
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      {GoogleLoginComponentHelper()}
      <Typography variant="h5">
        <strong>DD-MM Visualizer Sign In</strong>
      </Typography>
      <Paper
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
          p: 2,
          gap: 2,
        }}
      >
        <TextField
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleInputChange}
          required
        />
        <TextField
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          required
        />
        <Button variant="contained" onClick={handleClickSignIn}>
          Sign in
        </Button>
        {failedLogin && <Alert severity="warning">Invalid Credentials</Alert>}
      </Paper>
      <Typography>
        No account? <Link href="/signup">Sign Up</Link>
      </Typography>
    </Box>
  );
}
