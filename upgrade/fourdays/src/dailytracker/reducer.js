import * as R from "ramda";
import addItemToListIfPresentRemoveOtherwise from "../common/collections";
import { dayFormatForStoringConsumedFoodIds } from "./actions";
import {
	FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED,
	FETCH_CONSUMED_FOOD_FOR_DAY_START,
	STORE_CONSUMED_FOOD_FOR_DAY_START
} from "./types";

const initialSetupState = {
	consumedFoodIdsByDay: {}
};

const onStoreConsumedFoodForDayStart = (state, payload) => {
	const { id, day } = payload;

	const formattedDay = day.format(dayFormatForStoringConsumedFoodIds);
	const storedIds = state.consumedFoodIdsByDay[formattedDay];

	return R.evolve(
		{
			consumedFoodIdsByDay: idsByDay => {
				return {
					...idsByDay,
					[formattedDay]: addItemToListIfPresentRemoveOtherwise(id, storedIds)
				};
			}
		},
		state
	);
};

function onFetchConsumedFoodForDayStart(state, payload) {
	const { days } = payload;

	return R.reduce(
		(state, day) => {
			const formattedDay = day.format(dayFormatForStoringConsumedFoodIds);
			return R.evolve(
				{
					consumedFoodIdsByDay: idsByDay => {
						return { ...idsByDay, [formattedDay]: [] };
					}
				},
				state
			);
		},
		state,
		days
	);
}

const onFetchConsumedFoodForDayFinished = (state, payload) => {
	const { byDay } = payload;

	return R.reduce(
		(state, idsAndDay) => {
			const formattedDay = idsAndDay.day.format(
				dayFormatForStoringConsumedFoodIds
			);
			return R.evolve(
				{
					consumedFoodIdsByDay: idsByDay => {
						return { ...idsByDay, [formattedDay]: idsAndDay.ids };
					}
				},
				state
			);
		},
		state,
		byDay
	);
};

const dailyTrackerReducer = (state = initialSetupState, action) => {
	switch (action.type) {
		case STORE_CONSUMED_FOOD_FOR_DAY_START:
			return onStoreConsumedFoodForDayStart(state, action.payload);
		case FETCH_CONSUMED_FOOD_FOR_DAY_START:
			return onFetchConsumedFoodForDayStart(state, action.payload);
		case FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED:
			return onFetchConsumedFoodForDayFinished(state, action.payload);
		default:
			return state;
	}
};

export default dailyTrackerReducer;
