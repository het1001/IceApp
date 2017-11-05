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

class LoginOutButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	onLoginOut() {
		storage.remove({
			key: 'user'
		});

		this.props.resetLogin();
	};

	render() {
		return (
			<Button type="warning" onClick={this.onLoginOut.bind(this)}>退出登录</Button>
		);
	}
}

export default LoginOutButton;