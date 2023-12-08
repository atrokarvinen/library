import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Toast = {
  message: string;
  severity: "success" | "error" | "warning" | "info";
};

type ToastState = {
  message: Toast;
  visible: boolean;
};

const initialState: ToastState = {
  message: { message: "", severity: "info" },
  visible: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Toast>) => {
      state.message = action.payload;
      state.visible = true;
    },
    hide: (state) => {
      state.visible = false;
    },
  },
});

export const { showToast, hide } = toastSlice.actions;

export const toastReducer = toastSlice.reducer;
