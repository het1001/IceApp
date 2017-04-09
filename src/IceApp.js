/**
 * Created by houenteng on 17-2-1.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Navigator,
    Image,
    AsyncStorage
} from 'react-native';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

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
            showLoding: false,
            showLoginPage: true,
            isLogined: false,
        }
    },

    componentWillMount() {

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