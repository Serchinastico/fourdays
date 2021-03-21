import {
	CameraOptions,
	launchCamera,
	launchImageLibrary
} from "react-native-image-picker";
import { Base64Image } from "./types";

type Source = "CAMERA" | "GALLERY";
export type ImagePickerError = "CAMERA_UNAVAILABLE" | "UNKNOWN";

export function showImagePicker(
	source: Source,
	onImageSelect: (data: Base64Image) => void,
	onError: (error: ImagePickerError) => void
) {
	const options: CameraOptions = {
		cameraType: "back",
		maxHeight: 500,
		maxWidth: 500,
		mediaType: "photo",
		quality: 1.0,
		includeBase64: true
	};

	switch (source) {
		case "CAMERA":
			launchCamera(options, response => {
				console.log(response);
				if (response.base64) {
					onImageSelect(response.base64);
				}

				if (response.errorCode) {
					onError(
						response.errorCode === "camera_unavailable"
							? "CAMERA_UNAVAILABLE"
							: "UNKNOWN"
					);
				}
			});
			break;
		case "GALLERY":
			launchImageLibrary(options, response => {
				if (response.base64) {
					onImageSelect(response.base64);
				}

				if (response.errorCode) {
					onError(
						response.errorCode === "camera_unavailable"
							? "CAMERA_UNAVAILABLE"
							: "UNKNOWN"
					);
				}
			});
			break;
	}
}
