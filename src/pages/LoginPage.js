/**
 * Created by houenteng on 17-2-2.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    PropTypes,
    View,
    Text,
    Navigator,
    Platform,
    Image,
    ToastAndroid,
    TouchableHighlight
} from 'react-native';

import {
    List,
    InputItem,
    Button,
    Toast,
} from 'antd-mobile';

import HeaderNoBack from '../compontent/HeaderNoBack';

import RegisterPhone from '../compontent/register/RegisterPhone';

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
        return {
            phone: '',
            pwd: '',
            data: '',
            avatarSource: {uri: 'file:///storage/emulated/0/Pictures/image-a9d13fa0-2f35-487d-9ce6-1f60897ae573.jpg'},
        };
    },

    unlisten: null,

    componentWillMount() {
        // this.unlisten = AMapLocation.addEventListener((data) => {
        //     console.log('data', data);
        //     if (data && data.longitude) {
        //         AMapLocation.stopLocation();
        //         this.unlisten.remove();
        //     }
        // });
        // AMapLocation.startLocation({
        //     accuracy: 'HighAccuracy',
        //     killProcess: true,
        //     needDetail: true,
        // });
    },

    onSubmitxx() {

        // UserAction.login({
        //     params: {},
        //     success: (data) => {
        //         this.setState({
        //            data: data[0].name
        //         });
        //     },
        //     error: (error) => {
        //
        //     }
        // })

    },

    onSubmit() {
        Toast.success('加载成功!!!');

        {/*UserAction.login({*/}
            {/*params: {*/}
                {/*userName: this.state.phone,*/}
                {/*passWord: this.state.pwd,*/}
            {/*},*/}
            {/*success: (data) => {*/}
                {/*storage.save({*/}
                    {/*key: 'user',  // 注意:请不要在key中使用_下划线符号!*/}
                    {/*rawData: {*/}
                        {/*userName: this.state.phone,*/}
                        {/*passWord: this.state.pwd*/}
                    {/*},*/}

                    {/*// 如果不指定过期时间，则会使用defaultExpires参数*/}
                    {/*// 如果设为null，则永不过期*/}
                    {/*// expires: 1000 * 3600*/}
                {/*});*/}

                {/*storage.save({*/}
                    {/*key: 'token',*/}
                    {/*rawData: data.token,*/}
                {/*});*/}

                {/*this.props.callback();*/}
                {/*ToastAndroid.show('登录成功', ToastAndroid.SHORT);*/}
            {/*},*/}
            {/*error: (error) => {*/}
                {/*console.warn(error);*/}
                {/*switch (error) {*/}
                    {/*case 'USERNAME_NOT_EXIST': {*/}
                        {/*Alert.alert(*/}
                            {/*'失败',*/}
                            {/*'用户名不存在',*/}
                        {/*);*/}
                    {/*}*/}
                    {/*break;*/}
                    {/*case 'PWD_CHECK_FAILED': {*/}
        //                 Alert.alert(
        //                     '失败',
        //                     '密码错误',
        //                 );
        //             }
        //             break;
        //
        //             default: {
        //                 Alert.alert(
        //                     '失败',
        //                     '未知错误',
        //                 );
        //             }
        //         }
        //     }
        // });
    },

    handleBack() {
        if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1) {
            this.props.navigator.pop();
            return true;
        }

        return false;
    },

    goRegist() {
        this.props.navigator.push({
            id: '',
            component: RegisterPhone
        });
    },

    goForgetPwd() {

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
                    <Text style={{textAlign:'right'}} onPress={this.goForgetPwd}>         </Text>
                    <Text style={styles.font} onPress={this.goForgetPwd}>忘记密码？</Text>
                </Text>
            </List>
        );
    }
});

export default LoginPage;