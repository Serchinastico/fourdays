import React from "react";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import setTestId from "../testIds";
import I18n from "../translations/i18n";
import { color, style, shadow } from "./style/style";

const sharedBackgroundStyle = {
	flex: 1,
	borderRadius: 32,
	justifyContent: "center",
	flexDirection: "column"
};

const styles = StyleSheet.create({
	container: {
		height: 64,
		width: 128,
		alignSelf: "center"
	},
	background: {
		backgroundColor: color.grass,
		...shadow.regular,
		...sharedBackgroundStyle
	},
	disabledBackground: {
		backgroundColor: color.clearGrass,
		...sharedBackgroundStyle
	},
	text: {
		...style.largeMediumBlack,
		color: color.white,
		textAlign: "center"
	}
});

class AcceptButton extends React.PureComponent {
	renderWithInsets(insets) {
		let { onPress, isEnabled, style } = this.props;

		if (isEnabled === undefined || isEnabled) {
			return (
				<TouchableHighlight
					{...setTestId("acceptSetupButton")}
					underlayColor={color.seafoamGreen}
					style={[
						styles.container,
						style,
						{ marginBottom: insets.bottom + 24 }
					]}
					onPress={() => onPress()}
				>
					<View style={styles.background}>
						<Text style={styles.text}>{I18n.t("common.accept.text")}</Text>
					</View>
				</TouchableHighlight>
			);
		} else {
			return (
				<View
					style={[
						styles.container,
						style,
						{ marginBottom: insets.bottom + 24 }
					]}
				>
					<View style={styles.disabledBackground}>
						<Text style={styles.text}>{I18n.t("common.accept.text")}</Text>
					</View>
				</View>
			);
		}
	}

	render() {
		return (
			<SafeAreaConsumer>
				{insets => this.renderWithInsets(insets)}
			</SafeAreaConsumer>
		);
	}
}

export default AcceptButton;
