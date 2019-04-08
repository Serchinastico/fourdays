import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, StyleSheet, View } from 'react-native';
import style from '../../components/style/style';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		height: 48,
		margin: 16,
	},
	text: {
		...style.largeMediumNeutral,
	},
	icon: {
		marginLeft: 'auto',
	},
});

class SetupFoodGroupHeader extends React.Component {
	getOpenCloseImage(isOpen) {
		if (isOpen) {
			return <Image style={styles.icon} source={require('../../images/icon/ChevronUp.png')} />;
		} else {
			return <Image style={styles.icon} source={require('../../images/icon/ChevronDown.png')} />;
		}
	}

	render() {
		const { name, isOpen } = this.props;

		return (
			<View style={styles.container}>
				<Text style={styles.text}>{name}</Text>
				{this.getOpenCloseImage(isOpen)}
			</View>
		);
	}
}

SetupFoodGroupHeader.propTypes = {
	name: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

export default SetupFoodGroupHeader;
