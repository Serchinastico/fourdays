import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import devToolsEnhancer from "remote-redux-devtools";
import dailyTrackerReducer from "../dailytracker/reducer";
import setupReducer from "../setup/reducer";

const rootReducer = combineReducers({
	setup: setupReducer,
	dailyTracker: dailyTrackerReducer
});

const configureStore = initialState => {
	const middleware = compose(
		applyMiddleware(thunk),
		devToolsEnhancer()
	);
	return createStore(rootReducer, initialState, middleware);
};
export default configureStore();
