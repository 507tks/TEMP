export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: "blue", // Change border color based on validation
    boxShadow: state.isFocused ? "0 0 0 1px blue" : provided.boxShadow,
   
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999 // Ensure the dropdown menu is above other elements
  })
};
