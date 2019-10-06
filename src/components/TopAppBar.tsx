import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import SafeAreaComponent from "../react/SafeAreaComponent";
import SafeAreaPureComponent from "../react/SafeAreaPureComponent";
import { color } from "./style/color";
import { textStyle } from "./style/font";
import { shadow } from "./style/shadow";

interface Props {
	title: string;
	buttons?: ReactNode;
	bottomViews?: ReactNode;
}

class TopAppBar extends SafeAreaPureComponent<Props> {
	public renderWithInsets(insets: EdgeInsets) {
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

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: color.white,
		...shadow.regular,
	},
	topContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 16,
		paddingBottom: 8,
	},
	title: {
		...textStyle.extraExtraLargeBoldNeutral,
		marginLeft: 16,
		flex: 1,
	},
	buttons: {
		marginRight: 8,
		top: 6,
	},
});

export default TopAppBar;
