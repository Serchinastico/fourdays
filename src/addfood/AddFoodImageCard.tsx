import React from "react";
import {
	Dimensions,
	Image,
	Keyboard,
	StyleProp,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	ViewStyle
} from "react-native";
// @ts-ignore
import { style, shadow, color } from "../components/style/style";
import { showImagePicker } from "./Camera";
import { FoodImage } from "./types";

export interface Props {
	name: string;
	image?: FoodImage;
	onImageSelect: (image: FoodImage) => void;
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

	private static renderImage(image?: FoodImage) {
		if (image) {
			return <Image style={styles.image} source={image.data} />;
		} else {
			return (
				<Image
					style={[styles.image, { resizeMode: "contain" }]}
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

		// We dismiss the keyboard before navigating to any other screen to keep the accept
		// button in a consistent state. We were experiencing the button to appear in the middle
		// of the screen before this call because the keyboardDidHide callback was never called.
		Keyboard.dismiss();

		showImagePicker((response: any) => {
			if (response) {
				onImageSelect({
					type: "Base64",
					data: { uri: `data:image/png;base64,${response}` }
				});
			}
		});
	}
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
let cardWidth = screenWidth / 2;
let cardHeight = cardWidth / 0.75;
const maxHeight = screenHeight - (246 + 64 + 64 + 32);

if (cardHeight > maxHeight) {
	cardHeight = maxHeight;
	cardWidth = cardHeight * 0.75;
}

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
		alignItems: "center",
		justifyContent: "center"
	},
	foodName: {
		...style.extraLargeMediumBlack,
		textAlign: "center"
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
