import React from 'react';
import { Provider } from 'react-redux';
import SetupScreen from './setup/SetupScreen';

import store from './redux/redux';

const App = () => (
	<Provider store={store}>
		<SetupScreen />
	</Provider>
);

export default App;
