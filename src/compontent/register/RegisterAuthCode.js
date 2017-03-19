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

const RegisterAuthCode = React.createClass({
    propTypes: {
        //title: PropTypes.string.isRequired,
    },
    getInitialState(){
        return {
            authCode: ''
        };
    },
    componentWillMount() {

    },

    onNext() {
        Toast.success('加载成功!!!');
    },

    render() {
        return (
            <List>
                <HeaderNoBack text="白云冷饮"/>
                <List.Item
                    extra={<Button type="ghost" inline>small</Button>}
                    multipleLine
                >
                    <InputItem
                        onChange={(authCode) => this.setState({authCode})}
                        value={this.state.authCode}
                        maxLength={6}
                        placeholder="请输入验证码"
                    >帐号</InputItem>
                </List.Item>
                <Button onClick={this.onNext} >下一步</Button>
            </List>
        );
    }
});

export default RegisterAuthCode;