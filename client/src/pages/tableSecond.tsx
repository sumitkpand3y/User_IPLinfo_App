import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import { Add, Edit, Delete } from "@material-ui/icons";

const CrudTable = () => {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [operation, setOperation] = useState("create"); // can be 'create' or 'edit'

  useEffect(() => {
    // Fetch data from API and set to state
    // Example: fetchData();
    // setData([...fetchedData]);
  }, []);

  const handleCreate = () => {
    // Handle create operation, make API call to add new data
    // Example: createData(formData);
    setData([...data, formData]);
    setOpenDialog(false);
  };

  const handleEdit = () => {
    // Handle edit operation, make API call to update data
    // Example: updateData(formData);
    const newData = data.map((item) =>
      item.id === formData.id ? formData : item
    );
    setData(newData);
    setOpenDialog(false);
  };

  const handleDelete = (id) => {
    // Handle delete operation, make API call to delete data
    // Example: deleteData(id);
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleOpenDialog = (item, op) => {
    setOperation(op);
    setFormData(item || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog({}, "create")}
      >
        <Add /> Add
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(item, "edit")}
                  >
                    <Edit /> Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Delete /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {operation === "create" ? "Add New Item" : "Edit Item"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={operation === "create" ? handleCreate : handleEdit}
            color="primary"
          >
            {operation === "create" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CrudTable;
