import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
	render() {
		const { title, buttons, bottomViews } = this.props;

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.topContainer}>
					<Text style={styles.title}>{title}</Text>
					<View style={styles.buttons}>{buttons || null}</View>
				</View>
				<View>{bottomViews || null}</View>
			</SafeAreaView>
		);
	}
}

export default TopAppBar;
