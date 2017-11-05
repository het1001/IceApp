/**
 * Created by houenteng on 17-10-1.
 */
import React from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Image,
	Text,
	BackHandler
} from 'react-native';

import {
	Carousel,
	Button,
	Popup,
	Stepper,
	List,
	Toast
} from 'antd-mobile';

import CommodityAction from '../../action/CommodityAction';
import ShoppingCartAction from '../../action/ShoppingCartAction';

const styles = StyleSheet.create({
	scrollViewStyle: {
		// 背景色
		backgroundColor:'red'
	},

	itemStyle: {
		// 尺寸
		width:1000,
		height:200
	},
	flexContainer: {
		flexDirection: 'row'
	},
	cell: {
		flex: 1,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
		alignSelf: 'stretch',
		backgroundColor: '#4a9df8',
	},
});

class ComDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			stepNumber: 1,
		};
	};

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackAndroidNotExit.bind(this));

		CommodityAction.queryPicByComId({
			params: {
				id: this.props.navigation.state.params.data.id
			},
			success: (res) => {
				if (res && res.success) {
					this.setState({
						images: res.data.map(item => {
							return item.picKey;
						})
					});
				}
			},
		})
	};

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroidNotExit.bind(this));
	};

	onBackAndroidNotExit() {
		this.props.navigation.goBack();
		return true;
	};

	onButtonClick() {
		Popup.show(<View>
			<View style={styles.container}>
			</View>
			<List style={{margin: 10}}>
				<List.Item
					wrap
					extra={
						<Stepper
							showNumber
							max={100}
							min={1}
							value={this.state.stepNumber}
							step={1}
							onChange={(stepNumber) => {this.setState({stepNumber})}}
						/>
					}
				>
					数量
				</List.Item>
				<List.Item>
					<Button onClick={this.insertCart.bind(this)}>确定</Button>
				</List.Item>
			</List>
		</View>, { animationType: 'slide-up', maskClosable: true, onMaskClose: () => { } });
	};

	insertCart() {
		ShoppingCartAction.create({
			params: {
				phone: localInfo.phone,
				comId: this.props.navigation.state.params.data.id,
				comNum: this.state.stepNumber
			},
			success: (res) => {
				if (res && res.success) {
					Popup.hide();
					Toast.success("成功加入购物车!", 2, null, false);
				}
			}
		});
	};

	render() {
		const data = this.props.navigation.state.params.data;

		return (
			<View style={{flex: 1}}>
			<ScrollView>
				<Carousel autoplay={false}>
					{
						this.state.images.map((item, index) => {
							return <View key={'viewkey' + index}>
								<Image key={index} style={{width: screenWith, height: screenHeight - 300}} source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + item}} />
							</View>
						})
					}
				</Carousel>
				<View>
					<Text style={{marginTop: 5, marginLeft: 10, fontSize: 37, color: 'red'}}>{'￥ ' + data.pricePi}</Text>
					<Text style={{marginBottom: 10, marginLeft: 5, fontSize: 15, color: 'green'}}>{'规格：' + data.standardPice + '支/件'}</Text>
					<Text style={{marginBottom: 10, marginLeft: 5, fontSize: 25, color: 'gray'}}>{data.name}</Text>
					{data.brand ? <Text style={{marginBottom: 10, marginLeft: 5, fontSize: 15, color: 'black'}}>{'厂家/品牌：' + data.brand}</Text> : null}
					{data.personType ? <Text style={{marginBottom: 10, marginLeft: 5, fontSize: 15, color: 'black'}}>{'针对人群：' + data.personType}</Text> : null}
					{data.barCode ? <Image style={{marginBottom: 10, marginLeft: (screenWith - 190) / 2, width: 190, height: 140}} source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + data.barImgKey}} /> : null}
					{data.desc ? <Text style={{marginBottom: 10, marginLeft: 5, fontSize: 20, color: 'black'}}>{'口味介绍：' + data.desc}</Text> : null}
				</View>
			</ScrollView>
				<View>
					<Button type="primary" onClick={this.onButtonClick.bind(this)}>加入购物车</Button>
				</View>
			</View>
		);
	}
}

export default ComDetail;