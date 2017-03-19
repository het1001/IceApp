/**
 * Created by houenteng on 17-2-1.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Navigator,
    Button,
    Platform,
    Image,
    AsyncStorage
} from 'react-native';

import UserAction from './action/UserAction';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

import Router from 'react-native-simple-router';

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
            showLoding: true,
            showLoginPage: false,
            isLogined: false,
        }
    },

    componentWillMount() {


        storage.load({
            key: 'user',

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: false,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            UserAction.login({
                params: ret,
                success: (data) => {
                    storage.save({
                        key: 'token',
                        rawData: data.token,
                    });

                    this.setState({
                        showLoding: false,
                        isLogined: true,
                    });
                },
                error: (error) => {
                    console.error(error);
                    this.onLoginError(error);
                }
            });
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            this.setState({
                showLoding: false,
                showLoginPage: true,
            });
        });


    },

    onLoginError(errorCode) {

    },

    loginHandleDone() {
        this.setState({
            showLoding: false,
            isLogined: true,
        });
    },

    render() {
        return (
            <View style={styles.root}>
                {
                    (() => {
                        if (this.state.showLoding) {
                            return <Image source={{uri: 'http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg'}}
                                          style={{width:screenWith, height:screenHeight}} />;
                        } else if (this.state.showLoginPage) {
                            return <Navigator
                                    initialRoute={{
                                        id:"main",
                                        component: LoginPage
                                    }}
                                    renderScene={(route, navigator) => {
                                        const Com = route.component;
                                        return <Com navigator={navigator} />;
                                    }}
                                />;
                        } else {
                            return <MainPage />;
                        }
                    })()
                }
            </View>
        );
    }
});

export default IceApp;