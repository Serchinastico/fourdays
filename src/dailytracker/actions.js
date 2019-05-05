import AsyncStorage from "@react-native-community/async-storage";
import {
	STORE_CONSUMED_FOOD_FOR_DAY_START,
	STORE_CONSUMED_FOOD_FOR_DAY_FINISHED,
	STORE_CONSUMED_FOOD_FOR_DAY_ERROR,
	FETCH_CONSUMED_FOOD_FOR_DAY_START,
	FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED,
	FETCH_CONSUMED_FOOD_FOR_DAY_ERROR
} from "./types";

const dayFormatForStoringConsumedFoodIds = "DD-MMM-YYYY";

export function fetchConsumedFoodForDay(day) {
	return dispatch => {
		dispatch({ type: FETCH_CONSUMED_FOOD_FOR_DAY_START, payload: { day } });

		const formattedDay = day.format(dayFormatForStoringConsumedFoodIds);
		AsyncStorage.getItem(`consumed_food_ids:${formattedDay}`)
			.then(rawIds => {
				const ids = rawIds === null ? [] : JSON.parse(rawIds);

				dispatch({
					type: FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED,
					payload: { day, ids }
				});
			})
			.catch(() => {
				dispatch({
					type: FETCH_CONSUMED_FOOD_FOR_DAY_ERROR
				});
			});
	};
}

export function storeConsumedFoodForDay(id, day) {
	return dispatch => {
		dispatch({ type: STORE_CONSUMED_FOOD_FOR_DAY_START, payload: { id, day } });

		const formattedDay = day.format(dayFormatForStoringConsumedFoodIds);
		AsyncStorage.getItem(`consumed_food_ids:${formattedDay}`)
			.then(rawIds => {
				const ids = rawIds === null ? [] : JSON.parse(rawIds);

				dispatch({
					type: STORE_CONSUMED_FOOD_FOR_DAY_FINISHED,
					payload: ids
				});
			})
			.catch(() => {
				dispatch({
					type: STORE_CONSUMED_FOOD_FOR_DAY_ERROR
				});
			});
	};
}
