import React from "react";
import {
	Animated,
	Dimensions,
	Image,
	Text,
	StyleSheet,
	TouchableHighlight
} from "react-native";
import { color, style, shadow } from "../style/style";

const styles = StyleSheet.create({
	highlightContainer: {
		width: "30%"
	},
	container: {
		borderRadius: 4,
		shadowOffset: { width: 0, height: 0 },
		backgroundColor: color.white,
		...shadow.strong
	},
	containerUnselected: {
		borderRadius: 4,
		shadowOffset: { width: 0, height: 0 },
		backgroundColor: color.white,
		...shadow.regular
	},
	thumbnailContainer: {
		borderRadius: 4,
		backgroundColor: color.white
	},
	thumbnail: {
		width: "100%",
		height: 32 + (Dimensions.get("window").width - 64) / 3,
		borderRadius: 4,
		resizeMode: "contain"
	},
	unselectedTopLayer: {
		width: "100%",
		height: "100%",
		borderRadius: 4,
		resizeMode: "contain",
		backgroundColor: color.white,
		opacity: 0.5,
		position: "absolute"
	},
	name: {
		...style.midMediumBlack,
		alignSelf: "center",
		textAlign: "center",
		margin: 8
	}
});

class FoodItem extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onPressed = this.onPressed.bind(this);

		const { isSelected } = this.props;
		this.state = {
			shadowAnim: new Animated.Value(
				isSelected
					? styles.container.shadowRadius
					: styles.containerUnselected.shadowRadius
			),
			opacityAnim: new Animated.Value(
				isSelected ? 0 : styles.unselectedTopLayer.opacity
			),
			isSelected: isSelected
		};
	}

	static renderThumbnail(thumbnail) {
		return (
			<Image
				style={styles.thumbnail}
				width="95%"
				height={(Dimensions.get("window").width - 64) / 3}
				source={thumbnail}
			/>
		);
	}

	static renderName(name) {
		return <Text style={styles.name}>{name}</Text>;
	}

	static renderUnselectedTopLayer(opacityAnim) {
		return (
			<Animated.View
				style={{ ...styles.unselectedTopLayer, opacity: opacityAnim }}
			/>
		);
	}

	onPressed() {
		const { id, onFoodSelected } = this.props;
		const { isSelected, shadowAnim, opacityAnim } = this.state;

		Animated.parallel([
			Animated.timing(shadowAnim, {
				toValue: isSelected
					? styles.containerUnselected.shadowRadius
					: styles.container.shadowRadius,
				duration: 100
			}),
			Animated.timing(opacityAnim, {
				toValue: isSelected ? styles.unselectedTopLayer.opacity : 0,
				duration: 100
			})
		]).start(() => onFoodSelected(id));
		this.setState({ isSelected: !isSelected });
	}

	render() {
		const { name, thumbnail } = this.props;
		const { shadowAnim, opacityAnim } = this.state;

		const containerStyle = {
			...styles.container,
			shadowRadius: shadowAnim,
			elevation: shadowAnim
		};

		return (
			<TouchableHighlight
				underlayColor={color.white}
				style={styles.highlightContainer}
				onPress={this.onPressed}
			>
				<Animated.View style={containerStyle}>
					{FoodItem.renderThumbnail(thumbnail)}
					{FoodItem.renderName(name)}
					{FoodItem.renderUnselectedTopLayer(opacityAnim)}
				</Animated.View>
			</TouchableHighlight>
		);
	}
}

export default FoodItem;
