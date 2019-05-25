import React from "react";
import { TouchableHighlight, StyleSheet, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import setTestId from "../testIds";
import I18n from "../translations/i18n";
import { color, style } from "./style/style";

const styles = StyleSheet.create({
	container: {
		height: 48
	},
	gradient: {
		flex: 1,
		justifyContent: "center",
		alignItems: "stretch",
		elevation: 2,
		borderRadius: 24,
		marginHorizontal: 32
	},
	text: {
		...style.largeMediumNeutral,
		color: color.white,
		textAlign: "center",
		alignSelf: "center",
		marginTop: 8,
		flex: 1
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
				<LinearGradient
					colors={[color.seafoamGreen, color.darkMint]}
					style={styles.gradient}
				>
					<Text style={styles.text}>{I18n.t("common.accept.text")}</Text>
				</LinearGradient>
			</TouchableHighlight>
		);
	}
}
export default AcceptButton;
