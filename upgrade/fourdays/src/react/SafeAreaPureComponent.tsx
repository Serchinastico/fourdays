import React, { ReactNode } from "react";
import { EdgeInsets, SafeAreaConsumer } from "react-native-safe-area-context";

export default abstract class SafeAreaComponent<
	Props = {},
	State = {}
> extends React.PureComponent<Props, State> {
	public abstract renderWithInsets(insets: EdgeInsets): ReactNode;

	public render() {
		return (
			<SafeAreaConsumer>
				{(insets) => this.renderWithInsets(insets!)}
			</SafeAreaConsumer>
		);
	}
}
