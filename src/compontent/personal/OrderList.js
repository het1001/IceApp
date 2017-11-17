/**
 * Created by houenteng on 17-11-09.
 */
import React from 'react';
import {
	StyleSheet,
	View,
	RefreshControl,
	Text,
	BackHandler
} from 'react-native';

import {
	ListView,
	List,
	Button,
	Modal,
	Toast
} from 'antd-mobile';

import OrderAction from '../../action/OrderAction';

import MoneyView from '../common/MoneyView';
import Loading from '../common/Loading';

import CommonUtil from '../../util/CommonUtil';

const stateMap = {
	'CREATED': {
		text: '卖家未确认',
		color: 'green'
	},
	'ACCEPT': {
		text: '卖家确认，发货中',
		color: 'blue'
	},
	'CANCELED': {
		text: '已取消',
		color: 'red'
	},
	'COMPLETED': {
		text: '已完成',
		color: 'green'
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1
	},

	itemStyle: {
		// 主轴方向
		flexDirection: 'row',
		// 下边框
		borderBottomWidth: 1,
		borderBottomColor: 'gray'
	},

	imageStyle: {
		// 尺寸
		width: 100,
		height: 100,
		// 边距
		marginLeft: 10,
		margin: 10
	},

	subItemStyle: {
		// 对齐方式
		// justifyContent: 'space-around'
		flex: 1,
		backgroundColor: 'white'
	}
});

class OrderList extends React.Component {
	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			data: [],
			dataSource: ds,
			headloading: false,
			firstLoading: true,
		};
	};

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackAndroidNotExit.bind(this));
		this.fetch();
	};

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroidNotExit.bind(this));
	};

	onBackAndroidNotExit() {
		this.props.navigation.goBack();
		return true;
	};

	fetch() {
		OrderAction.queryByPhone({
			params: {
				phone: localInfo.phone
			},
			success: (res) => {
				if (res && res.success) {
					this.setState({
						data: res.data,
						dataSource: this.state.dataSource.cloneWithRows(res.data),
						headloading: false,
						firstLoading: false,
					});
				}
			},
			error: () => {}
		});
	};

	onCancel(id) {
		OrderAction.cancel({
			params: {
				id,
			},
			success: (res) => {
				if (res && res.success) {
					this.fetch();
				}
			},
		});
	};

	renderRow(rowData, sectionID, rowID) {
		return <View style={styles.itemStyle}>
			<View style={styles.subItemStyle}>
				<View style={{flexDirection: 'row'}}>
					<Text style={{flex:1, margin: 8, fontSize: 17, color: 'gray'}}>{CommonUtil.pareDate(rowData.createTime)}</Text>
					<Text style={{flex:1, margin: 8, textAlign: 'right', marginRight: 15, fontSize: 15, color: stateMap[rowData.state].color}}>{stateMap[rowData.state].text}</Text>
				</View>
				<List>
					{rowData.orderLists.map(item => {
						return <List.Item multipleLine={true} extra={<View>
							<Text>x {item.comNum}</Text>
							<MoneyView number={item.comPrice} size={0.6} color="black" />
						</View>}>{item.comName}<List.Item.Brief style={{fontSize: 11}}>规格：{item.comStandard}支/件</List.Item.Brief></List.Item>;
					})}
				</List>
				<View style={{flexDirection: 'row'}}>
					<View style={{flex:1}}>
					</View>
					<Text style={{margin: 8, flex: 1, textAlign: 'right', marginRight: 15}}>
						总价 <MoneyView number={rowData.priceTotal} size={0.9} color="black" />
					</Text>
				</View>
				{ rowData.state === 'CREATED' ? <View style={{flexDirection: 'row', margin: 8}}>
					<View style={{flex:1}}>
					</View>
					<View style={{flex:1}}>
					</View>
					<View style={{flex:1, marginTop: 8}}>
						<Button inline type="ghost" size="small" onClick={() => {
							Modal.alert('提示', '确定要取消该订单吗？', [
								{ text: '取消', onPress: () => {} },
								{ text: '确定', onPress: () => this.onCancel.bind(this, rowData.id)()}
							])
						}}>取消订单</Button>
					</View>
				</View> : null}
			</View>
		</View>;
	};

	refreshData() {
		this.setState({
			headloading: true,
		});

		this.fetch();
	};

	render() {
		return (
			<View style={{flex: 1}}>
				{this.state.firstLoading ? <Loading /> : this.state.data.length > 0 ?
					<ListView
						style={{paddingBottom: 25}}
						refreshControl={
							<RefreshControl
								onRefresh={() => this.refreshData()}
								refreshing={this.state.headloading}
								colors={['#4a9df8']}
								progressBackgroundColor="#ffffff"
							/>
						}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow.bind(this)}
					/>
					:
					<View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: 18}}>您还没有下过订单！</Text>
					</View>}
			</View>
		);
	}
}

export default OrderList;