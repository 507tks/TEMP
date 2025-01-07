import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  options: [],
  status: "idle",
  error: null
};
const OptionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    addOption: (state, action) => {
      state.options.push(action.payload); // Add to options array
    }
  }
});

export const { addOption } = OptionsSlice.actions;
export default OptionsSlice.reducer;
