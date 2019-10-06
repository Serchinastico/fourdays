import AsyncStorage from "@react-native-community/async-storage";
import * as R from "ramda";
import {
	CustomFood,
	fetchCustomFoodActions,
	fetchCustomFoodListFinish,
	fetchCustomFoodListStart,
	FoodImage,
	storeCustomFoodActions,
	storeCustomFoodFinish,
	storeCustomFoodStart,
} from "./types";

async function getStoredCustomFoodList(): Promise<[CustomFood]> {
	const rawCustomFoodList = await AsyncStorage.getItem("custom_food_list");
	return rawCustomFoodList === null ? [] : JSON.parse(rawCustomFoodList);
}

async function storeCustomFoodList(newCustomFoodList: CustomFood[]) {
	await AsyncStorage.setItem(
		"custom_food_list",
		JSON.stringify(newCustomFoodList),
	);
}

export function fetchCustomFood() {
	return async (dispatch: (action: typeof fetchCustomFoodActions) => void) => {
		dispatch(fetchCustomFoodListStart());

		const customFoodList = await getStoredCustomFoodList();

		dispatch(fetchCustomFoodListFinish(customFoodList));
	};
}

export function storeCustomFood(
	name: string,
	groupId: string,
	image: FoodImage,
) {
	return async (dispatch: (action: typeof storeCustomFoodActions) => void) => {
		const foodItemPayload: CustomFood = {
			groupId,
			id: createRandomId(),
			image,
			name,
		};

		dispatch(storeCustomFoodStart(foodItemPayload));

		const customFoodList = await getStoredCustomFoodList();
		const newCustomFoodList = R.append(foodItemPayload, customFoodList);
		await storeCustomFoodList(newCustomFoodList);

		dispatch(storeCustomFoodFinish(foodItemPayload));
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
