"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: null,
};

export const analysisSlice: any = createSlice({
  name: "analysisSlice",
  initialState,
  reducers: {
    saveOnboardingQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { saveOnboardingQuestions } = analysisSlice.actions;
export default analysisSlice.reducer;
