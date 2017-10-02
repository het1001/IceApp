/**
 * Created by houenteng on 17-2-7.
 */
import React from 'react';
import {
	PropTypes,
	BackAndroid,
} from 'react-native';

import {
	List,
	InputItem,
	Button,
	Toast,
} from 'antd-mobile';

import HeaderNoBack from '../HeaderNoBack';
import UserAction from '../../action/UserAction';
import RegisterPassWord from './RegisterPassWord';
import DeviceInfoUtil from '../../util/DeviceInfoUtil';

const RegisterPhone = React.createClass({
	propTypes: {
		//title: PropTypes.string.isRequired,
	},
	getInitialState() {
		return {
			phone: '',
			authCode: '',
			disabled: false,
			buttonText: '获取验证码'
		};
	},
	componentWillMount() {

	},

	componentDidMount() {
		BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
	},

	componentWillUnmount() {
		BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
	},

	onNext() {
		if (!this.state.phone) {
			Toast.show("请输入手机号", Toast.SHORT);
			return;
		}

		const phone = this.state.phone.replace(/ /g, "");
		if (!PHONE_REG.test(phone)) {
			Toast.show("请输入有效手机号", Toast.SHORT);
			return;
		}

		if (!this.state.authCode) {
			Toast.show("请输入验证码", Toast.SHORT);
			return;
		} else if (this.state.authCode.length != 6) {
			Toast.show("验证码格式错误", Toast.SHORT);
			return;
		}

		UserAction.authCode({
			params: {
				phone,
				authCode: this.state.authCode,
				type: this.props.action ? 'NORMAL' : '',
			},
			success: (data) => {
				if (data && data.success) {
					this.props.navigator.push({
						id: 'setPassWord',
						component: RegisterPassWord,
						params: {
							phone,
							action: this.props.action
						}
					});
				} else {
					switch (data.resultCode) {
						case 'USER_AUTHED':
							Toast.fail("已验证通过，请直接登录");
							break;
						case 'USER_NOT_EXIST':
							Toast.fail("用户不存在");
							break;
						case 'AUTH_FAILED':
							Toast.fail("验证失败");
							break;
						default:
							Toast.fail("系统错误");
					}
				}
			},
			error: (error) => {
				Toast.show(error, Toast.LONG);
			}
		});
	},

	getAuthCode() {
		if (!this.state.phone) {
			Toast.show("请输入手机号", Toast.SHORT);
			return;
		}

		const phone = this.state.phone.replace(/ /g, "");
		if (!PHONE_REG.test(phone)) {
			Toast.show("请输入有效手机号", Toast.SHORT);
			return;
		}

		this.setState({
			disabled: true
		});

		let getAuthCode = UserAction.getInitAuthCode;
		if (this.props.action) {
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
						case 'USER_AUTHED':
							Toast.fail("已验证通过，请直接登录");
							break;
						case 'AUTH_CODE_SEND_TOO_FAST':
							Toast.fail("验证码已发送，请稍后再试");
							break;
						case 'AUTH_CODE_SEND_TIMES_OUT':
							Toast.fail("今天您已经触发了多次验证码，如果均未收到短信，请联系管理员");
							break;
						case 'AUTH_CODE_SEND_FAILED':
							Toast.fail("验证码发送失败");
							break;
						default:
							Toast.fail("系统错误");
					}
				}
			},
			error: (error) => {
				Toast.show(error, Toast.LONG);
			}
		});
	},

	handleBack() {
		if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
			this.props.navigator.pop();
			return true;
		}

		return false;
	},

	render() {
		return (
			<List>
				<HeaderNoBack text="白云冷饮"/>
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
												 onClick={this.getAuthCode}>{this.state.buttonText}</Button>}
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
				<Button onClick={this.onNext}>下一步</Button>
			</List>
		);
	}
});

export default RegisterPhone;