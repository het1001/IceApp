/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';
import {
    Image,
} from 'react-native';

import LobAction from '../action/LobAction';

const WaitingPage = React.createClass({
    propTypes: {
        //title: PropTypes.string.isRequired,
    },
    getInitialState(){
        return {
            imgKey: '3962ff6e-3358-4382-912f-714409c69150.jpg'
        };
    },

    componentDidMount() {
        LobAction.getMainKey({
            params: '',
            success: (res) => {
                if (res && res.success) {
                    this.setState({
                        imgKey: res.data
                    });
                }
            },
            error: () => {

            }
        })
    },

    render() {
        return (
            <Image source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + this.state.imgKey}}
                   style={{width:screenWith, height:screenHeight}} />
        );
    }
});

export default WaitingPage;