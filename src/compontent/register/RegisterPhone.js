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


const RegisterPhone = React.createClass({
    propTypes: {
        //title: PropTypes.string.isRequired,
    },
    getInitialState(){
        return {
            phone: ''
        };
    },
    componentWillMount() {

    },

    componentDidMount () {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    },

    componentWillUnmount () {
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

        /*UserAction.getUser({
            params: {
                userName: this.state.phone
            },
            success: (data) => {
                Toast.show(data, Toast.LONG);
                // this.props.navigator.push({
                //     id: 'authCode',
                //     component: RegisterAuthCode
                // });
            },
            error: (error) => {
                Toast.show(error, Toast.LONG);
            }
        });*/
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
                <InputItem
                    onChange={(phone) => this.setState({phone})}
                    value={this.state.phone}
                    type="phone"
                    maxLength={13}
                    placeholder="请输入手机号"
                >帐号</InputItem>
                <Button onClick={this.onNext} >下一步</Button>
            </List>
        );
    }
});

export default RegisterPhone;