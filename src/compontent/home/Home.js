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
	ListView
} from 'antd-mobile';

import StyleSheet from 'StyleSheet';
import CommodityAction from '../../action/CommodityAction';
import PromotionAction from '../../action/PromotionAction';

import HeaderNoBack from '../HeaderNoBack';

import ComDetail from './ComDetail';
import Button from "antd-mobile/es/button/index";

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
		marginLeft: 14,
		margin: 10,
		marginBottom: 15
	},

	subItemStyle: {
		// 对齐方式
		marginLeft: 6,
		justifyContent: 'space-around'
	}
});

class Home extends React.Component {
	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds,
			headloading: false
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
						return <Text style={{color: 'red'}} key={item.id}>* {item.desc} </Text>
					}), [{ text: '知道了', onPress: () => {} }])
				}
			}
		});
	};

	reload() {
		this.fetch();
	};

	fetch() {
		CommodityAction.queryAllOnline({
			params: {},
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
					<Text style={{marginTop: 5, fontSize: 18, color: 'black'}}>{rowData.name} {rowData.promo ? <Text style={{fontSize: 13, color: 'red'}}>【促销】</Text> : ""}</Text>
					<Text style={{marginTop: 15, marginBottom: 5, fontSize: 13, color: 'gray'}}>规格：{rowData.standardPice} 支/件</Text>
					<Text style={{marginBottom: 3, fontSize: 13, color: 'gray'}}>零售价格：<Text style={{fontSize: 14, color: 'green'}}>{rowData.retailPriceBr} 元/支</Text></Text>
					<Text style={{marginBottom: 5, fontSize: 13, color: 'gray'}}>价格：<Text style={{fontSize: 15, color: 'red'}}>￥ {rowData.pricePi}</Text></Text>
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
				<HeaderNoBack />
				<ListView
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
				/>
			</View>
		);
	}
}

export default Home;