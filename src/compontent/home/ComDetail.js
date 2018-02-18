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
	Popup
} from 'antd-mobile';

import CommodityAction from '../../action/CommodityAction';

import PopupComponent from './PopupComponent';
import MoneyView from '../common/MoneyView';

const styles = StyleSheet.create({
	scrollViewStyle: {
		// 背景色
		backgroundColor: 'red'
	},

	itemStyle: {
		// 尺寸
		width: 1000,
		height: 200
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
			imageStyle: {},
			stepNumber: "1",
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
					const images = res.data.map(item => {
						Image.getSize('http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + item.picKey,
							(widthValue, heightValue) => {
								let width = widthValue;
								let height = heightValue;
								if (widthValue >= heightValue) {
									width = screenWith;
									height = heightValue * (width / widthValue);
									this.state.imageStyle[item.picKey] = {
										width,
										height,
										marginTop: (screenHeight * 0.6 - height) / 2,
										marginBottom: (screenHeight * 0.6 - height) / 2
									};
								} else {
									height = screenHeight * 0.6;
									width = widthValue * (height / heightValue);
									this.state.imageStyle[item.picKey] = {
										width,
										height,
										marginLeft: (screenWith - width) / 2
									};
								}

								this.setState({});
						});

						return item.picKey;
					});

					this.setState({
						images,
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
		Popup.show(<PopupComponent {...this.props} callback={() => {
				this.props.navigation.goBack();
			}}/>,
			{
				animationType: 'slide-up',
				maskClosable: true,
				onMaskClose: () => {
				}
			});
	};

	render() {
		const data = this.props.navigation.state.params.data;

		return (
			<View style={{flex: 1}}>
				<ScrollView>
					<Carousel style={{}} autoplay={false}>
						{
							this.state.images.map((item, index) => {
								return <Image key={index} style={this.state.imageStyle[item] ?
									this.state.imageStyle[item] :
									{width: screenWith, height: screenHeight * 0.7}}
															source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + item}}/>
							})
						}
					</Carousel>
					<View>
						<Text style={{marginTop: 5, marginBottom: 10, marginLeft: 10}}><MoneyView number={data.pricePi} />元/件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							每支价格<MoneyView number={data.priceBr} size={0.7} color="gray" /></Text>
						<Text style={{marginBottom: 10, marginLeft: 5, fontSize: 13, color: 'gray'}}>昨日销量{data.daySales}件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;周内销量{data.weekSales}件</Text>
						{data.promo ? <Text style={{
							marginBottom: 10,
							marginLeft: 5,
							fontSize: 15,
							color: 'red'
						}}>{data.promoDes}</Text> : null}
						<Text style={{
							marginBottom: 10,
							marginLeft: 5,
							fontSize: 15,
							color: 'green'
						}}>{'规格：' + data.standardPice + '支/件'}</Text>
						{data.weight ? <Text style={{
							marginBottom: 10,
							marginLeft: 5,
							fontSize: 15,
							color: 'black'
						}}>{'质量：' + data.weight + 'g/支'}</Text> : null}
						<Text style={{
							marginBottom: 10,
							marginLeft: 5,
							fontSize: 15,
							color: 'green'
						}}>{'建议零售价：' + data.retailPriceBr + '元/支'}</Text>
						<Text style={{marginLeft: 5, marginBottom: 10, fontSize: 15,}}>终端利润：<MoneyView number={data.profitPi} size={0.7} />元/件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<MoneyView number={data.priceBr} size={0.7} />元/支</Text>
						<Text style={{
							marginBottom: 10,
							marginLeft: 5,
							fontSize: 15,
							color: 'gray'
						}}>{'库存：' + data.total + '件'}</Text>
						<Text style={{marginBottom: 10, marginLeft: 5, fontSize: 25, color: 'gray'}}>{data.name}</Text>
						{data.brand ? <Text style={{
							marginBottom: 10,
							marginLeft: 5,
							fontSize: 15,
							color: 'black'
						}}>{'厂家/品牌：' + data.brand}</Text> : null}
						{data.personType ? <Text style={{
							marginBottom: 10,
							marginLeft: 5,
							fontSize: 15,
							color: 'black'
						}}>{'针对人群：' + data.personType}</Text> : null}
						{data.barCode ?
							<Image style={{marginBottom: 10, marginLeft: (screenWith - 190) / 2, width: 190, height: 140}}
										 source={{uri: 'http://ice2016.oss-cn-hangzhou.aliyuncs.com/' + data.barImgKey}}/> : null}
						{data.desc ? <Text style={{
							marginBottom: 10,
							marginLeft: 5,
							fontSize: 20,
							color: 'black'
						}}>{'口味介绍：' + data.desc}</Text> : null}
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