import I18n from "../translations/i18n";
import ImagePicker from "react-native-image-picker";

export type Base64Image = string;

export function showImagePicker(onImageSelect: (data: Base64Image) => void) {
	const options = {
		title: I18n.t("screen.addFood.imagePicker.title"),
		noData: false,
		quality: 1.0,
		cameraType: "back",
		maxWidth: 500,
		maxHeight: 500,
		mediaType: "photo",
		cancelButtonTitle: I18n.t("screen.addFood.imagePicker.cancel"),
		takePhotoButtonTitle: I18n.t("screen.addFood.imagePicker.fromCamera"),
		chooseFromLibraryButtonTitle: I18n.t(
			"screen.addFood.imagePicker.fromGallery"
		),
		storageOptions: {
			skipBackup: true,
			path: "images"
		}
	};

	ImagePicker.showImagePicker(options as any, (response: any) => {
		if (response.data) {
			onImageSelect(response.data);
		}
	});
}
