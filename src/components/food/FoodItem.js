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
	thumbnailContainer: {
		borderRadius: 8,
		backgroundColor: "#FFF"
	},
	thumbnail: {
		width: "100%",
		height: 32 + (Dimensions.get("window").width - 64) / 3,
		borderRadius: 4,
		resizeMode: "contain"
	},
	unselectedThumbnailTopLayer: {
		width: "100%",
		height: 32 + (Dimensions.get("window").width - 64) / 3,
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
	},
	disabledName: {
		...style.midMediumBlack,
		alignSelf: "center",
		textAlign: "center",
		margin: 8
	}
});

class FoodItem extends React.PureComponent {
	static renderThumbnail(thumbnail, isSelected) {
		if (isSelected) {
			return (
				<Image
					style={styles.thumbnail}
					width="100%"
					height={(Dimensions.get("window").width - 64) / 3}
					source={thumbnail}
				/>
			);
		} else {
			return (
				<View>
					<Image
						style={styles.thumbnail}
						width="100%"
						height={(Dimensions.get("window").width - 64) / 3}
						source={thumbnail}
					/>
					<View style={styles.unselectedThumbnailTopLayer} />
				</View>
			);
		}
	}

	static renderName(name, isSelected) {
		if (isSelected) {
			return <Text style={styles.name}>{name}</Text>;
		} else {
			return <Text style={styles.disabledName}>{name}</Text>;
		}
	}

	render() {
		const { id, name, isSelected, thumbnail, onFoodSelected } = this.props;
		return (
			<TouchableHighlight
				underlayColor="#FAFAFA"
				style={styles.highlightContainer}
				onPress={() => onFoodSelected(id)}
			>
				<View style={styles.container}>
					{FoodItem.renderThumbnail(thumbnail, isSelected)}
					{FoodItem.renderName(name, isSelected)}
				</View>
			</TouchableHighlight>
		);
	}
}

export default FoodItem;
