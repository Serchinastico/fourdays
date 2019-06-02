import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { style } from "../style/style";

const styles = StyleSheet.create({
	container: {
		marginLeft: 16,
		marginRight: 16,
		marginTop: 20
	},
	title: {
		...style.largeMediumNeutral
	},
	subtitle: {
		...style.largeRegularNeutral,
		marginTop: 8
	}
});

class FoodListDescription extends React.PureComponent {
	render() {
		const { description } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.subtitle}>{description}</Text>
			</View>
		);
	}
}

export default FoodListDescription;
