/**
 * Created by houenteng on 17-10-7.
 */
import React from 'react';
import {
	PropTypes,
	View,
	Text,
	Image,
	RefreshControl
} from 'react-native';

import {
	ListView,
	Checkbox,
	Button,
	Toast,
	Modal
} from 'antd-mobile';

import StyleSheet from 'StyleSheet';
import ShoppingCartAction from '../../action/ShoppingCartAction';
import HeaderNoBack from '../HeaderNoBack';
import MoneyView from '../common/MoneyView';
import Loading from '../common/Loading';
import DoubleUtil from '../../util/DoubleUtil';

import OrderAction from '../../action/OrderAction';

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
		flex: 1
	}
});

class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			data: [],
			dataSource: ds,
			headloading: false,
			firstLoading: true,
			checkedList: {},
			allChecked: false,
			allPrice: 0.0,
		};
	};

	componentWillMount() {
		this.fetch();
	};

	componentDidMount() {

	};

	reload() {
		this.fetch();
	};

	fetch() {
		ShoppingCartAction.queryByPhone({
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

	checkAll() {
		for (let item in this.state.data) {
			if (!this.state.checkedList[this.state.data[item].id]) {
				return false;
			}
		}

		return true;
	};

	renderRow(rowData, sectionID, rowID) {
		return <View style={styles.itemStyle}>
			<Checkbox checked={this.state.checkedList[rowData.id] === true} onChange={(e) => {
				if (e.target.checked) {
					this.state.checkedList[rowData.id] = true;
					this.state.allPrice = DoubleUtil.add(this.state.allPrice, rowData.price);
					this.state.allChecked = this.checkAll();
				} else {
					this.state.checkedList[rowData.id] = false;
					this.state.allPrice = DoubleUtil.sub(this.state.allPrice, rowData.price);
					this.state.allChecked = false;
				}

				this.setState({});
			}} style={{ marginLeft: 5 }} />
			<Image
				source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + rowData.imgKey + '?x-oss-process=style/app-view'}}
				style={styles.imageStyle}/>
			<View style={styles.subItemStyle}>
				<Text style={{marginTop: 10, fontSize: 17, color: 'black'}}>{rowData.comName}</Text>
				<Text style={{marginTop: 10, textAlign: 'right', marginRight: 15, fontSize: 15}}>x {rowData.comNum}</Text>
				<Text style={{marginTop: 10, flex: 1, textAlign: 'right', marginRight: 15}}>
					<MoneyView number={rowData.price} size={0.7} />
				</Text>
			</View>
		</View>;
	};

	refreshData() {
		this.setState({
			headloading: true,
		});

		this.fetch();
	};

	onButtonClick() {
		if (!this.state.checkedList) {
			return;
		}

		const ids = [];

		for (let id in this.state.checkedList) {
			if (this.state.checkedList[id]) {
				ids.push(id);
			}
		}

		if (ids.length === 0) {
			return;
		}

		OrderAction.create({
			params: {
				phone: localInfo.phone,
				list: ids
			},
			success: (res) => {
				if (res && res.success) {
					Toast.success("订单提交成功", 2, null, false);
					this.fetch();
					this.setState({
						checkedList: {},
						allChecked: false,
						allPrice: 0.0
					});
				} else {
					Toast.fail(res.errorMsg, 2, null, false);
				}
			}
		});
	};

	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'white'}} >
				<HeaderNoBack />
				{this.state.firstLoading ? <Loading /> :
					this.state.data.length > 0 ?
						[<ListView
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
						/>, <View style={{height: 60, flexDirection: 'row', borderWidth: 1, borderColor: 'gray'}} >
							<View style={{ flex: 1}}>
								<Checkbox style={{ margin: 10}} checked={this.state.allChecked} onChange={(e) => {
									if (e.target.checked) {
										this.state.allChecked = true;
										let price = 0;

										for (let item in this.state.data) {
											this.state.checkedList[this.state.data[item].id] = true;
											price = DoubleUtil.add(price, this.state.data[item].price);
										}

										this.state.allPrice = price;
									} else {
										this.state.allChecked = false;
										for (let item in this.state.data) {
											this.state.checkedList[this.state.data[item].id] = false;
										}

										this.state.allPrice = 0;
									}

									this.setState({});
									// 为了解决“全选时，列表项不会勾选的问题”加的逻辑
									this.fetch();
								}}>全选</Checkbox>
							</View>
							<MoneyView number={this.state.allPrice} />
							<View style={{ flex: 1}}>
								<Button type="primary" onClick={() => {
									Modal.alert('订单确认', '提交后请在我的订单中查看', [
										{ text: '取消', onPress: () => {} },
										{ text: '确定', onPress: () => this.onButtonClick.bind(this)()}
									])
								}}>提交订单</Button>
							</View>
						</View>]
						:
						<View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
							<Text style={{fontSize: 18}}>购物车空了！！！</Text>
						</View>
				}

			</View>
		);
	}
}

export default ShoppingCart;