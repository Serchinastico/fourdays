import React from "react";
import {
	Dimensions,
	Image,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewProps,
	ViewStyle
} from "react-native";
// @ts-ignore
import { style, color } from "../components/style/style";

export interface Props {
	style?: StyleProp<ViewStyle>;
}

export interface State {}

class AddFoodImageView extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	public render() {
		const { style } = this.props;

		return (
			<View style={[styles.container, style]}>
				{this.renderImage()}
				{this.renderFoodName()}
			</View>
		);
	}

	private renderImage() {
		return (
			<Image
				style={styles.image}
				height={240}
				source={require("../images/icon/AddFoodL.png")}
			/>
		);
	}

	private renderFoodName() {
		return <Text>Comida de bacilo</Text>;
	}
}

const styles = StyleSheet.create({
	container: {
		width: 200,
		height: 240,
		backgroundColor: color.white
	},
	foodName: {
		...style.midMediumBlack,
		alignSelf: "center",
		textAlign: "center",
		margin: 8
	},
	image: {
		width: "100%",
		height: 240,
		borderRadius: 4,
		resizeMode: "contain"
	}
});

export default AddFoodImageView;
