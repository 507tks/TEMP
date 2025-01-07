import React, { useState } from "react";
import { Button, Menu, MenuItem, Checkbox, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

const ButtonDropdown = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        {label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ width: 600 }}
      >
        {options.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleToggle(item)}
            selected={selectedOptions.includes(item)}
          >
            <Checkbox checked={selectedOptions.includes(item)} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

ButtonDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
};

export default ButtonDropdown;
