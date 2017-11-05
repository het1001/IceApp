/**
 * Created by houenteng on 17-2-6.
 */
import React, {Component} from 'react';
import {
	Text,
	View,
} from 'react-native';
import StyleSheet from 'StyleSheet';

class HeaderNoBack extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.textview}>
					<Text style={styles.textstyle}>{this.props.text || "白云冷饮"}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
		alignSelf: 'stretch',
		backgroundColor: '#4a9df8',
	},
	textview: {
		flex: 1,
		alignSelf: 'center',
	},
	textstyle: {
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
	},
});

export default HeaderNoBack;