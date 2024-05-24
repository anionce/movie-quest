import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type ScoreBoardState = { clues: number; movie: string | undefined };

const initialState: ScoreBoardState = {
	clues: 3,
	movie: undefined,
};

export const scoreboardSlice = createSlice({
	name: 'slice',
	initialState,
	reducers: {
		setMovie: (state, action: PayloadAction<string>) => {
			state.movie = action.payload;
		},
		setClues: (state, action: PayloadAction<number>) => {
			state.clues += action.payload;
		},
		resetClues: state => {
			state.clues = 3;
		},
		decreaseClues: state => {
			if (state.clues > 0) {
				state.clues -= 1;
			}
		},
	},
});

export const { decreaseClues, setMovie, setClues, resetClues } = scoreboardSlice.actions;

export const scoreboarReducer = scoreboardSlice.reducer;

export const selectCluesLeft = createSelector(
	(state: RootState) => state.scoreBoard.clues,
	data => data
);

export const selectMovie = createSelector(
	(state: RootState) => state.scoreBoard.movie,
	data => data
);
