import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type ScoreBoardState = { clues: number; movie: string | undefined; moviePoster: string | undefined };

const initialState: ScoreBoardState = {
	clues: 3,
	movie: undefined,
	moviePoster: undefined,
};

export const scoreboardSlice = createSlice({
	name: 'slice',
	initialState,
	reducers: {
		setMovie: (state, action: PayloadAction<string>) => {
			state.movie = action.payload;
		},
		setMoviePoster: (state, action: PayloadAction<string | undefined>) => {
			state.moviePoster = action.payload;
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

export const { decreaseClues, setMovie, setMoviePoster, setClues, resetClues } = scoreboardSlice.actions;

export const scoreboarReducer = scoreboardSlice.reducer;

export const selectCluesLeft = (state: RootState) => state.scoreBoard.clues;

export const selectMovie = (state: RootState) => state.scoreBoard.movie;

export const selectMoviePoster = (state: RootState) => state.scoreBoard.moviePoster;
