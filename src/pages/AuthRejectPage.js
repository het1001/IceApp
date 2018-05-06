/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';

import {
	StyleSheet,
	Text,
	Image,
	ScrollView
} from 'react-native';

import {
	List,
	Button,
	Result
} from 'antd-mobile';

import HeaderNoBack from '../compontent/HeaderNoBack';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginOutButton from '../compontent/common/LoginOutButton';
import CompleteShopPage from './CompleteShopPage';

import UserShopInfoAction from '../action/UserShopInfoAction';

const styles = StyleSheet.create({
	uploadAvatar: {
		width: 200,
		height: 200,
	},
});

class AuthRejectPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isToReSubmit: false,
			rejectReason: '未知',
			shopName: '',
			shopAddress: '',
			imageKey: '',
		};
	};

	componentWillMount() {
		UserShopInfoAction.getLastShopInfo({
			params: {
				phone: localInfo.phone
			},
			success: (res) => {
				if (res && res.success) {
					this.setState({
						shopName: res.data.shopName,
						shopAddress: res.data.shopAddress,
						imageKey: res.data.shopImgKey,
						rejectReason: res.data.auditMemo
					});
				}
			}
		})
	};

	onReSubmit() {
		this.props.navigation.navigate('CompleteShopPage', {
			resetLogin: this.props.navigation.state.params.resetLogin
		});
	};

	render() {
		return (
			<ScrollView>
				<List>
					<HeaderNoBack text="白云冷饮"/>
					<List.Item>
						<Result
							img={<Icon name="ios-sad" size={50} color={'#f84c0f'}/>}
							title="您提交的店铺信息不符合要求"
							message={<Text style={{color: 'red', fontSize: 16}}>原因： {this.state.rejectReason}</Text>}
						/>
					</List.Item>
					<List.Item>
						<List>
							<List.Item extra={this.state.shopName}>
								<Text>店铺名称</Text>
							</List.Item>
							<List.Item extra={this.state.shopAddress}>
								<Text>地址</Text>
							</List.Item>
							{
								this.state.imageKey ? [<List.Item key="item-hou-1">
									<Text>照片</Text>
								</List.Item>, <List.Item key="item-hou-2">
									<Image
										source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + this.state.imageKey, isStatic: true}}
										style={styles.uploadAvatar}/>
								</List.Item>] : null
							}
						</List>
					</List.Item>
					<List.Item>
						<Button type="primary" onClick={this.onReSubmit.bind(this)}>重新提交</Button>
					</List.Item>
					<List.Item>
						<LoginOutButton resetLogin={this.props.navigation.state.params.resetLogin} />
					</List.Item>
				</List>
			</ScrollView>
		);
	}
}

export default AuthRejectPage;