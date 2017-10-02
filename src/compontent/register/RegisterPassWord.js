/**
 * Created by houenteng on 17-2-7.
 */

import React, {Component} from 'react';
import {
	StyleSheet,
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
import LoginPage from '../../pages/LoginPage';

const RegisterPassWord = React.createClass({
	propTypes: {
		//title: PropTypes.string.isRequired,
	},
	getInitialState() {
		return {
			passWord: '',
			rePassWord: '',
		};
	},

	onNext() {
		if (!this.state.passWord) {
			Toast.show("请输入密码", Toast.SHORT);
			return;
		} else if (!this.state.rePassWord) {
			Toast.show("请重复输入密码", Toast.SHORT);
			return;
		} else if (this.state.passWord.length < 6) {
			Toast.show("密码必须大于等于6位", Toast.SHORT);
			return;
		} else if (this.state.passWord !== this.state.rePassWord) {
			Toast.show("密码不一致", Toast.SHORT);
			return;
		}

		let setPassWord = UserAction.setPassWord;
		if (this.props.action) {
			setPassWord = UserAction.reSetPassWord;
		}

		setPassWord({
			params: {
				phone: this.props.phone,
				passWord: this.state.passWord,
				type: this.props.action ? 'NORMAL' : '',
			},
			success: (data) => {
				if (data && data.success) {
					Toast.success("设置成功，请登录", Toast.SHORT);
					this.props.navigator.push({
						id: 'main',
						component: LoginPage,
						params: {
							phone: this.props.phone,
						}
					});
				} else {
					switch (data.resultCode) {
						case 'USER_NOT_EXIST':
							Toast.fail("用户不存在", Toast.SHORT);
							break;
						case 'USER_NOT_AUTHED':
							Toast.fail("用户还没验证通过", Toast.SHORT);
							break;
						default:
							Toast.fail("系统错误", Toast.SHORT);
					}
				}
			},
			error: (error) => {
				Toast.show(error, Toast.LONG);
			}
		});
	},

	render() {
		return (
			<List>
				<HeaderNoBack text="白云冷饮"/>
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
				<Button onClick={this.onNext}>下一步</Button>
			</List>
		);
	}
});

export default RegisterPassWord;