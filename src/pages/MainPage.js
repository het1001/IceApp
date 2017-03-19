/**
 * Created by houenteng on 17-2-2.
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
} from 'react-native';

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
});


const MainPage = React.createClass({
    getInitialState(){
        return {};
    },

    onSubmit() {

    },

    quiet() {
      storage.remove({
         key: 'user'
      });
    },

    render() {
        return (
            <View style={styles.root}>
                <Text>这是首页</Text>
                <Button onPress={this.quiet} title="退出登录" />
            </View>
        );
    }
});

export default MainPage;