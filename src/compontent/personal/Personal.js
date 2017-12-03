/**
 * Created by houenteng on 17-2-7.
 */
import React from 'react';
import {
	PropTypes,
	Text,
	View,
	Linking
} from 'react-native';

import {
	List,
	WhiteSpace,
	Modal
} from 'antd-mobile';

import HeaderNoBack from '../HeaderNoBack';
import LoginOutButton from '../common/LoginOutButton';

import UserAction from '../../action/UserAction';

class Personal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			salesmens: [],
			deliverymens: []
		};
	};

	componentWillMount() {
		UserAction.getDistrictInfo({
			params: {
				phone: localInfo.phone
			},
			success: (res) => {
				if (res && res.success) {
					this.setState({
						salesmens: res.data.salesmens,
						deliverymens: res.data.deliverymens,
					});
				}
			},
			error: () => {}
		});
	};

	onTel(item) {
		Modal.alert("确定要拨打" + item.phone + "吗？", null, [
			{ text: '取消', onPress: () => {}},
			{ text: '确定', onPress: () => {
				let url = 'tel: ' + item.phone;
				Linking.canOpenURL(url).then(supported => {
					if (!supported) {
						console.log('Can\'t handle url: ' + url);
					} else {
						return Linking.openURL(url);
					}
				}).catch(err => console.error('An error occurred', err));
			}}]);
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
				{
					this.state.salesmens && this.state.salesmens.length > 0 ? this.state.salesmens.map(item => {
						return <List.Item extra="点击拨打" onClick={this.onTel.bind(this, item)}>业务员：{item.name}{item.phone}</List.Item>
						}) : null
				}
				{
					this.state.deliverymens && this.state.deliverymens.length > 0 ? this.state.deliverymens.map(item => {
						return <List.Item extra="点击拨打" onClick={this.onTel.bind(this, item)}>配送员：{item.name}{item.phone}</List.Item>
					}) : null
				}
				<WhiteSpace size="lg" />
				<List.Item>
					<LoginOutButton resetLogin={this.props.navigation.state.params.resetLogin} />
				</List.Item>
			</List>
		);
	}
}

export default Personal;