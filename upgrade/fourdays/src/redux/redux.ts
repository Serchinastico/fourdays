import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import devToolsEnhancer from "remote-redux-devtools";
// @ts-ignore
import dailyTrackerReducer from "../dailytracker/reducer";
// @ts-ignore
import setupReducer from "../setup/reducer";

const rootReducer = combineReducers({
	dailyTracker: dailyTrackerReducer,
	setup: setupReducer,
});

const configureStore = (initialState?: any) => {
	const middleware = compose(
		applyMiddleware(thunk),
		// @ts-ignore
		devToolsEnhancer(),
	);
	return createStore(rootReducer, initialState, middleware);
};

export default configureStore();
