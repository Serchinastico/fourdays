import * as R from "ramda";
import React from "react";
import { StyleSheet, Picker } from "react-native";
// @ts-ignore
import { style } from "../components/style/style";
import I18n from "../translations/i18n";

export interface Props {
	groups: any[];
	selectedGroupName: string;
	onValueChange: (id: string) => void;
}

class GroupNamePicker extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			groupName: ""
		};
	}

	public render() {
		const { selectedGroupName, onValueChange } = this.props;

		return (
			<Picker
				selectedValue={selectedGroupName}
				style={styles.picker}
				itemStyle={styles.pickerItem}
				onValueChange={(itemValue, _) => onValueChange(itemValue)}
			>
				{this.renderItems()}
			</Picker>
		);
	}

	private renderItems() {
		const { groups } = this.props;

		return R.map(
			group => (
				<Picker.Item key={group.id} label={group.name} value={group.id} />
			),
			groups
		);
	}
}

const styles = StyleSheet.create({
	picker: {
		height: 55,
		width: "100%"
	},
	pickerItem: {
		...style.extraLargeRegularNeutral
	}
});

export default GroupNamePicker;
