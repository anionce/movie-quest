import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { scoreboarReducer } from '../services/slices/scoreboardSlice';
import { movieQuestApi } from '../services/api/movieQuestApi';

const rootReducer = combineReducers({
	[movieQuestApi.reducerPath]: movieQuestApi.reducer,
	scoreBoard: scoreboarReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([movieQuestApi.middleware]),
		preloadedState,
	});

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
