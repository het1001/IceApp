/**
 * Created by houenteng on 17-8-21.
 */
import React from 'react';
import {
	PropTypes,
	View,
	Text,
	Image,
	TouchableNativeFeedback,
	RefreshControl
} from 'react-native';

import {
	Modal,
	ListView,
	Toast
} from 'antd-mobile';

import StyleSheet from 'StyleSheet';
import CommodityAction from '../../action/CommodityAction';
import PromotionAction from '../../action/PromotionAction';

import HeaderNoBack from '../HeaderNoBack';

import ComDetail from './ComDetail';

import MoneyView from '../common/MoneyView';

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
		width: 120,
		height: 120,
		// 边距
		marginLeft: 14,
		margin: 10,
		marginBottom: 15
	},

	subItemStyle: {
		// 对齐方式
		marginLeft: 6,
		justifyContent: 'space-around'
	},

	noSearchStyle: {
		textAlign: 'center',
		marginTop: 30,
	}
});

class Home extends React.Component {
	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds,
			headloading: false,
			search: {}
		};
	};

	componentWillMount() {
		this.fetch();
	};

	componentDidMount() {
		PromotionAction.queryCurrent({
			success: (res) => {
				if (res && res.success && res.data && res.data.length > 0) {
					Modal.alert("商品促销", res.data.map(item => {
						return <Text style={{fontSize: 20, color: 'red'}} key={item.id}>* {item.desc} </Text>
					}), [{ text: '知道了', onPress: () => {} }])
				}
			}
		});
	};

	reload() {
		this.fetch();
	};

	onSearch = (search) => {
		if (search) {
			this.setState({
				search,
				headloading: true,
			}, this.fetch);
		} else {
			this.setState({
				search: {},
				headloading: true,
			}, this.fetch);
		}
	}

	fetch() {
		CommodityAction.queryAllOnline({
			params: this.state.search,
			success: (res) => {
				if (res && res.success) {
					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(res.data),
						headloading: false,
					});
				}
			},
			error: () => {}
		});
	};

	renderRow(rowData, sectionID, rowID) {
		return <TouchableNativeFeedback
			onPress={()=> this.onComItemClick(rowData) }
			background={TouchableNativeFeedback.SelectableBackground()}
		>
			<View style={styles.itemStyle}>
				<Image
					source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + rowData.imgKey + '?x-oss-process=style/app-view'}}
					style={styles.imageStyle}/>
				<View style={styles.subItemStyle}>
					<Text style={{marginTop: 5, marginBottom: 5, fontSize: 18, color: 'black'}}>{rowData.name} {rowData.promo ? <Text style={{fontSize: 17, color: 'red'}}>【促销】</Text> : ""}</Text>
					<Text style={{marginBottom: 5, fontSize: 13, color: 'gray'}}>规格：{rowData.standardPice} 支/件</Text>
					<Text style={{marginBottom: 5, fontSize: 13, color: 'gray'}}>价格：<MoneyView number={rowData.pricePi} size={0.8} />/件</Text>
					<Text style={{marginBottom: 5, fontSize: 13, color: 'gray'}}>终端利润：<MoneyView number={rowData.profitPi} size={0.6} />/件</Text>
					<Text style={{marginBottom: 5, fontSize: 13, color: 'gray'}}>建议零售价：<MoneyView number={rowData.retailPriceBr} color="green" size={0.7} />/支</Text>
				</View>
			</View>
		</TouchableNativeFeedback>;
	};

	onComItemClick(rowData) {
		// this.props.n
		this.props.navigation.navigate('ComDetail', {
			data: rowData
		});
	};

	refreshData() {
		this.setState({
			headloading: true,
		});

		this.fetch();
	};

	render() {
		return (
			<View style={{flex: 1}} >
				<HeaderNoBack search={true} callback={this.onSearch} />
				{
					this.state.dataSource && this.state.dataSource.getRowCount() > 0 ? <ListView
						style={{paddingBottom: 17}}
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
					/> : <Text style={styles.noSearchStyle}>未查找到商品</Text>
				}

			</View>
		);
	}
}

export default Home;