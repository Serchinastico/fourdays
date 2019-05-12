import React from "react";
import {
	Dimensions,
	Image,
	Text,
	StyleSheet,
	TouchableHighlight,
	View
} from "react-native";
import { style } from "./style/style";

const styles = StyleSheet.create({
	container: {
		width: "30%"
	},
	thumbnailContainer: {
		borderRadius: 8,
		shadowRadius: 8,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 0 },
		backgroundColor: "#FFF",
		elevation: 8
	},
	thumbnail: {
		width: "100%",
		height: (Dimensions.get("window").width - 64) / 3,
		borderRadius: 8,
		resizeMode: "contain"
	},
	unselectedThumbnailTopLayer: {
		width: "100%",
		height: (Dimensions.get("window").width - 64) / 3,
		borderRadius: 8,
		resizeMode: "contain",
		backgroundColor: "#FFF",
		opacity: 0.5,
		position: "absolute"
	},
	name: {
		...style.midRegularPrimary,
		alignSelf: "center",
		textAlign: "center",
		margin: 8
	},
	disabledName: {
		...style.midRegularDisabled,
		alignSelf: "center",
		textAlign: "center",
		margin: 8
	}
});

class FoodItem extends React.PureComponent {
	static renderThumbnail(thumbnail, isSelected) {
		if (isSelected) {
			return (
				<View style={styles.thumbnailContainer}>
					<Image
						style={styles.thumbnail}
						width="100%"
						height={(Dimensions.get("window").width - 64) / 3}
						source={thumbnail}
					/>
				</View>
			);
		} else {
			return (
				<View style={styles.thumbnailContainer}>
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
				style={styles.container}
				onPress={() => onFoodSelected(id)}
			>
				<View>
					{FoodItem.renderThumbnail(thumbnail, isSelected)}
					{FoodItem.renderName(name, isSelected)}
				</View>
			</TouchableHighlight>
		);
	}
}

export default FoodItem;
