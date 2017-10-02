/**
 * Created by houenteng on 17-8-19.
 */
import React from 'react';
import {
	PropTypes
} from 'react-native';

import {
	Button
} from 'antd-mobile';

const LoginOutButton = React.createClass({
	propTypes: {
		//title: PropTypes.string.isRequired,
	},
	getInitialState() {
		return {};
	},

	onLoginOut() {
		storage.remove({
			key: 'user'
		});

		this.props.resetLogin();
	},

	render() {
		return (
			<Button type="warning" onClick={this.onLoginOut}>退出登录</Button>
		);
	}
});

export default LoginOutButton;