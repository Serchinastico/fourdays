import { action, payload, union } from "ts-action";

export type Base64Image = string;

export interface Base64FoodImage {
	type: "Base64";
	data: { uri: string };
}

export interface RequireFoodImage {
	type: "Require";
	data: any;
}

export type FoodImage = Base64FoodImage | RequireFoodImage;

export interface CustomFood {
	id: string;
	name: string;
	groupId: string;
	image: FoodImage;
}

export const fetchCustomFoodListStart = action(
	"Fetch custom food list [start]",
);
export const fetchCustomFoodListFinish = action(
	"Fetch custom food list [finish]",
	payload<[CustomFood]>(),
);
export const storeCustomFoodStart = action(
	"Store custom food [start]",
	payload<CustomFood>(),
);
export const storeCustomFoodFinish = action(
	"Store custom food [finish]",
	payload<CustomFood>(),
);

export const fetchCustomFoodActions = union(
	fetchCustomFoodListStart,
	fetchCustomFoodListFinish,
);

export const storeCustomFoodActions = union(
	storeCustomFoodStart,
	storeCustomFoodFinish,
);
