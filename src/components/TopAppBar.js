import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import { style, color, shadow } from "./style/style";

const styles = StyleSheet.create({
	container: {
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
		...style.extraExtraLargeBoldNeutral,
		marginLeft: 16,
		flex: 1
	},
	buttons: {
		marginRight: 8,
		top: 6
	}
});

class TopAppBar extends React.PureComponent {
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

	render() {
		return (
			<SafeAreaConsumer>
				{insets => this.renderWithInsets(insets)}
			</SafeAreaConsumer>
		);
	}
}

export default TopAppBar;
