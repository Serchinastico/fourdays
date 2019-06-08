import React from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import setTestId from "../testIds";
import I18n from "../translations/i18n";
import { color, style, shadow } from "./style/style";

const styles = StyleSheet.create({
	container: {
		height: 64
	},
	background: {
		flex: 1,
		backgroundColor: color.grass,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		...shadow.regular
	},
	text: {
		...style.largeMediumNeutral,
		color: color.white,
		textAlign: "center",
		alignSelf: "center"
	}
});

class AcceptButton extends React.PureComponent {
	render() {
		const { onPress, style } = this.props;

		return (
			<TouchableHighlight
				{...setTestId("acceptSetupButton")}
				underlayColor={color.seafoamGreen}
				style={[styles.container, style]}
				onPress={() => onPress()}
			>
				<View style={styles.background}>
					<Text style={styles.text}>{I18n.t("common.accept.text")}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}
export default AcceptButton;
