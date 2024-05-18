import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import io from "socket.io-client";
import { Add, Edit, Delete } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CrudTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const api = axios.create({
    baseURL: `http://localhost:3000/api/v1`,
  });

  const accesToken = localStorage.getItem("token");
  
  const apiHeader = { headers: { Authorization: `Bearer ${accesToken}` } };
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState({});
  const [selectData, setSelectData] = useState({});

  useEffect(() => {
    api
      .get("/get-teams", apiHeader)
      .then((res) => {

        setData(res.data.data);
        getSelectedIplTeamList("Not Connected");
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3000"); // Change the URL to match your Socket.IO server URL
    // Socket events handling
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("notify", (data) => {
      console.log("Connected wewto server", data);
      getSelectedIplTeamList("SocketConnected", data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const getSelectedIplTeamList = (text:any, id:any) => {
    api
      .get("/get-user-details", apiHeader)
      .then((res) => {
        console.log("res", res.data.data);

        setSelectData(res.data.data);
        if (text === "SocketConnected" && id === res.data.data._id) {
          handleClick();
        }
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const setSelectedRow = (item: any) => {
    let payloadData = {
      selectTeam: item._id,
    };
    api
      .patch("/subscribe", { selectTeam: item._id }, apiHeader)
      .then((res) => {
        console.log("res", apiHeader, payloadData);
        getSelectedIplTeamList("Not Connected");
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  };

  const card = (
    <div>
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          User {selectData?.name} Selected - {selectData?.selectTeam?.name} Ipl Team
          Id {selectData?.selectTeam?.id}
        </Typography>
      </CardContent>
    </div>
  );

  return (
    <>
      <div>
        <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">{card}</Card>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            User {selectData?.name} Selected - {selectData?.selectTeam?.name}{" "}
            Ipl Team Id {selectData?.selectTeam?.id}
          </Alert>
        </Snackbar>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} onClick={() => setSelectedRow(item)}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CrudTable;