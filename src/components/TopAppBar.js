import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { style, color, shadows } from "./style/style";

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.white,
		flexDirection: "column",
		...shadows.regular
	},
	topContainer: {
		height: 88,
		flexDirection: "row",
		alignItems: "center"
	},
	bottomContainer: {},
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
	render() {
		const { title, buttons, bottomViews } = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.buttons}>{buttons || null}</View>
				</View>
				<View style={styles.bottomContainer}>{bottomViews || null}</View>
			</View>
		);
	}
}

export default TopAppBar;
