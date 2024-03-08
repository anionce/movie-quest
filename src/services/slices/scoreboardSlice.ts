import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type ScoreBoardState = { points: number; movie: string | undefined };

const initialState: ScoreBoardState = {
	points: 100,
	movie: undefined,
};

export const scoreboardSlice = createSlice({
	name: 'slice',
	initialState,
	reducers: {
		setMovie: (state, action: PayloadAction<string>) => {
			state.movie = action.payload;
		},
		decreaseScore: (state, action: PayloadAction<number>) => {
			if (state.points === 0) {
				state.points = 0;
				return;
			}
			if (action.payload === 0) {
				state.points -= 20;
			}
			if (action.payload === 1) {
				state.points -= 40;
			}
			if (action.payload === 2) {
				state.points -= 20;
			}
			if (action.payload === 3) {
				state.points -= 10;
			}
		},
		resetScore: state => {
			state.points = 100;
		},
	},
});

export const { decreaseScore, setMovie, resetScore } = scoreboardSlice.actions;

export const scoreboarReducer = scoreboardSlice.reducer;

export const selectPoints = createSelector(
	(state: RootState) => state.scoreBoard.points,
	data => data
);

export const selectMovie = createSelector(
	(state: RootState) => state.scoreBoard.movie,
	data => data
);
