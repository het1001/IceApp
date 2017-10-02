/**
 * Created by houenteng on 17-10-1.
 */
import React from 'react';
import {
	PropTypes,
	View,
	Text,
	BackAndroid,
	TouchableNativeFeedback
} from 'react-native';

import {
	RefreshControl,
	Modal,
	ListView
} from 'antd-mobile';

import HeaderNoBack from '../HeaderNoBack';
import StyleSheet from 'StyleSheet';
import CommodityAction from '../../action/CommodityAction';

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
});

const ComDetail = React.createClass({
	propTypes: {
		//title: PropTypes.string.isRequired,
	},

	listener: null,

	getInitialState() {
		return {
		};
	},
	componentWillMount() {
		this.listener = BackAndroid.addEventListener('hardwareBackPress', () => {
			this.props.navigator.pop();
			return true;
		});
	},

	componentDidMount() {

	},

	componentWillUnmount() {
		this.listener.remove('hardwareBackPress');
	},

	fetch() {
		CommodityAction.queryAllOnline({
			params: {},
			success: (res) => {
				if (res && res.success) {
					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(res.data),
						headloading: false,
					});
				}
			},
			error: () => {}
		});
	},

	render() {
		return (
			<View style={{flex: 1}}>
				<HeaderNoBack text="白云冷饮"/>
				<View style={{flex: 1}} >
					<Text>{this.props.id}</Text>
				</View>
			</View>
		);
	}
});

export default ComDetail;