import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
	value: 0,
};

export const exampleSlice = createSlice({
	name: 'slice',
	initialState,
	reducers: {
		addSomething: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
});

export const { addSomething } = exampleSlice.actions;

export const exampleReducer = exampleSlice.reducer;

export const selectData = createSelector(
	(state: RootState) => state.example.value,
	data => Object.values(data)
);
