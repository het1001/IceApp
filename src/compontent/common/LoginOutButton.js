/**
 * Created by houenteng on 17-8-19.
 */
import React from 'react';
import {
	PropTypes
} from 'react-native';

import {
	Button,
	Modal
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
			<Button type="warning" onClick={() => {
				Modal.alert('', '确定要退出吗?', [
					{ text: '确定', onPress: () => this.onLoginOut.bind(this)()},
					{ text: '取消', onPress: () => {} }
				])
			}}>退出登录</Button>
		);
	}
}

export default LoginOutButton;