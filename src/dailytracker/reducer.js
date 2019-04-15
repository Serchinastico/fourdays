import moment from "moment";
import { SELECT_DAY } from "./types";

const initialState = {
	selectedDay: moment()
};

const onSelectDay = (state, action) => {
	return { ...state, selectedDay: action.payload };
};

const dailyTrackerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELECT_DAY:
			return onSelectDay(state, action);
		default:
			return state;
	}
};

export default dailyTrackerReducer;
