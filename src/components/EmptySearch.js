import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import I18n from "../translations/i18n";
import { color, style } from "./style/style";

const styles = StyleSheet.create({
	emptyCaseContainer: {
		marginTop: 40,
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	emptyCaseText: {
		...style.largeMediumNeutral,
		textAlign: "center",
		color: color.brownGray,
		marginTop: 8,
		marginLeft: 48,
		marginRight: 48
	}
});

class EmptySearch extends React.PureComponent {
	render() {
		return (
			<View style={styles.emptyCaseContainer}>
				<Image source={require("../images/icon/Empty.png")} />
				<Text style={styles.emptyCaseText}>
					{I18n.t("common.search.emptyCase.title")}
				</Text>
				<Text style={styles.emptyCaseText}>
					{I18n.t("common.search.emptyCase.description")}
				</Text>
			</View>
		);
	}
}
export default EmptySearch;
