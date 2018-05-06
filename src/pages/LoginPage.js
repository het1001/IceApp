/**
 * Created by houenteng on 17-2-2.
 */
import React from 'react';
import {
	StyleSheet,
	PropTypes,
	Text,
	BackHandler,
	Keyboard
} from 'react-native';

import {
	List,
	InputItem,
	Button,
	Toast,
	Modal
} from 'antd-mobile';

import RegisterPhone from '../compontent/register/RegisterPhone';
import HeaderNoBack from '../compontent/HeaderNoBack';

import AppAction from '../action/AppAction';

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	font: {
		marginTop: 5,
		fontSize: 16,
		color: "#4A90E2"
	},
});

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */

class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		let phone = props.navigation && props.navigation.state && props.navigation.state.params ? props.navigation.state.params.phone : '';
		if (phone) {
			const phoneArr = phone.split("");
			phoneArr[2] += " ";
			phoneArr[6] += " ";
			phone = phoneArr.join("");
		}
		this.state = {
			phone: phone || '',
			pwd: '',
		};
	};

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.props.navigation.state.params.onBackAndroid);
	};

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.props.navigation.state.params.onBackAndroid);
	};

	onSubmit() {
		if (!this.state.phone) {
			Toast.show("请输入手机号", 2, null, false);
			return;
		}

		if (!this.state.pwd) {
			Toast.show("请输入密码", 2, null, false);
			return;
		}

		const phone = this.state.phone.replace(/ /g, "");
		if (!PHONE_REG.test(phone)) {
			Toast.show("请输入有效手机号", 2, null, false);
			return;
		}

		Keyboard.dismiss();

		this.props.navigation.state.params.onLogin(phone, this.state.pwd);
	};

	goRegist() {
		this.props.navigation.navigate('RegisterPhone', {
			onLogin: this.props.navigation.state.params.onLogin
		});
	};

	goForgetPwd() {
		this.props.navigation.navigate('RegisterPhone', {
			onLogin: this.props.navigation.state.params.onLogin,
			action: 'FORGETPW'
		});
	};

	render() {
		return (
			<List>
				<HeaderNoBack text="白云冷饮" />
				<InputItem
					onChange={(phone) => this.setState({phone})}
					value={this.state.phone}
					type="phone"
					maxLength={13}
					placeholder="请输入手机号"
				>帐号</InputItem>
				<InputItem
					onChange={(pwd) => this.setState({pwd})}
					value={this.state.pwd}
					type="password"
					maxLength={32}
					placeholder="请输入密码"
				>密码</InputItem>
				<Button type="primary" onClick={this.onSubmit.bind(this)}>登录</Button>
				<Text style={{marginTop: 5}}>
					<Text style={styles.font} onPress={this.goRegist.bind(this)}>新用户注册</Text>
					<Text style={{textAlign: 'right'}}>    </Text>
					<Text style={styles.font} onPress={this.goForgetPwd.bind(this)}>忘记密码？</Text>
				</Text>
			</List>
		);
	}
}

export default LoginPage;