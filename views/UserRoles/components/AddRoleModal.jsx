import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel, FormGroup, Grid, Divider, Typography, List, ListItem, IconButton, ListItemText, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Delete as DeleteIcon } from "lucide-react";
import { addRoles, getCollections } from "../../../redux/thunk/userrole";
import { useDispatch, useSelector } from "react-redux";

function AddRoleModal({ open, onClose, onAdd }) {
  const [roleName, setRoleName] = useState("");
  const [roleAccess, setRoleAccess] = useState([]);
  const [isAllAccess, setIsAllAccess] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [accessTypes, setAccessTypes] = useState({
    create: false,
    update: false,
    delete: false,
    read: false
  });
  const [error, setError] = useState({
    roleName: "",
    collectionName: "",
    roleAccess: ""
  });
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.userrole?.collections || []);

  const handleRoleNameChange = (e) => setRoleName(e.target.value);

  const handleAccessChange = (accessType) => {
    setAccessTypes((prev) => ({
      ...prev,
      [accessType]: !prev[accessType]
    }));
  };

  const handleCollectionNameChange = (e) => setCollectionName(e.target.value);

 const handleAddAccess = () => {
   if (collectionName.trim() === "") {
     setError((prev) => ({ ...prev, collectionName: "Collection Name is required." }));
     return;
   }

   // Check if any access types are selected
   const selectedAccessTypes = Object.keys(accessTypes).filter((key) => accessTypes[key]);
   if (selectedAccessTypes.length === 0) {
     setError((prev) => ({ ...prev, roleAccess: "At least one access type must be selected." }));
     return;
   }

   setError((prev) => ({ ...prev, collectionName: "", roleAccess: "" }));

   // Proceed with adding the access
   setRoleAccess((prev) => {
     const index = prev.findIndex((item) => item.collectionName === collectionName);
     if (index !== -1) {
       const updatedRoleAccess = [...prev];
       updatedRoleAccess[index].accessList = selectedAccessTypes;
       return updatedRoleAccess;
     } else {
       return [...prev, { collectionName, accessList: selectedAccessTypes }];
     }
   });

   // Reset form for next input
   setCollectionName("");
   setAccessTypes({
     create: false,
     update: false,
     delete: false,
     read: false
   });
 };


  useEffect(() => {
    if (open) {
      dispatch(getCollections());
    }
  }, [open, dispatch]);

  const handleSubmit = () => {
    let hasError = false;
    const errors = {
      roleName: "",
      roleAccess: ""
    };

    // Validate Role Name
    if (roleName.trim() === "") {
      errors.roleName = "Role Name is required.";
      hasError = true;
    }

    // Validate Role Access
    if (!isAllAccess && roleAccess.length === 0) {
      errors.roleAccess = "At least one access must be added or enable All Access.";
      hasError = true;
    }

    setError(errors); // Update state with error messages

    // Proceed only if no errors
    if (!hasError) {
      const roleData = {
        roleName,
        roleAccess: isAllAccess ? "all" : roleAccess
      };
      dispatch(addRoles(roleData))
        .unwrap()
        .then(() => {
          onAdd();
          onClose();
          // Reset form
          setRoleName("");
          setRoleAccess([]);
          setIsAllAccess(false);
          setCollectionName("");
          setAccessTypes({
            create: false,
            update: false,
            delete: false,
            read: false
          });
          setError({
            roleName: "",
            collectionName: "",
            roleAccess: ""
          });
        });
    }
  };

  const handleToggleAllAccess = () => {
    setIsAllAccess((prev) => !prev);
    if (!isAllAccess) {
      setRoleAccess([]);
    }
  };

  const handleRemoveCollection = (name) => {
    setRoleAccess((prev) => prev.filter((item) => item.collectionName !== name));
  };

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200, // Adjust this value to fit your design
        overflow: "auto"
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create User Role</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField margin="dense" label="Role Name" fullWidth variant="outlined" value={roleName} onChange={handleRoleNameChange} placeholder="Enter role name" error={!!error.roleName} helperText={error.roleName} />
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={isAllAccess} onChange={handleToggleAllAccess} />} label={<Typography variant="body1">All Access</Typography>} />
              {!isAllAccess && (
                <>
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Collection</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={collectionName} onChange={handleCollectionNameChange} label="Collection Name" MenuProps={menuProps}>
                      {collections.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Divider sx={{ my: 2 }} />
                  <FormGroup>
                    {["create", "update", "delete", "read"].map((access) => (
                      <FormControlLabel key={access} control={<Checkbox checked={accessTypes[access]} onChange={() => handleAccessChange(access)} />} label={<Typography variant="body1">{access.charAt(0).toUpperCase() + access.slice(1)}</Typography>} />
                    ))}
                  </FormGroup>
                  {error.roleAccess && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {error.roleAccess}
                    </Typography>
                  )}
                  <Button onClick={handleAddAccess} variant="contained" color="primary" sx={{ mt: 2 }} disabled={!!error.collectionName}>
                    Add Access
                  </Button>
                </>
              )}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Added Collections
            </Typography>
            <List>
              {roleAccess.map((item) => (
                <ListItem
                  key={item.collectionName}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleRemoveCollection(item.collectionName)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={<Typography variant="body1">{item.collectionName}</Typography>} secondary={item.accessList.join(", ")} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddRoleModal;
