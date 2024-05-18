import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const api = axios.create({
    baseURL: `http://localhost:3000/api/v1`,
  });

  const accesToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZWQ4M2FmZTkwNDFkYTg4YWViZTQxZiIsImVtYWlsIjoicmFtQGdtYWlsLmNvbSIsImlhdCI6MTcxMDA2NDU2NCwiZXhwIjoxNzEwNjY5MzY0fQ.knklKfCZIsK8gV6qzSZBx9R0XXMMGZZ7u8qsEtZFKfY";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    let errorList = [];
    if (name === undefined) {
      errorList.push("Please enter first name");
    }
    if (password === undefined) {
      errorList.push("Please enter last name");
    }
    if (email === undefined || validateEmail(email)) {
      errorList.push("Please enter a valid email");
    }

    let payloadData = {
      name: name,
      email: email,
      password: password,
      isAdmin: true,
    };

    if (errorList.length < 1) {
      //no error
      api
        .post("/signup", payloadData)
        .then((res) => {
          navigate("/login");
        })
        .catch((error) => {
          console.log("error333", error);
        });
    } else {
      console.log("error22", errorList);
    }
  };
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const validateEmail = (e: any) => {
    if (e && e.match(isValidEmail)) {
      return false;
    } else {
      return true;
    }``
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
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
