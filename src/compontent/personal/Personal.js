/**
 * Created by houenteng on 17-2-7.
 */
import React from 'react';
import {
	PropTypes
} from 'react-native';

import {
	List,
	InputItem,
	Button
} from 'antd-mobile';

import HeaderNoBack from '../HeaderNoBack';
import LoginOutButton from '../common/LoginOutButton';

const Personal = React.createClass({
	propTypes: {
		//title: PropTypes.string.isRequired,
	},
	getInitialState() {
		return {};
	},
	componentWillMount() {

	},

	componentDidMount() {
	},

	componentWillUnmount() {
	},

	render() {
		return (
			<List>
				<HeaderNoBack text="白云冷饮"/>
				<List.Item>
					<LoginOutButton {...this.props} />
				</List.Item>
			</List>
		);
	}
});

export default Personal;