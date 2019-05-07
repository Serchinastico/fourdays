import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import {
	STORE_CONSUMED_FOOD_FOR_DAY_START,
	STORE_CONSUMED_FOOD_FOR_DAY_FINISHED,
	FETCH_CONSUMED_FOOD_FOR_DAY_START,
	FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED
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

function dayBySubtractingDays(date, days) {
	const updatedDate = moment(date);
	updatedDate.subtract(days, "day");
	return updatedDate;
}

export function fetchForbiddenFoodForDay(day) {
	return async dispatch => {
		const selectedDay = day;
		const dayMinusOne = dayBySubtractingDays(selectedDay, 1);
		const dayMinusTwo = dayBySubtractingDays(selectedDay, 2);
		const dayMinusThree = dayBySubtractingDays(selectedDay, 3);

		dispatch({
			type: FETCH_CONSUMED_FOOD_FOR_DAY_START,
			payload: { days: [selectedDay, dayMinusOne, dayMinusTwo, dayMinusThree] }
		});

		const idsOnDay = await getConsumedFoodIdsForDay(selectedDay);
		const idsOnDayMinusOne = await getConsumedFoodIdsForDay(dayMinusOne);
		const idsOnDayMinusTwo = await getConsumedFoodIdsForDay(dayMinusTwo);
		const idsOnDayMinusThree = await getConsumedFoodIdsForDay(dayMinusThree);

		dispatch({
			type: FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED,
			payload: {
				byDay: [
					{ day: selectedDay, ids: idsOnDay },
					{ day: dayMinusOne, ids: idsOnDayMinusOne },
					{ day: dayMinusTwo, ids: idsOnDayMinusTwo },
					{ day: dayMinusThree, ids: idsOnDayMinusThree }
				]
			}
		});
	};
}

export function storeConsumedFoodForDay(ids, day) {
	return async dispatch => {
		dispatch({
			type: STORE_CONSUMED_FOOD_FOR_DAY_START,
			payload: { ids, day }
		});

		await addOrRemoveConsumedFoodIdForDay(day, ids);
		dispatch({
			type: STORE_CONSUMED_FOOD_FOR_DAY_FINISHED
		});
	};
}
