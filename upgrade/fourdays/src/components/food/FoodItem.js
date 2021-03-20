import React from "react";
import {
	Animated,
	Dimensions,
	Image,
	Text,
	StyleSheet,
	TouchableHighlight
} from "react-native";
import { color } from "../style/color";
import { textStyle } from "../style/font";
import { shadow } from "../style/shadow";

const styles = StyleSheet.create({
	highlightContainer: {
		width: "30%"
	},
	container: {
		padding: 4,
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
	thumbnail: {
		borderRadius: 4,
		alignSelf: "center",
		resizeMode: "cover"
	},
	unselectedTopLayer: {
		width: "100%",
		height: "100%",
		borderRadius: 4,
		resizeMode: "cover",
		alignSelf: "center",
		backgroundColor: color.white,
		opacity: 0.5,
		position: "absolute"
	},
	name: {
		...textStyle.midMediumBlack,
		alignSelf: "center",
		textAlign: "center",
		margin: 8
	},
	addFoodName: {
		...textStyle.midMediumDorian,
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
		if (!thumbnail) return null;

		return (
			<Image
				style={styles.thumbnail}
				width="100%"
				height={(Dimensions.get("window").width - 64) / 3}
				source={thumbnail.data}
			/>
		);
	}

	static renderName(name, isAddFood) {
		if (isAddFood) {
			return <Text style={styles.addFoodName}>{name}</Text>;
		} else {
			return <Text style={styles.name}>{name}</Text>;
		}
	}

	static renderUnselectedTopLayer(opacityAnim) {
		return (
			<Animated.View
				style={{ ...styles.unselectedTopLayer, opacity: opacityAnim }}
			/>
		);
	}

	onPressed() {
		const { id, onFoodSelected, shouldAnimate } = this.props;
		const { isSelected, shadowAnim, opacityAnim } = this.state;

		if (shouldAnimate) {
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
		} else {
			onFoodSelected(id);
		}

		this.setState({ isSelected: !isSelected });
	}

	render() {
		const { name, thumbnail, isAddFood } = this.props;
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
					{FoodItem.renderName(name, isAddFood)}
					{FoodItem.renderUnselectedTopLayer(opacityAnim)}
				</Animated.View>
			</TouchableHighlight>
		);
	}
}

export default FoodItem;
