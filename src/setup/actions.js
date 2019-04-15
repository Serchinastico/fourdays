import AsyncStorage from "@react-native-community/async-storage";
import {
	STORE_FORBIDDEN_FOOD_START,
	STORE_FORBIDDEN_FOOD_FINISHED,
	STORE_FORBIDDEN_FOOD_ERROR
} from "./types";

export default function storeForbiddenFood(ids) {
	return dispatch => {
		dispatch({ type: STORE_FORBIDDEN_FOOD_START });
		AsyncStorage.setItem("forbidden_food_ids", JSON.stringify(ids))
			.then(() => {
				dispatch({
					type: STORE_FORBIDDEN_FOOD_FINISHED,
					payload: ids
				});
			})
			.catch(() => {
				dispatch({
					type: STORE_FORBIDDEN_FOOD_ERROR
				});
			});
	};
}
