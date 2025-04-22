import { Child } from "@/types/Child";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface ChildrenState {
  children: Child[];
  error: string | null;
  isLoading: boolean;
}

const initialState: ChildrenState = {
  children: [],
  error: null,
  isLoading: false,
};

const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {
    setChildren: (state, action) => {
      if (state.children !== action.payload) {
        state.children = action.payload;
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetAll: () => {
      return { ...initialState };
    },
  },
});

export const { setChildren, setError, setLoading, resetAll } =
  childrenSlice.actions;

export const selectChildren = (state: RootState) => state.children.children;
export const selectChildrenLoading = (state: RootState) =>
  state.children.isLoading;
export const selectChildrenError = (state: RootState) => state.children.error;

export default childrenSlice.reducer;
