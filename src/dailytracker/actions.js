import { SELECT_DAY_IN_CALENDAR } from "./types";

export default function selectDayInCalendar(day) {
	return {
		type: SELECT_DAY_IN_CALENDAR,
		payload: day
	};
}
