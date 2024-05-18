import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const api = axios.create({
    baseURL: `http://localhost:3000/api/v1`,
  });

  const accesToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWQ4M2FmZTkwNDFkYTg4YWViZTQxZiIsImVtYWlsIjoicmFtQGdtYWlsLmNvbSIsImlhdCI6MTcxMDA2NDU2NCwiZXhwIjoxNzEwNjY5MzY0fQ.knklKfCZIsK8gV6qzSZBx9R0XXMMGZZ7u8qsEtZFKfY";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    let errorList = [];
    if (password === undefined) {
      errorList.push("Please enter last name");
    }
    if (email === undefined || validateEmail(email)) {
      errorList.push("Please enter a valid email");
    }

    let payloadData = {
      email: email,
      password: password,
    };

    if (errorList.length < 1) {
      //no error
      api
        .post("/login", payloadData)
        .then((res) => {
          const { data } = res.data;
          localStorage.setItem("token", data);
          navigate("/");
        })
        .catch((error) => {
          console.log("error333", error);
        });
    } else {
      console.log("error22", errorList);
      ``;
    }
  };
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const validateEmail = (e: any) => {
    if (e && e.match(isValidEmail)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
