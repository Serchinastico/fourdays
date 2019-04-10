import React from 'react';
import { Provider } from 'react-redux';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SetupScreen from './setup/SetupScreen';
import DailyTrackerScreen from './dailytracker/DailyTrackerScreen';

import store from './redux/redux';

const AppNavigator = createSwitchNavigator(
	{
		Setup: SetupScreen,
		DailyTracker: DailyTrackerScreen,
	},
	{
		defaultNavigationOptions: {
			header: null,
		},
	}
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
	<Provider store={store}>
		<AppContainer />
	</Provider>
);

export default App;
