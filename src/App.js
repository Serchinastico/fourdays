import React from "react";
import { Provider } from "react-redux";
import {
	createSwitchNavigator,
	createStackNavigator,
	createAppContainer
} from "react-navigation";
import { AppRegistry, YellowBox, StatusBar } from "react-native";
import SetupSearchScreen from "./setup/components/SetupSearchScreen";
import SetupScreen from "./setup/SetupScreen";
import DailyTrackerScreen from "./dailytracker/DailyTrackerScreen";

import store from "./redux/redux";
import StartScreen from "./start/StartScreen";

const SetupStack = createStackNavigator(
	{
		Setup: SetupScreen,
		Search: SetupSearchScreen
	},
	{
		defaultNavigationOptions: {
			header: null
		}
	}
);
const AppNavigator = createSwitchNavigator(
	{
		Start: StartScreen,
		Setup: SetupStack,
		DailyTracker: DailyTrackerScreen
	},
	{
		defaultNavigationOptions: {
			header: null
		}
	}
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
	<Provider store={store}>
		<StatusBar backgroundColor="white" barStyle="dark-content" />
		<AppContainer />
	</Provider>
);

YellowBox.ignoreWarnings(["Require cycle:"]);

AppRegistry.registerComponent("fourdays", () => App);

export default App;
