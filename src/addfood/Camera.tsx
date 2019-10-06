import ImagePicker from "react-native-image-picker";
import I18n from "../translations/i18n";
import { Base64Image } from "./types";

export function showImagePicker(onImageSelect: (data: Base64Image) => void) {
	const options = {
		cameraType: "back",
		cancelButtonTitle: I18n.t("screen.addFood.imagePicker.cancel"),
		chooseFromLibraryButtonTitle: I18n.t(
			"screen.addFood.imagePicker.fromGallery",
		),
		maxHeight: 500,
		maxWidth: 500,
		mediaType: "photo",
		noData: false,
		quality: 1.0,
		storageOptions: {
			path: "images",
			skipBackup: true,
		},
		takePhotoButtonTitle: I18n.t("screen.addFood.imagePicker.fromCamera"),
		title: I18n.t("screen.addFood.imagePicker.title"),
	};

	ImagePicker.showImagePicker(options as any, (response: any) => {
		if (response.data) {
			onImageSelect(response.data);
		}
	});
}
