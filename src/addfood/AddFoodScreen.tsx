import React, { createRef } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { connect } from "react-redux";
// @ts-ignore
import TopAppBar from "../components/TopAppBar";
// @ts-ignore
import { style, color } from "../components/style/style";
// @ts-ignore
import I18n from "../translations/i18n";
// @ts-ignore
import AcceptButton from "../components/AcceptButton";
// @ts-ignore
import IconButton, { IconButtonClear } from "../components/IconButton";
import AddFoodImageCard, { Base64Image } from "./AddFoodImageCard";
import InputField from "./InputField";
import GroupNamePicker from "./GroupNamePicker";

export interface Props {
	groups: any[];
}

export interface State {
	newFoodGroupName: string;
	newFoodName: string;
	newFoodImage?: Base64Image;
}

class AddFoodScreen extends React.Component<Props, State> {
	private foodNameRef = createRef<TextInput>();

	constructor(props: Props) {
		super(props);
		this.onClosePressed = this.onClosePressed.bind(this);
		this.onChangeFoodName = this.onChangeFoodName.bind(this);
		this.onAcceptPress = this.onAcceptPress.bind(this);
		this.onImageSelect = this.onImageSelect.bind(this);
		this.state = {
			newFoodGroupName: "",
			newFoodName: "",
			newFoodImage: undefined
		};
	}

	public render() {
		const { groups } = this.props;
		const { newFoodName, newFoodImage } = this.state;

		return (
			<View style={styles.container}>
				{this.renderTopBar()}
				{this.renderFoodGroupNameEditor(groups)}
				{this.renderFoodNameEditor()}
				{this.renderAddFoodImage(newFoodName, newFoodImage)}
				{this.renderAcceptButton()}
			</View>
		);
	}

	private renderTopBar() {
		const topBar = (
			<TopAppBar
				title={I18n.t("screen.addFood.title")}
				buttons={this.renderTopAppBarButtons()}
			/>
		);

		return <View style={styles.topBarContainer}>{topBar}</View>;
	}

	private renderTopAppBarButtons() {
		return (
			<IconButton icon={IconButtonClear} onPressed={this.onClosePressed()} />
		);
	}

	private renderFoodGroupNameEditor(groups: any[]) {
		const { newFoodGroupName } = this.state;

		return (
			<InputField
				style={styles.textInputContainer}
				headerText={I18n.t("screen.addFood.groupNameHeader")}
			>
				<GroupNamePicker
					groups={groups}
					selectedGroupName={newFoodGroupName}
					onValueChange={(itemValue: string) =>
						this.setState({ newFoodGroupName: itemValue })
					}
				/>
			</InputField>
		);
	}

	private renderFoodNameEditor() {
		const { newFoodName } = this.state;

		return (
			<InputField
				style={styles.textInputContainer}
				headerText={I18n.t("screen.addFood.foodNameHeader")}
			>
				<TextInput
					ref={this.foodNameRef}
					style={styles.textInput}
					placeholder={I18n.t("screen.addFood.foodNamePlaceholder")}
					placeholderTextColor={color.black50}
					onChangeText={text => this.onChangeFoodName(text)}
					value={newFoodName}
				/>
			</InputField>
		);
	}

	private renderAddFoodImage(name: string, image?: Base64Image) {
		return (
			<AddFoodImageCard
				name={name}
				image={image}
				style={styles.addFood}
				onImageSelect={this.onImageSelect}
			/>
		);
	}

	private renderAcceptButton() {
		return (
			<SafeAreaView style={styles.footer}>
				<AcceptButton onPress={this.onAcceptPress} />
			</SafeAreaView>
		);
	}

	private onClosePressed() {}

	private onChangeFoodName(text: string) {
		this.setState({ newFoodName: text });
	}

	private onAcceptPress() {}

	private onImageSelect(data: Base64Image) {
		this.setState({ newFoodImage: data });
	}
}

const styles = StyleSheet.create({
	addFood: {
		flex: 1,
		margin: 16,
		marginBottom: 64 /* Accept button */ + 16 /* Regular margin */
	},
	container: {
		flex: 1,
		backgroundColor: color.white,
		paddingTop: 88 + 16
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0
	},
	textInput: {
		...style.extraLargeRegularNeutral,
		textAlignVertical: "center"
	},
	textInputContainer: {
		marginLeft: 16,
		marginRight: 16,
		marginTop: 16
	},
	topBarContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0
	}
});

function mapStateToProps(state: any) {
	return { groups: state.setup.groups };
}

export default connect(mapStateToProps)(AddFoodScreen);
