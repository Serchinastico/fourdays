import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SafeAreaComponent from "../react/SafeAreaComponent";
import { color } from "./style/color";
import { textStyle } from "./style/font";
import { shadow } from "./style/shadow";

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: color.white,
		...shadow.regular
	},
	topContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 16,
		paddingBottom: 8
	},
	title: {
		...textStyle.extraExtraLargeBoldNeutral,
		marginLeft: 16,
		flex: 1
	},
	buttons: {
		marginRight: 8,
		top: 6
	}
});

class TopAppBar extends SafeAreaComponent {
	renderWithInsets(insets) {
		const { title, buttons, bottomViews } = this.props;

		return (
			<View style={[styles.container, { paddingTop: insets.top }]}>
				<View style={styles.topContainer}>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.buttons}>{buttons || null}</View>
				</View>
				<View>{bottomViews || null}</View>
			</View>
		);
	}
}

export default TopAppBar;
