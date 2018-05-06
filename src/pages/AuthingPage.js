/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';

import {
	BackHandler
} from 'react-native';

import {
	List,
	Result,
	Button
} from 'antd-mobile';

import HeaderNoBack from '../compontent/HeaderNoBack';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginOutButton from '../compontent/common/LoginOutButton';

class AuthingPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.props.navigation.state.params.onBackAndroid);
	};

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.props.navigation.state.params.onBackAndroid);
	};

	onAppExit() {
		BackHandler.exitApp();
	};

	render() {
		return (
			<List>
				<HeaderNoBack text="白云冷饮"/>
				<List.Item>
					<Result
						img={<Icon name="ios-information-circle" size={50} color={'#3ff867'}/>}
						title="您提交的店铺信息正在审核中"
						message="请等待短信通知后再试"
					/>
				</List.Item>
				<List.Item>
					<LoginOutButton resetLogin={this.props.navigation.state.params.resetLogin}/>
				</List.Item>
				<List.Item>
					<Button type="ghost" onClick={this.onAppExit.bind(this)}>退出应用</Button>
				</List.Item>
			</List>
		);
	}
}

export default AuthingPage;