import AsyncStorage from "@react-native-community/async-storage";
import {
	FETCH_FORBIDDEN_FOOD_START,
	FETCH_FORBIDDEN_FOOD_FINISHED,
	FETCH_FORBIDDEN_FOOD_ERROR
} from "./types";

export default function fetchForbiddenFood() {
	return dispatch => {
		dispatch({ type: FETCH_FORBIDDEN_FOOD_START });
		AsyncStorage.getItem("forbidden_food_ids")
			.then(ids => {
				dispatch({
					type: FETCH_FORBIDDEN_FOOD_FINISHED,
					payload: ids === null ? [] : JSON.parse(ids)
				});
			})
			.catch(() => {
				dispatch({
					type: FETCH_FORBIDDEN_FOOD_ERROR,
					payload: "Error fetching stored food ids"
				});
			});
	};
}
