import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import I18n from '../../translations/i18n';
import style from '../../components/style/style';

const styles = StyleSheet.create({
	container: {
		marginLeft: 16,
		marginRight: 16,
		marginTop: 20,
	},
	title: {
		...style.largeMediumNeutral,
		color: '#383838',
	},
	subtitle: {
		...style.largeRegularNeutral,
		marginTop: 8,
	},
});

const SetupDescription = () => (
	<View style={styles.container}>
		<Text style={styles.title}>{I18n.t('screen.setup.descriptionTitle')}</Text>
		<Text style={styles.subtitle}>{I18n.t('screen.setup.descriptionSubtitle')}</Text>
	</View>
);

export default SetupDescription;
