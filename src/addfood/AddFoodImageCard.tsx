import React from "react";
import {
	Dimensions,
	Image,
	StyleProp,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	ViewStyle
} from "react-native";
// @ts-ignore
import { style, shadow, color } from "../components/style/style";
import ImagePicker from "react-native-image-picker";
// @ts-ignore
import I18n from "../translations/i18n";

export type Base64Image = string;

export interface Props {
	name: string;
	image?: Base64Image;
	onImageSelect: (data: Base64Image) => void;
	style?: StyleProp<ViewStyle>;
}

export interface State {}

class AddFoodImageCard extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.onImagePress = this.onImagePress.bind(this);
	}

	public render() {
		const { name, image, style } = this.props;

		return (
			<View style={[styles.container, style]}>
				<TouchableHighlight
					underlayColor={color.black05}
					onPress={this.onImagePress}
				>
					<View style={styles.card}>
						{AddFoodImageCard.renderImage(image)}
						{AddFoodImageCard.renderFoodName(name)}
					</View>
				</TouchableHighlight>
			</View>
		);
	}

	private static renderImage(image?: Base64Image) {
		if (image) {
			return (
				<Image
					style={styles.image}
					source={{ uri: `data:image/png;base64,${image}` }}
				/>
			);
		} else {
			return (
				<Image
					style={styles.image}
					source={require("../images/icon/AddFoodL.png")}
				/>
			);
		}
	}

	private static renderFoodName(name: string) {
		return (
			<View style={styles.foodNameContainer}>
				<Text numberOfLines={2} style={styles.foodName}>
					{name}
				</Text>
			</View>
		);
	}

	private onImagePress() {
		const { onImageSelect } = this.props;

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
}

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2;
const cardHeight = cardWidth / 0.75;

const styles = StyleSheet.create({
	card: {
		...shadow.strong,
		borderRadius: 4,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		height: cardHeight,
		width: cardWidth,
		backgroundColor: color.white
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	foodName: {
		...style.extraLargeMediumBlack
	},
	foodNameContainer: {
		flex: 1,
		justifyContent: "center",
		marginHorizontal: 16,
		marginBottom: 8
	},
	image: {
		height: cardHeight - 68,
		width: cardWidth - 8,
		marginTop: 4,
		resizeMode: "cover",
		borderRadius: 4
	}
});

export default AddFoodImageCard;
