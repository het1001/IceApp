/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';

import {
	List,
	Result
} from 'antd-mobile';

import HeaderNoBack from '../compontent/HeaderNoBack';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginOutButton from '../compontent/common/LoginOutButton';

class FreeaePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	render() {
		return (
			<List>
				<HeaderNoBack />
				<List.Item>
					<Result
						img={<Icon name="ios-close-circle" size={50} color={'#f80a11'}/>}
						title="您的账户被管理员冻结"
						message="有异议请联系管理员，电话188888888"
					/>
				</List.Item>
				<List.Item>
					<LoginOutButton resetLogin={this.props.navigation.state.params.resetLogin} />
				</List.Item>
			</List>
		);
	}
}

export default FreeaePage;