/**
 * Created by houenteng on 17-2-1.
 */
import React from 'react';
import {
	StyleSheet,
	View,
	Navigator
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

import AMapLocation from 'react-native-amap-location';

import DeviceInfoUtil from './util/DeviceInfoUtil';
import UserAction from './action/UserAction';

const styles = StyleSheet.create({
	root: {
		flex: 1,
	}
});

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
const IceApp = React.createClass({
	getInitialState() {
		return {
			phone: '',
			userState: '',
			position: {
				error: 'NULL'
			}
		}
	},

	unlisten: null,

	componentWillMount() {
		let i = 0;
		this.unlisten = AMapLocation.addEventListener((data) => {
			this.setState({
				position: data
			});

			i++;
			if (data && data.longitude) {
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

		setTimeout(this.initLogin, 2000);
	},

	initLogin() {
		storage.load({
			key: 'user',
		}).then(ret => {
			this.setState({
				phone: ret.userName,
			});

			this.onLogin(ret.userName, ret.passWord, true);
		}).catch(err => {
			setTimeout(() => {
				this.setState({
					userState: 'NOT_LOGIN',
				});
			}, 2000);
		});
	},

	onLogin(userName, passWord) {
		UserAction.login({
			params: {
				userName,
				passWord,
				position: JSON.stringify(this.state.position),
				device: JSON.stringify(DeviceInfoUtil.getDeviceInfo()),
			},
			success: (res) => {
				if (res && res.success) {
					storage.save({
						key: 'user',
						rawData: {
							userName,
							passWord,
							token: res.data.token
						},
					});

					this.setState({
						userState: res.data.state,
					});
				} else {
					this.setState({
						userState: 'NOT_LOGIN',
					});

					switch (res.resultCode) {
						case 'PWD_CHECK_FAILED':
							Toast.fail("密码重置，请重新登录", Toast.SHORT);
							break;
						default:
							Toast.fail("系统错误", Toast.SHORT);
					}
				}
			},
			error: (error) => {
				console.warn(error);
			}
		});
	},

	resetLogin() {
		this.setState({
			userState: 'NOT_LOGIN'
		});
	},

	render() {
		return (
			<View style={styles.root}>
				{
					(() => {
						if (!this.state.userState) {
							return <WaitingPage/>;
						} else if (this.state.userState === 'NOT_LOGIN') {
							return <Navigator
								initialRoute={{
									id: 'main',
									component: LoginPage,
									params: {
										position: this.state.position,
										onLogin: this.onLogin,
										resetLogin: this.resetLogin
									}
								}}
								renderScene={(route, navigator) => {
									const Com = route.component;
									return <Com {...route.params} navigator={navigator}/>;
								}}
							/>;
						} else if (this.state.userState === 'PASSED') {
							return <CompleteShopPage resetLogin={this.resetLogin} phone={this.state.phone}/>;
						} else if (this.state.userState === 'AUDITING') {
							return <AuthingPage resetLogin={this.resetLogin}/>;
						} else if (this.state.userState === 'AUDIT_NO') {
							return <Navigator
								initialRoute={{
									id: "authRejectPage",
									component: AuthRejectPage,
									params: {
										phone: this.state.phone,
										resetLogin: this.resetLogin
									}
								}}
								renderScene={(route, navigator) => {
									const Com = route.component;
									return <Com {...route.params} navigator={navigator}/>;
								}}
							/>;

						} else if (this.state.userState === 'FREEAE') {
							return <FreeaePage resetLogin={this.resetLogin}/>;
						} else {
							return <Navigator
								initialRoute={{
									id: 'MainPage',
									component: MainPage,
									params: {
										resetLogin: this.resetLogin
									}
								}}
								renderScene={(route, navigator) => {
									const Com = route.component;
									return <Com {...route.params} navigator={navigator}/>;
								}}
							/>;
						}
					})()
				}
			</View>
		);
	}
});

export default IceApp;