/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';
import {
	PropTypes,
	BackHandler
} from 'react-native';

import {
	List,
	InputItem,
	Button,
	Toast,
} from 'antd-mobile';

import UserAction from '../../action/UserAction';
import LoginPage from '../../pages/LoginPage';

class RegisterPassWord extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			passWord: '',
			rePassWord: '',
		};
	};

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackAndroidNotExit.bind(this));
	};

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroidNotExit.bind(this));
	};

	onBackAndroidNotExit() {
		this.props.navigation.goBack();
		return true;
	};

	onNext() {
		if (!this.state.passWord) {
			Toast.show("请输入密码", 2, null, false);
			return;
		} else if (!this.state.rePassWord) {
			Toast.show("请重复输入密码", 2, null, false);
			return;
		} else if (this.state.passWord.length < 6) {
			Toast.show("密码必须大于等于6位", 2, null, false);
			return;
		} else if (this.state.passWord !== this.state.rePassWord) {
			Toast.show("密码不一致", 2, null, false);
			return;
		}

		const {phone, action} = this.props.navigation.state.params;

		let setPassWord = UserAction.setPassWord;
		if (action) {
			setPassWord = UserAction.reSetPassWord;
		}

		setPassWord({
			params: {
				phone,
				passWord: this.state.passWord,
				type: action ? 'NORMAL' : '',
			},
			success: (data) => {
				if (data && data.success) {
					Toast.success("设置成功，请登录", 2, null, false);
					this.props.navigation.navigate('LoginPage', {
						phone,
						onLogin: this.props.navigation.state.params.onLogin
					});
				} else {
					switch (data.resultCode) {
						case 'USER_NOT_EXIST':
							Toast.fail("用户不存在", 2, null, false);
							break;
						case 'USER_NOT_AUTHED':
							Toast.fail("用户还没验证通过", 2, null, false);
							break;
						default:
							Toast.fail("系统错误", 2, null, false);
					}
				}
			},
			error: (error) => {
				Toast.show(error, 2, null, false);
			}
		});
	};

	render() {
		return (
			<List>
				<List.Item>
					<InputItem
						onChange={(passWord) => this.setState({passWord})}
						value={this.state.passWord}
						type="password"
						placeholder="请输入密码"
					>密 码</InputItem>
				</List.Item>
				<List.Item>
					<InputItem
						onChange={(rePassWord) => this.setState({rePassWord})}
						value={this.state.rePassWord}
						type="password"
						placeholder="请重复密码"
					>重复密码</InputItem>
				</List.Item>
				<Button onClick={this.onNext.bind(this)}>下一步</Button>
			</List>
		);
	}
}

export default RegisterPassWord;