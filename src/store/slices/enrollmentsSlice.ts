import { EnrollmentWithDetails } from "@/types/Enrollment";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
interface EnrollmentsState {
  todayEnrollments: EnrollmentWithDetails[];
  selectedEnrollments: EnrollmentWithDetails[];
  error: string | null;
  isLoading: boolean;
}

const initialState: EnrollmentsState = {
  todayEnrollments: [],
  selectedEnrollments: [],
  error: null,
  isLoading: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      if (state.todayEnrollments !== action.payload) {
        state.todayEnrollments = action.payload;
      }
    },
    setSelectedEnrollments: (state, action) => {
      if (state.selectedEnrollments !== action.payload) {
        state.selectedEnrollments = action.payload;
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

export const { setEnrollments, setSelectedEnrollments, setError, setLoading, resetAll } = enrollmentsSlice.actions;

export const selectTodayEnrollments = (state: RootState) => state.enrollments.todayEnrollments;
export const selectSelectedEnrollments = (state: RootState) => state.enrollments.selectedEnrollments;
export const selectEnrollmentsError = (state: RootState) => state.enrollments.error;
export const selectEnrollmentsLoading = (state: RootState) => state.enrollments.isLoading;

export default enrollmentsSlice.reducer;