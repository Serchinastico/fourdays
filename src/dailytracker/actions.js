import { SELECT_DAY } from "./types";

export default function selectDay(day) {
	return {
		type: SELECT_DAY,
		payload: day
	};
}
