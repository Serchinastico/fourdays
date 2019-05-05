import * as R from "ramda";
import {
	FETCH_CONSUMED_FOOD_FOR_DAY_ERROR,
	FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED,
	FETCH_CONSUMED_FOOD_FOR_DAY_START,
	STORE_CONSUMED_FOOD_FOR_DAY_START
} from "./types";

const initialSetupState = {
	consumedFoodIdsByDay: {}
};

const onStoreConsumedFoodForDayStart = (state, payload) => {
	const { id, day } = payload;

	return R.evolve(
		{
			consumedFoodIdsByDay: idsByDay => {
				return { ...idsByDay, [day]: R.append(id, idsByDay[day]) };
			}
		},
		state
	);
};

function onFetchConsumedFoodForDayStart(state, payload) {
	const { day } = payload;

	return R.evolve(
		{
			fetchConsumedFoodForDayError: () => undefined,
			consumedFoodIdsByDay: idsByDay => {
				return { ...idsByDay, [day]: [] };
			}
		},
		state
	);
}

const onFetchConsumedFoodForDayFinished = (state, payload) => {
	const { ids, day } = payload;

	return R.evolve(
		{
			consumedFoodIdsByDay: idsByDay => {
				return { ...idsByDay, [day]: ids };
			}
		},
		state
	);
};

const onFetchConsumedFoodForDayError = (state, payload) => {
	return { ...state, fetchConsumedFoodForDayError: payload };
};

const dailyTrackerReducer = (state = initialSetupState, action) => {
	switch (action.type) {
		case STORE_CONSUMED_FOOD_FOR_DAY_START:
			return onStoreConsumedFoodForDayStart(state, action.payload);
		case FETCH_CONSUMED_FOOD_FOR_DAY_START:
			return onFetchConsumedFoodForDayStart(state, action.payload);
		case FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED:
			return onFetchConsumedFoodForDayFinished(state, action.payload);
		case FETCH_CONSUMED_FOOD_FOR_DAY_ERROR:
			return onFetchConsumedFoodForDayError(state, action.payload);
		default:
			return state;
	}
};

export default dailyTrackerReducer;
