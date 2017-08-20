/**
 * Created by houenteng on 17-2-2.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    PropTypes,
    Text,
} from 'react-native';

import {
    List,
    InputItem,
    Button,
    Toast,
} from 'antd-mobile';

import HeaderNoBack from '../compontent/HeaderNoBack';

import RegisterPhone from '../compontent/register/RegisterPhone';
import MainPage from './MainPage';

import DeviceInfoUtil from '../util/DeviceInfoUtil';

import UserAction from '../action/UserAction';

import CompleteShopPage from './CompleteShopPage';
import AuthingPage from './AuthingPage';
import AuthRejectPage from './AuthRejectPage';
import FreeaePage from './FreeaePage';

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    font:{
        marginTop: 5,
        fontSize:16,
        color:"#4A90E2"
    },
});

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */

const LoginPage = React.createClass({
    propTypes: {
        //title: PropTypes.string.isRequired,
    },
    getInitialState(){
        let phone = this.props.phone;
        if (phone) {
            const phoneArr = phone.split("");
            phoneArr[2] += " ";
            phoneArr[6] += " ";
            phone = phoneArr.join("");
        }

        return {
            phone: phone || '',
            pwd: '',
        };
    },

    unlisten: null,

    componentWillMount() {
        /*let i = 0;
        this.unlisten = AMapLocation.addEventListener((data) => {
            console.log('data', data);
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
        });*/
    },

    onSubmit() {
        // Toast.success('加载成功!!!');

        if (!this.state.phone) {
            Toast.show("请输入手机号", Toast.SHORT);
            return;
        }

        if (!this.state.pwd) {
            Toast.show("请输入密码", Toast.SHORT);
            return;
        }

        const phone = this.state.phone.replace(/ /g, "");
        if (!PHONE_REG.test(phone)) {
            Toast.show("请输入有效手机号", Toast.SHORT);
            return;
        }

        UserAction.login({
            params: {
                userName: phone,
                passWord: this.state.pwd,
                position: JSON.stringify(this.props.position),
                device: JSON.stringify(DeviceInfoUtil.getDeviceInfo()),
            },
            success: (res) => {
                console.log(res);

                if (res && res.success) {
                    storage.save({
                        key: 'user',  // 注意:请不要在key中使用_下划线符号!
                        rawData: {
                            userName: phone,
                            passWord: this.state.pwd,
                            token: res.data.token
                        },

                        // 如果不指定过期时间，则会使用defaultExpires参数
                        // 如果设为null，则永不过期
                        // expires: 1000 * 3600*/
                    });

                    let component = {
                        id: 'mainPage',
                        component: MainPage,
                        params: {
                            resetLogin: this.resetLogin
                        }
                    };

                    if (res.data.state === 'PASSED') {
                        component.id = 'completeShopPage';
                        component.component = CompleteShopPage;
                    } else if (res.data.state === 'AUDITING') {
                        component.id = 'authingPage';
                        component.component = AuthingPage;
                    } else if (res.data.state === 'AUDIT_NO') {
                        component.id = 'authRejectPage';
                        component.component = AuthRejectPage;
                        component.params.phone = phone;
                    } else if (res.data.state === 'FREEAE') {
                        component.id = 'freeaePage';
                        component.component = FreeaePage;
                    }

                    this.props.navigator.push(component);
                } else {
                    switch (res.resultCode) {
                        case 'USER_NOT_EXIST':
                            Toast.fail("该账户不存在，请注册", Toast.SHORT);
                            break;
                        case 'PWD_CHECK_FAILED':
                            Toast.fail("您输入的账号或密码错误", Toast.SHORT);
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
        this.props.navigator.pop();
    },

    goRegist() {
        this.props.navigator.push({
            id: 'registerPhone',
            component: RegisterPhone
        });
    },

    goForgetPwd() {
        this.props.navigator.push({
            id: 'registerPhone',
            component: RegisterPhone,
            params: {
                action: 'FORGETPW'
            }
        });
    },

    render() {
        return (
            <List>
                <HeaderNoBack text="白云冷饮"/>
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
                <Button type="primary" onClick={this.onSubmit} >登录</Button>
                <Text style={{marginTop: 5}}>
                    <Text style={styles.font} onPress={this.goRegist}>新用户注册</Text>
                    <Text style={{textAlign:'right'}}>         </Text>
                    <Text style={styles.font} onPress={this.goForgetPwd}>忘记密码？</Text>
                </Text>
            </List>
        );
    }
});

export default LoginPage;