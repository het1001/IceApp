/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';
import {
	Image,
} from 'react-native';

import LobAction from '../action/LobAction';

class WaitingPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imgKey: 'd031688e-bcb1-4242-b107-9951802a007e.jpg'
		};
	};

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
	};

	render() {
		return (
			<Image source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + this.state.imgKey}}
						 style={{width: screenWith, height: screenHeight}}/>
		);
	}
}

export default WaitingPage;