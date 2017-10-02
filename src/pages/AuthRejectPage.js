/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';

import {
	Navigator,
	StyleSheet,
	Text,
	Image
} from 'react-native';

import {
	List,
	Button,
	Result
} from 'antd-mobile';

import HeaderNoBack from '../compontent/HeaderNoBack';
import Icon from 'react-native-vector-icons/Ionicons';

import CompleteShopPage from './CompleteShopPage';

import UserShopInfoAction from '../action/UserShopInfoAction';

const styles = StyleSheet.create({
	uploadAvatar: {
		width: 200,
		height: 200,
	},
});

const AuthRejectPage = React.createClass({
	propTypes: {
		//title: PropTypes.string.isRequired,
	},
	getInitialState() {
		return {
			isToReSubmit: false,
			rejectReason: '未知',
			shopName: '',
			shopAddress: '',
			imageKey: '',
		};
	},

	componentWillMount() {
		UserShopInfoAction.getLastShopInfo({
			params: {
				phone: this.props.phone
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
			},
			error: (error) => {

			}
		})
	},

	onReSubmit() {
		this.props.navigator.push({
			id: 'completeShopPage',
			component: CompleteShopPage,
			params: {
				phone: this.props.phone,
				resetLogin: this.props.resetLogin
			}
		});
	},

	render() {
		return (
			<List>
				<HeaderNoBack text="白云冷饮"/>
				<List.Item>
					<Result
						img={<Icon name="ios-sad" size={50} color={'#f84c0f'}/>}
						title="您提交的店铺信息不符合要求"
						message={"原因：" + this.state.rejectReason}
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
							this.state.imageKey ? [<List.Item>
								<Text>照片</Text>
							</List.Item>, <List.Item>
								<Image
									source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + this.state.imageKey, isStatic: true}}
									style={styles.uploadAvatar}/>
							</List.Item>] : null
						}
					</List>
				</List.Item>
				<Button onClick={this.onReSubmit}>重新提交</Button>
			</List>
		);
	}
});

export default AuthRejectPage;