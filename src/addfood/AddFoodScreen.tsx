import * as R from "ramda";
import React, { createRef } from "react";
import {
	SafeAreaView,
	StyleSheet,
	TextInput,
	View,
	Picker
} from "react-native";
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
// @ts-ignore
import { Dialog } from "react-native-popup-dialog/src";
import AddFoodImageCard from "./AddFoodImageCard";
import InputField from "./InputField";

export interface Props {
	groups: any[];
}

export interface State {
	newFoodGroupName: string;
	newFoodName: string;
}

class AddFoodScreen extends React.Component<Props, State> {
	private foodNameRef = createRef<TextInput>();

	constructor(props: Props) {
		super(props);
		this.onClosePressed = this.onClosePressed.bind(this);
		this.onChangeFoodName = this.onChangeFoodName.bind(this);
		this.onAcceptPress = this.onAcceptPress.bind(this);
		this.onLoadImagePressed = this.onLoadImagePressed.bind(this);
		this.state = {
			newFoodGroupName: "",
			newFoodName: ""
		};
	}

	public render() {
		const { groups } = this.props;
		const { newFoodName } = this.state;

		return (
			<View style={styles.container}>
				{this.renderTopBar()}
				{this.renderFoodGroupNameEditor(groups)}
				{this.renderFoodNameEditor()}
				{this.renderAddFoodImage(newFoodName)}
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

		const pickerItems = R.map(
			group => (
				<Picker.Item
					key={group.id}
					label={I18n.t(group.nameTranslationKey)}
					value={group.id}
				/>
			),
			groups
		);

		return (
			<InputField
				style={styles.textInputContainer}
				headerText={I18n.t("screen.addFood.groupNameHeader")}
			>
				<Picker
					selectedValue={newFoodGroupName}
					style={styles.groupNamePicker}
					itemStyle={styles.textInput}
					onValueChange={(itemValue, _) =>
						this.setState({ newFoodGroupName: itemValue })
					}
				>
					{pickerItems}
				</Picker>
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

	private renderAddFoodImage(name: string) {
		return (
			<AddFoodImageCard
				name={name}
				style={styles.addFood}
				onPressed={this.onLoadImagePressed}
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

	private onLoadImagePressed() {}
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
	groupNamePicker: {
		height: 55,
		width: "100%"
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
