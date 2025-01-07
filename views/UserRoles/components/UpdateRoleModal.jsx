import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel, FormGroup, Grid, Divider, Typography, List, ListItem, IconButton, ListItemText, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Delete, Edit } from "lucide-react";
import { updateRole, getCollections, getRoleById } from "../../../redux/thunk/userrole";
import { useDispatch, useSelector } from "react-redux";

function UpdateRoleModal({ open, onClose, selectedRole, onUpdate }) {
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
  const [editCollection, setEditCollection] = useState(null); 
  const [error, setError] = useState({
    roleName: "",
    collectionName: "",
    roleAccess: ""
  });

  const dispatch = useDispatch();
  const collections = useSelector((state) => state.userrole?.collections || []);
  const userRoleId =localStorage.getItem("userRoleId")
  useEffect(() => {
    if (selectedRole) {
      setRoleName(selectedRole.roleName || "");
      if (selectedRole.roleAccess === "all") {
        setIsAllAccess(true);
        setRoleAccess([]);
      } else {
        setRoleAccess(selectedRole.roleAccess || []);
        setIsAllAccess(false);
      }
    } else {
      setRoleName("");
      setRoleAccess([]);
      setIsAllAccess(false);
    }
  }, [selectedRole]);

  useEffect(() => {
    if (open) {
      dispatch(getCollections());
    }
  }, [open, dispatch]);

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
    setError((prev) => ({ ...prev, collectionName: "" }));

    const selectedAccessTypes = Object.keys(accessTypes).filter((key) => accessTypes[key]);
    if (selectedAccessTypes.length === 0) {
      setError((prev) => ({ ...prev, roleAccess: "At least one access type must be selected." }));
      return;
    }
    setError((prev) => ({ ...prev, collectionName: "", roleAccess: "" }));

    if (editCollection) {
      // Update existing collection
      setRoleAccess((prev) => {
        const updatedRoleAccess = prev.map((item) =>
          item.collectionName === collectionName
            ? { ...item, accessList: selectedAccessTypes }
            : item
        );
        return updatedRoleAccess;
      });
      setEditCollection(null); // Clear edit state
    } else {
      // Add new collection
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
    }

    setCollectionName("");
    setAccessTypes({
      create: false,
      update: false,
      delete: false,
      read: false
    });
  };

  const handleSubmit = () => {
    let hasError = false;
    const errors = {
      roleName: "",
      roleAccess: ""
    };

    if (roleName.trim() === "") {
      errors.roleName = "Role Name is required.";
      hasError = true;
    }

    if (!isAllAccess && roleAccess.length === 0) {
      errors.roleAccess = "At least one access must be added or enable All Access.";
      hasError = true;
    }

    setError(errors);

    if (!hasError) {
      const updatedRoleData = {
        roleName,
        roleAccess: isAllAccess ? "all" : roleAccess
      };
      dispatch(updateRole({ roleId: selectedRole._id, roleData: updatedRoleData }))
        .unwrap()
        .then(() => {
          onUpdate();
          onClose();
           if (selectedRole._id === userRoleId) {
          dispatch(getRoleById(userRoleId));
           }
        });
    }
  };

  const handleToggleAllAccess = () => {
    setIsAllAccess((prev) => !prev);
    if (!isAllAccess) {
      setRoleAccess([]);
      setError((prev) => ({ ...prev, roleAccess: "" }));
    }
  };

  const handleRemoveCollection = (name) => {
    setRoleAccess((prev) => prev.filter((item) => item.collectionName !== name));
  };

  const handleEditCollection = (collection) => {
    setEditCollection(collection.collectionName);
    setCollectionName(collection.collectionName);
    setAccessTypes({
      create: collection.accessList.includes("create"),
      update: collection.accessList.includes("update"),
      delete: collection.accessList.includes("delete"),
      read: collection.accessList.includes("read")
    });
  };

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        overflow: "auto"
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update User Role</DialogTitle>
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
                    <InputLabel id="collection-select-label">Collection</InputLabel>
                    <Select labelId="collection-select-label" id="collection-select" value={collectionName} onChange={handleCollectionNameChange} label="Collection Name" MenuProps={menuProps}>
                      {collections.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {error.collectionName && (
                    <Typography color="error" variant="body2">
                      {error.collectionName}
                    </Typography>
                  )}
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
                    {editCollection ? "Update Access" : "Add Access"}
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
                    <>
                      <IconButton edge="end" onClick={() => handleEditCollection(item)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleRemoveCollection(item.collectionName)}>
                        <Delete />
                      </IconButton>
                    </>
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateRoleModal;
