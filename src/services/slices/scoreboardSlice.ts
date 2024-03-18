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
			const pointDeductions: { [key: number]: number } = {
				0: 10,
				1: 10,
				2: 10,
				3: 20,
				4: 20,
				5: 20,
			};

			if (state.points <= 0) {
				state.points = 0;
			} else if (pointDeductions.hasOwnProperty(action.payload)) {
				state.points -= pointDeductions[action.payload];
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
