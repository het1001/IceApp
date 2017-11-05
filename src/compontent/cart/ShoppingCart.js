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
	ListView
} from 'antd-mobile';

import StyleSheet from 'StyleSheet';
import ShoppingCartAction from '../../action/ShoppingCartAction';
import HeaderNoBack from '../HeaderNoBack';

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

class ShoppingCart extends React.Component {
	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			data: [],
			dataSource: ds,
			headloading: false
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
					});
				}
			},
			error: () => {}
		});
	};

	renderRow(rowData, sectionID, rowID) {
		return <View style={styles.itemStyle}>
			<Image
				source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + rowData.imgKey + '?x-oss-process=style/app-view'}}
				style={styles.imageStyle}/>
			<View style={styles.subItemStyle}>
				<Text style={{marginTop: 5, fontSize: 17}}>{rowData.comName}</Text>
				<Text style={{marginBottom: 5, fontSize: 13, color: 'green'}}>{rowData.comNum}</Text>
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
			<View style={{flex: 1}} >
				<HeaderNoBack />
				{
					this.state.data.length > 0 ?
						<ListView
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
							<Text style={{fontSize: 22}}>您还未添加商品到购物车！！！</Text>
						</View>
				}

			</View>
		);
	}
}

export default ShoppingCart;