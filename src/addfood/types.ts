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
