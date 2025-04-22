import { EnrollmentWithDetails } from "@/types/Enrollment";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
interface EnrollmentsState {
  enrollments: EnrollmentWithDetails[];
  error: string | null;
  isLoading: boolean;
}

const initialState: EnrollmentsState = {
  enrollments: [],
  error: null,
  isLoading: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      if (state.enrollments !== action.payload) {
        state.enrollments = action.payload;
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

export const { setEnrollments, setError, setLoading, resetAll } = enrollmentsSlice.actions;

export const selectEnrollments = (state: RootState) => state.enrollments.enrollments;
export const selectEnrollmentsError = (state: RootState) => state.enrollments.error;
export const selectEnrollmentsLoading = (state: RootState) => state.enrollments.isLoading;

export default enrollmentsSlice.reducer;