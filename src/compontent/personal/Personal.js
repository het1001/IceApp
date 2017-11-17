/**
 * Created by houenteng on 17-2-7.
 */
import React from 'react';
import {
	PropTypes,
	Text,
	View
} from 'react-native';

import {
	List,
	WhiteSpace
} from 'antd-mobile';

import HeaderNoBack from '../HeaderNoBack';
import LoginOutButton from '../common/LoginOutButton';

class Personal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	render() {
		return (
			<List>
				<HeaderNoBack text="白云冷饮"/>
				<List.Item>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: 22}}>账号 {localInfo.phone}</Text>
					</View>
				</List.Item>
				<List.Item arrow="horizontal" onClick={() => {
					this.props.navigation.navigate('OrderList', {});
				}}>
					我的订单
				</List.Item>
				<WhiteSpace size="lg" />
				<List.Item>
					<LoginOutButton resetLogin={this.props.navigation.state.params.resetLogin} />
				</List.Item>
			</List>
		);
	}
}

export default Personal;