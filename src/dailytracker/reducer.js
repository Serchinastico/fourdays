import { SELECT_DAY_IN_CALENDAR } from "./types";

const initialState = {};

const onSelectDayInCalendar = (state, action) => {
	return { ...state, daySelectedInCalendar: action.payload };
};

const dailyTrackerReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELECT_DAY_IN_CALENDAR:
			return onSelectDayInCalendar(state, action);
		default:
			return state;
	}
};

export default dailyTrackerReducer;
