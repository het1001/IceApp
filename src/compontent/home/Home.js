/**
 * Created by houenteng on 17-8-21.
 */
import React from 'react';
import {
	PropTypes,
	View,
	Text,
	Image,
	TouchableNativeFeedback
} from 'react-native';

import {
	RefreshControl,
	Modal,
	ListView
} from 'antd-mobile';

import HeaderNoBack from '../HeaderNoBack';
import StyleSheet from 'StyleSheet';
import CommodityAction from '../../action/CommodityAction';
import PromotionAction from '../../action/PromotionAction';

import ComDetail from './ComDetail';

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
		justifyContent: 'space-around'
	}
});

const Home = React.createClass({
	propTypes: {
		//title: PropTypes.string.isRequired,
	},
	getInitialState() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			dataSource: ds,
			headloading: false
		};
	},
	componentWillMount() {
		this.fetch();
	},

	componentDidMount() {
		PromotionAction.queryCurrent({
			success: (res) => {
				if (res && res.success && res.data && res.data.length > 0) {
					Modal.alert("商品促销", res.data.map(item => {
						return <Text style={{color: 'red'}} key={item.id}>* {item.desc}</Text>
					}), [{ text: '知道了', onPress: () => {} }])
				}
			}
		});
	},

	componentWillUnmount() {
	},

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
	},

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
					<Text style={{marginTop: 5, fontSize: 17}}>{rowData.name}</Text>
					<Text style={{marginBottom: 5, fontSize: 13, color: 'green'}}>简介</Text>
				</View>
			</View>
		</TouchableNativeFeedback>;
	},

	onComItemClick(rowData) {
		// this.props.n
		this.props.navigator.push({
			id: 'ComDetail',
			component: ComDetail,
			params: {
				id: rowData.id
			}
		});
	},

	refreshData() {
		this.setState({
			headloading: true,
		});

		this.fetch();
	},

	render() {
		return (
			<View style={{flex: 1}}>
				<HeaderNoBack text="白云冷饮"/>
				<View style={{flex: 1}} >
					<ListView
						refreshControl={
							<RefreshControl
								onRefresh={() => this.refreshData()}
								refreshing={this.state.headloading}
								tintColor="#ff0000"
								title="加载中..."
								titleColor="#00ff00"
								colors={['#ff0000', '#00ff00', '#0000ff']}
								progressBackgroundColor="#ffff00"
							/>
						}
						dataSource={this.state.dataSource}
						renderRow={this.renderRow}
					/>
				</View>
			</View>
		);
	}
});

export default Home;