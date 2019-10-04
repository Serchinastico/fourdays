import { Base64Image } from "./Camera";
import * as R from "ramda";
import AsyncStorage from "@react-native-community/async-storage";
import { CustomFood } from "./types";

export type FETCH_CUSTOM_FOOD_LIST_START = "Fetch custom food start";
export type FETCH_CUSTOM_FOOD_LIST_FINISH = "Fetch custom food finish";
export type STORE_CUSTOM_FOOD_START = "Store custom food start";
export type STORE_CUSTOM_FOOD_FINISH = "Store custom food finish";

export interface FetchCustomFoodListStart {
	type: FETCH_CUSTOM_FOOD_LIST_START;
}

export interface FetchCustomFoodListFinish {
	type: FETCH_CUSTOM_FOOD_LIST_FINISH;
	payload: [CustomFood];
}

export interface SaveCustomFoodStart {
	type: STORE_CUSTOM_FOOD_START;
	payload: CustomFood;
}

export interface SaveCustomFoodFinish {
	type: STORE_CUSTOM_FOOD_FINISH;
	payload: CustomFood;
}

export type FetchCustomFood =
	| FetchCustomFoodListStart
	| FetchCustomFoodListFinish;
export type SaveCustomFood = SaveCustomFoodStart | SaveCustomFoodFinish;

async function getStoredCustomFoodList(): Promise<[CustomFood]> {
	const rawCustomFoodList = await AsyncStorage.getItem("custom_food_list");
	return rawCustomFoodList === null ? [] : JSON.parse(rawCustomFoodList);
}

async function storeCustomFoodList(newCustomFoodList: CustomFood[]) {
	await AsyncStorage.setItem(
		"custom_food_list",
		JSON.stringify(newCustomFoodList)
	);
}

export function fetchCustomFood() {
	return async (dispatch: (action: FetchCustomFood) => void) => {
		dispatch({ type: "Fetch custom food start" });

		const customFoodList = await getStoredCustomFoodList();

		dispatch({ type: "Fetch custom food finish", payload: customFoodList });
	};
}

export function storeCustomFood(
	name: string,
	groupId: string,
	image: Base64Image
) {
	return async (dispatch: (action: SaveCustomFood) => void) => {
		const foodItemPayload: CustomFood = {
			id: createRandomId(),
			name,
			groupId,
			image
		};

		dispatch({
			type: "Store custom food start",
			payload: foodItemPayload
		});

		const customFoodList = await getStoredCustomFoodList();
		const newCustomFoodList = R.append(foodItemPayload, customFoodList);
		await storeCustomFoodList(newCustomFoodList);

		dispatch({
			type: "Store custom food finish",
			payload: foodItemPayload
		});
	};
}

function createRandomId(): string {
	return (
		Math.random()
			.toString(36)
			.substring(2, 15) +
		Math.random()
			.toString(36)
			.substring(2, 15)
	);
}
