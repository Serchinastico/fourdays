import React from "react";
import {
	Image,
	Text,
	StyleSheet,
	TouchableHighlight,
	View
} from "react-native";
import { textStyle } from "../style/font";

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
		...textStyle.largeMediumBlack
	},
	icon: {
		marginLeft: "auto"
	}
});

class FoodGroupHeader extends React.PureComponent {
	render() {
		const { id, name, onGroupSelected, icon } = this.props;

		return (
			<TouchableHighlight
				underlayColor="#FAFAFA"
				onPress={() => onGroupSelected(id)}
			>
				<View style={styles.container}>
					<Text style={styles.text}>{name}</Text>
					<Image
                    style={styles.icon}
                    source={icon}
                />
				</View>
			</TouchableHighlight>
		);
	}
}

export default FoodGroupHeader;
