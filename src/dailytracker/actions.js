import AsyncStorage from "@react-native-community/async-storage";
import {
	STORE_CONSUMED_FOOD_FOR_DAY_START,
	STORE_CONSUMED_FOOD_FOR_DAY_FINISHED,
	STORE_CONSUMED_FOOD_FOR_DAY_ERROR,
	FETCH_CONSUMED_FOOD_FOR_DAY_START,
	FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED,
	FETCH_CONSUMED_FOOD_FOR_DAY_ERROR
} from "./types";

export const dayFormatForStoringConsumedFoodIds = "DD-MM-YYYY";

function formatDayForStorage(day) {
	return day.format(dayFormatForStoringConsumedFoodIds);
}

function getStorageKeyForDay(day) {
	const formattedDay = formatDayForStorage(day);
	return `consumed_food_ids:${formattedDay}`;
}

async function getConsumedFoodIdsForDay(day) {
	const ids = await AsyncStorage.getItem(getStorageKeyForDay(day));
	return ids === null ? [] : JSON.parse(ids);
}

async function addOrRemoveConsumedFoodIdForDay(day, ids) {
	await AsyncStorage.setItem(getStorageKeyForDay(day), JSON.stringify(ids));
	return ids;
}

export function fetchConsumedFoodForDay(day) {
	return dispatch => {
		dispatch({ type: FETCH_CONSUMED_FOOD_FOR_DAY_START, payload: { day } });

		getConsumedFoodIdsForDay(day)
			.then(ids => {
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

export function storeConsumedFoodForDay(ids, day) {
	return dispatch => {
		dispatch({
			type: STORE_CONSUMED_FOOD_FOR_DAY_START,
			payload: { ids, day }
		});

		addOrRemoveConsumedFoodIdForDay(day, ids)
			.then(ids => {
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
