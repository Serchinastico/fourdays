import React from "react";
import {
	Dimensions,
	Image,
	Text,
	StyleSheet,
	TouchableHighlight,
	View
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

	static renderUnselectedTopLayer(isSelected) {
		if (!isSelected) {
			return <View style={styles.unselectedTopLayer} />;
		} else {
			return null;
		}
	}

	render() {
		const { id, name, isSelected, thumbnail, onFoodSelected } = this.props;

		const containerStyle = isSelected
			? styles.container
			: styles.containerUnselected;

		return (
			<TouchableHighlight
				underlayColor="#FAFAFA"
				style={styles.highlightContainer}
				onPress={() => onFoodSelected(id)}
			>
				<View style={containerStyle}>
					{FoodItem.renderThumbnail(thumbnail)}
					{FoodItem.renderName(name)}
					{FoodItem.renderUnselectedTopLayer(isSelected)}
				</View>
			</TouchableHighlight>
		);
	}
}

export default FoodItem;
