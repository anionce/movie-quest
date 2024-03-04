import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { exampleReducer } from '../services/slices/exampleSlice';
import { exampleApi } from '../services/api/exampleApi';

const rootReducer = combineReducers({
	[exampleApi.reducerPath]: exampleApi.reducer,
	example: exampleReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: rootReducer,
		devTools: process.env.NODE_ENV !== 'production',
		middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([exampleApi.middleware]),
		preloadedState,
	});

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
