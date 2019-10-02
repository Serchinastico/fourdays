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

export interface Props {
	name: string;
	onPressed: () => void;
	style?: StyleProp<ViewStyle>;
}

export interface State {}

class AddFoodImageCard extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	public render() {
		const { name, style } = this.props;

		return (
			<View style={[styles.container, style]}>
				<TouchableHighlight
					underlayColor={color.black05}
					onPress={this.onPressed}
				>
					<View style={styles.card}>
						{AddFoodImageCard.renderImage()}
						{AddFoodImageCard.renderFoodName(name)}
					</View>
				</TouchableHighlight>
			</View>
		);
	}

	private static renderImage() {
		return (
			<Image
				style={styles.image}
				source={require("../images/icon/AddFoodL.png")}
			/>
		);
	}

	private static renderFoodName(name: string) {
		return (
			<View style={styles.foodNameContainer}>
				<Text style={styles.foodName}>{name}</Text>
			</View>
		);
	}

	private onPressed() {
		const { onPressed } = this.props;
		onPressed();
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
		justifyContent: "center"
	},
	image: {
		marginTop: 16,
		resizeMode: "contain"
	}
});

export default AddFoodImageCard;
