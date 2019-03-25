import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import I18n from '../../translations/i18n';

const styles = StyleSheet.create({
	container: {
		margin: 16,
		marginTop: 20,
		elevation: 1,
	},
	title: {
		fontSize: 16,
		color: '#383838',
	},
	subtitle: {
		marginTop: 8,
		fontSize: 16,
		color: '#A1A1A1',
	},
});

const SetupDescription = () => (
	<View style={styles.container}>
		<Text style={styles.title}>{I18n.t('screen.setup.descriptionTitle')}</Text>
		<Text style={styles.subtitle}>{I18n.t('screen.setup.descriptionSubtitle')}</Text>
	</View>
);

export default SetupDescription;
