import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
// @ts-ignore
import { style, color } from "../components/style/style";

export interface Props {
	headerText: string;
	style?: StyleProp<ViewStyle>;
}

class InputField extends React.PureComponent<Props> {
	public render() {
		const { headerText, style, children } = this.props;

		return (
			<View style={[styles.container, style]}>
				{InputField.renderHeader(headerText)}
				{children}
				{InputField.renderBottomLine()}
			</View>
		);
	}

	private static renderHeader(text: string) {
		return <Text style={styles.header}>{text}</Text>;
	}

	private static renderBottomLine() {
		return <View style={styles.bottomLine} />;
	}
}

const styles = StyleSheet.create({
	bottomLine: {
		height: 0.5,
		backgroundColor: color.black20
	},
	container: {
		flexDirection: "column"
	},
	header: {
		...style.midBoldBlack
	}
});

export default InputField;
