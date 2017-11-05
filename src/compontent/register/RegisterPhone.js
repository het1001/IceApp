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
	Modal
} from 'antd-mobile';

import UserAction from '../../action/UserAction';
import RegisterPassWord from './RegisterPassWord';
import DeviceInfoUtil from '../../util/DeviceInfoUtil';

class RegisterPhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			authCode: '',
			disabled: false,
			buttonText: '获取验证码'
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
		if (!this.state.phone) {
			Toast.show("请输入手机号", 2, null, false);
			return;
		}

		const phone = this.state.phone.replace(/ /g, "");
		if (!PHONE_REG.test(phone)) {
			Toast.show("请输入有效手机号", 2, null, false);
			return;
		}

		if (!this.state.authCode) {
			Toast.show("请输入验证码", 2, null, false);
			return;
		} else if (this.state.authCode.length != 6) {
			Toast.show("验证码格式错误", 2, null, false);
			return;
		}

		const { action } = this.props.navigation.state.params;

		UserAction.authCode({
			params: {
				phone,
				authCode: this.state.authCode,
				type: action ? 'NORMAL' : '',
			},
			success: (data) => {
				if (data && data.success) {
					this.props.navigation.navigate('RegisterPassWord', {
						phone,
						action,
						onLogin: this.props.navigation.state.params.onLogin
					});
				} else {
					switch (data.resultCode) {
						case 'USER_AUTHED':
							Modal.alert("提示", "该手机号已注册，请直接登录", [{ text: '确认', onPress: () => {
								this.props.navigation.navigate('LoginPage', {
									phone,
									onLogin: this.props.navigation.state.params.onLogin
								});
							}}]);
							break;
						case 'USER_NOT_EXIST':
							Toast.fail("用户不存在", 2, null, false);
							break;
						case 'AUTH_FAILED':
							Toast.fail("验证码错误", 2, null, false);
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

	getAuthCode() {
		if (!this.state.phone) {
			Toast.show("请输入手机号", 2, null, false);
			return;
		}

		const phone = this.state.phone.replace(/ /g, "");
		if (!PHONE_REG.test(phone)) {
			Toast.show("请输入有效手机号", 2, null, false);
			return;
		}

		this.setState({
			disabled: true
		});

		let getAuthCode = UserAction.getInitAuthCode;
		if (this.props.navigation.state.params.action) {
			getAuthCode = UserAction.getAuthCode;
		}

		getAuthCode({
			params: Object.assign({
				phone,
			}, DeviceInfoUtil.getDeviceInfo()),
			success: (data) => {
				if (data.success) {
					this.setState({
						buttonText: '60秒'
					});

					let time = 59;
					const interval = setInterval(() => {
						this.setState({
							disabled: true,
							buttonText: time + '秒'
						});
						time--;
						if (time === -1) {
							clearInterval(interval);
							this.setState({
								disabled: false,
								buttonText: '重新获取',
							});
						}
					}, 1000);
				} else {
					this.setState({
						disabled: false
					});

					switch (data.resultCode) {
						case 'USER_NOT_EXIST':
							Toast.fail("该账号还未注册", 2, null, false);
							break;
						case 'USER_AUTHED':
							Modal.alert("提示", "该手机号已注册，请直接登录", [{ text: '确认', onPress: () => {
								this.props.navigation.navigate('LoginPage', {
									phone,
									onLogin: this.props.navigation.state.params.onLogin
								});
							}}]);
							break;
						case 'AUTH_CODE_SEND_TOO_FAST':
							Toast.fail("验证码已发送，请稍后再试", 2, null, false);
							break;
						case 'AUTH_CODE_SEND_TIMES_OUT':
							Toast.fail("今天您已经触发了多次验证码，如果均未收到短信，请联系管理员", 2, null, false);
							break;
						case 'AUTH_CODE_SEND_FAILED':
							Toast.fail("验证码发送失败", 2, null, false);
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
						onChange={(phone) => this.setState({phone})}
						value={this.state.phone}
						type="phone"
						maxLength={13}
						placeholder="请输入手机号"
					>手机号</InputItem>
				</List.Item>
				<List.Item
					extra={<Button type="ghost" style={{width: 100}} disabled={this.state.disabled} inline size="small"
												 onClick={this.getAuthCode.bind(this)}>{this.state.buttonText}</Button>}
					multipleLine
				>
					<InputItem
						onChange={(authCode) => this.setState({authCode})}
						value={this.state.authCode}
						maxLength={6}
						type="number"
						placeholder="请输入验证码"
					>验证码</InputItem>
				</List.Item>
				<Button onClick={this.onNext.bind(this)}>下一步</Button>
			</List>
		);
	}
}

export default RegisterPhone;