/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';

import {
    List,
    Result,
    Card
} from 'antd-mobile';

import HeaderNoBack from '../compontent/HeaderNoBack';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginOutButton from '../compontent/common/LoginOutButton';

const AuthingPage = React.createClass({
    propTypes: {
        //title: PropTypes.string.isRequired,
    },
    getInitialState(){
        return {};
    },

    componentWillMount() {

    },

    onSubmit() {

    },

    render() {
        return (
            <List>
                <HeaderNoBack text="白云冷饮"/>
                <List.Item>
                    <Result
                        img={<Icon name="ios-information-circle" size={50} color={'#3ff867'} />}
                        title="您提交的店铺信息正在审核中"
                        message="请等待短信通知后再试"
                    />
                </List.Item>
                <List.Item>
                    <Card full>
                        <Card.Header
                            title="店铺名称"
                            thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                        />
                        <Card.Body>
                            地址：仙霞西路
                        </Card.Body>
                    </Card>
                </List.Item>
                <List.Item>
                    <LoginOutButton {...this.props} />
                </List.Item>
            </List>
        );
    }
});

export default AuthingPage;