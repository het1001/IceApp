/**
 * Created by houenteng on 17-2-1.
 */
import React from 'react';
import {
	StyleSheet,
	View,
	BackHandler
} from 'react-native';

import {
	Toast
} from 'antd-mobile';

import WaitingPage from './pages/WaitingPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import CompleteShopPage from './pages/CompleteShopPage';
import AuthingPage from './pages/AuthingPage';
import AuthRejectPage from './pages/AuthRejectPage';
import FreeaePage from './pages/FreeaePage';

import ComDetail from './compontent/home/ComDetail';

import AMapLocation from 'react-native-amap-location';

import DeviceInfoUtil from './util/DeviceInfoUtil';
import UserAction from './action/UserAction';

import { StackNavigator } from 'react-navigation';

const styles = StyleSheet.create({
	root: {
		flex: 1,
	}
});

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
class IceApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			userState: ''
		};
	};

	componentWillMount() {
		// 1. 获取手机本地地址（异步去做这个事情）
		this.getLocation();

		// 2. 1.5秒后初始化登录（1.5秒是广告页显示时间）
		setTimeout(this.initLogin.bind(this), 1500);
	};

	unlisten: null;

	getLocation() {
		let i = 0;
		this.unlisten = AMapLocation.addEventListener((data) => {
			i++;
			if (data && data.longitude) {
				localInfo.position = data;
				AMapLocation.stopLocation();
				this.unlisten.remove();
			} else {
				if (i === 5) {
					AMapLocation.stopLocation();
					this.unlisten.remove();
				}
			}
		});

		AMapLocation.startLocation({
			accuracy: 'HighAccuracy',
			killProcess: true,
			needDetail: true,
		});
	};

	initLogin() {
		/** 缓存里取用户手机号
		 * 有的话执行登录
		 * 没有的话设置userState为NOT_LOGIN，显示登录入口
		**/
		storage.load({
			key: 'user',
		}).then(ret => {
			localInfo.phone = ret.userName;
			this.onLogin(ret.userName, ret.passWord);
		}).catch(() => {
			this.toLoginPage();
		});
	};

	toLoginPage() {
		this.props.navigation.navigate('LoginPage', {
			onLogin: this.onLogin.bind(this),
			onBackAndroid: this.onBackAndroid
		});
	};

	onLogin(userName, passWord) {
		UserAction.login({
			params: {
				userName,
				passWord,
				position: JSON.stringify(global.localInfo.position),
				device: JSON.stringify(DeviceInfoUtil.getDeviceInfo()),
			},
			success: (res) => {
				if (res && res.success) {
					localInfo.phone = userName;
					storage.save({
						key: 'user',
						rawData: {
							userName,
							passWord,
							token: res.data.token
						},
					});

					switch (res.data.state) {
						case 'PASSED':
							this.props.navigation.navigate('CompleteShopPage', {
								resetLogin: this.resetLogin.bind(this),
								onBackAndroid: this.onBackAndroid
							});
							break;
						case 'AUDITING':
							this.props.navigation.navigate('AuthingPage', {
								resetLogin: this.resetLogin.bind(this),
								onBackAndroid: this.onBackAndroid
							});
							break;
						case 'AUDIT_NO':
							this.props.navigation.navigate('AuthRejectPage', {
								resetLogin: this.resetLogin.bind(this)
							});
							break;
						case 'FREEAE':
							this.props.navigation.navigate('FreeaePage', {
								resetLogin: this.resetLogin.bind(this)
							});
							break;
						default:
							this.props.navigation.navigate('MainPage', {
								resetLogin: this.resetLogin.bind(this),
								onBackAndroid: this.onBackAndroid
							});
							break;
					}

					/*this.setState({
						userState: res.data.state,
					});*/
				} else {
					this.setState({
						userState: 'NOT_LOGIN',
					});

					switch (res.resultCode) {
						case 'USER_NOT_EXIST':
							Toast.fail("用户名不存在，请先注册", 2, null, false);
							break;
						case 'USER_NOT_COMPLEAT_REGISTER':
							Toast.fail("用户还未完成注册", 2, null, false);
							break;
						case 'USER_NOT_SET_PASSWORD':
							Toast.fail("用户还未设置密码，请在注册中设置", 2, null, false);
							break;
						case 'PWD_CHECK_FAILED':
							Toast.fail("密码错误，请重试", 2, null, false);
							break;
						default:
							Toast.fail("系统错误", 2, null, false);
					}
				}
			}
		});
	};

	onBackAndroid = () => {
		if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
			BackHandler.exitApp();
			return true;
		}

		this.lastBackPressed = Date.now();
		Toast.show("再按一次退出应用", 2, null, false);
		return true;
	};

	resetLogin() {
		this.toLoginPage();
	};

	render() {
		return (
			<View style={styles.root}>
				<WaitingPage />
			</View>
		);
	}
}

import RegisterPhone from './compontent/register/RegisterPhone';
import RegisterPassWord from './compontent/register/RegisterPassWord';

export default StackNavigator({
	IceApp: {
		screen: IceApp,
		navigationOptions: {
			header: null
		}
	},
	LoginPage: {
		screen: LoginPage,
		navigationOptions: {
			header: null
		}
	},
	RegisterPhone: {
		screen: RegisterPhone,
		navigationOptions: {
			headerTitle: '手机验证'
		}
	},
	RegisterPassWord: {
		screen: RegisterPassWord,
		navigationOptions: {
			headerTitle: '设置密码'
		}
	},
	CompleteShopPage: {
		screen: CompleteShopPage,
		navigationOptions: {
			header: null
		}
	},
	AuthingPage: {
		screen: AuthingPage,
		navigationOptions: {
			header: null
		}
	},
	AuthRejectPage: {
		screen: AuthRejectPage,
		navigationOptions: {
			header: null
		}
	},
	FreeaePage: {
		screen: FreeaePage,
		navigationOptions: {
			header: null
		}
	},
	MainPage: {
		screen: MainPage,
		navigationOptions: {
			header: null
		}
	},
	ComDetail: {
		screen: ComDetail,
		navigationOptions: {
			headerTitle: '商品详情'
		}
	}
}, {
	initialRouteName: 'IceApp',
});