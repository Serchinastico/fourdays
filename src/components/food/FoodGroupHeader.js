import React from "react";
import {
	Image,
	Text,
	StyleSheet,
	TouchableHighlight,
	View
} from "react-native";
import { style } from "../style/style";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		height: 48,
		paddingHorizontal: 16,
		marginVertical: 16
	},
	text: {
		...style.largeMediumNeutral
	},
	icon: {
		marginLeft: "auto"
	}
});

class FoodGroupHeader extends React.PureComponent {
	static getOpenCloseImage(isOpen) {
		if (isOpen) {
			return (
				<Image
					style={styles.icon}
					source={require("../../images/icon/ChevronUp.png")}
				/>
			);
		} else {
			return (
				<Image
					style={styles.icon}
					source={require("../../images/icon/ChevronDown.png")}
				/>
			);
		}
	}

	render() {
		const { id, name, isOpen, onGroupSelected } = this.props;

		return (
			<TouchableHighlight
				underlayColor="#FAFAFA"
				onPress={() => onGroupSelected(id)}
			>
				<View style={styles.container}>
					<Text style={styles.text}>{name}</Text>
					{FoodGroupHeader.getOpenCloseImage(isOpen)}
				</View>
			</TouchableHighlight>
		);
	}
}

export default FoodGroupHeader;
