import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { style, color } from "./style/style";

const styles = StyleSheet.create({
	container: {
		marginLeft: 16,
		marginRight: 16,
		marginTop: 20
	},
	title: {
		...style.largeMediumNeutral,
		color: color.brownGray
	},
	subtitle: {
		...style.largeRegularNeutral,
		marginTop: 8
	}
});

class FoodListDescription extends React.PureComponent {
	render() {
		const { title, description } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subtitle}>{description}</Text>
			</View>
		);
	}
}

export default FoodListDescription;