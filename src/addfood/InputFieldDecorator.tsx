import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
// @ts-ignore
import { color } from "../components/style/color";
import { textStyle } from "../components/style/font";

export interface Props {
	headerText: string;
	style?: StyleProp<ViewStyle>;
}

class InputFieldDecorator extends React.PureComponent<Props> {
	public render() {
		const { headerText, style, children } = this.props;

		return (
			<View style={[styles.container, style]}>
				{InputFieldDecorator.renderHeader(headerText)}
				<View style={styles.childrenContainer}>{children}</View>
				{InputFieldDecorator.renderBottomLine()}
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
		height: 68,
		flexDirection: "column"
	},
	childrenContainer: {
		flex: 1,
		justifyContent: "center"
	},
	header: {
		...textStyle.midBoldBlack
	}
});

export default InputFieldDecorator;
