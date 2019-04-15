import React from "react";
import { Provider } from "react-redux";
import {
	createSwitchNavigator,
	createStackNavigator,
	createAppContainer
} from "react-navigation";
import { AppRegistry } from "react-native";
import CalendarScreen from "./dailytracker/components/CalendarScreen";
import SetupScreen from "./setup/SetupScreen";
import DailyTrackerScreen from "./dailytracker/DailyTrackerScreen";

import store from "./redux/redux";

const DailyTrackerStack = createStackNavigator(
	{
		DailyTracker: DailyTrackerScreen,
		Calendar: CalendarScreen
	},
	{
		mode: "modal",
		headerMode: "none",
		transparentCard: true,
		cardStyle: { opacity: 0.9 }
	}
);

const AppNavigator = createSwitchNavigator(
	{
		Setup: SetupScreen,
		DailyTracker: DailyTrackerStack
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
		<AppContainer />
	</Provider>
);

AppRegistry.registerComponent("fourdays", () => App);

export default App;
