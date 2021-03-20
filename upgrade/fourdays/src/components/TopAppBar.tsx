import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
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
					<Text style={styles.title} adjustsFontSizeToFit allowFontScaling>
						{title}
					</Text>
					<View style={styles.buttons}>{buttons || null}</View>
				</View>
				<View>{bottomViews || null}</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	buttons: {
		marginRight: 8,
		top: 6
	},
	container: {
		backgroundColor: color.white,
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
		...shadow.regular
	},
	title: {
		...textStyle.extraExtraLargeBoldNeutral,
		flex: 1,
		marginLeft: 16
	},
	topContainer: {
		alignItems: "center",
		flexDirection: "row",
		paddingBottom: 8,
		paddingTop: 16
	}
});

export default TopAppBar;
