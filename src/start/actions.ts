import AsyncStorage from "@react-native-community/async-storage";
import {
	actions,
	fetchForbiddenFoodError,
	fetchForbiddenFoodFinish,
	fetchForbiddenFoodStart
} from "./types";

export default function fetchForbiddenFood() {
	return async (dispatch: (action: typeof actions) => void) => {
		dispatch(fetchForbiddenFoodStart());

		try {
			const ids = await AsyncStorage.getItem("forbidden_food_ids");

			const parsedIds = ids === null ? [] : JSON.parse(ids);
			dispatch(fetchForbiddenFoodFinish(parsedIds));
		} catch (_) {
			dispatch(fetchForbiddenFoodError("Error fetching stored food ids"));
		}
	};
}
