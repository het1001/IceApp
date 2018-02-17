/**
 * Created by houenteng on 17-2-6.
 */
import React from 'react';
import {
	Text,
	View,
	TouchableNativeFeedback
} from 'react-native';
import StyleSheet from 'StyleSheet';

import { Modal, Tag, Button, Toast } from 'antd-mobile';

import CommodityAction from '../action/CommodityAction';

import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
		alignSelf: 'stretch',
		backgroundColor: '#4a9df8',
	},
	textview: {
		flexDirection: 'row',
		flex: 1,
		alignSelf: 'center',
	},
	textstyle: {
		fontSize: 18,
		color: '#fff',
		marginLeft: '35%',
		textAlign: 'center',
	},
	buttonstyle: {
		fontSize: 18,
		color: '#fff',
		marginLeft: '25%',
		marginTop: 10
	},
	tagview: {
		// 主轴方向
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 18,
	},
	tagstyle: {
		marginLeft: 12,
		marginTop: 5,
	}
});

class HeaderNoBack extends React.Component {
	state = {
		visible: false,
		conditions: {},
		search: {}
	}

	onShowSearch = () => {
		this.setState({
			visible: true,
		});

		CommodityAction.getConditions({
			params: {},
			success: (res) => {
				if (res && res.success) {
					this.setState({
						conditions: res.data,
					});
				}
			},
			error: (res) => {

			}
		});

	}

	onClose = () => {
		this.setState({
			visible: false,
		});
	}

	onSearch = () => {
		this.onClose();
		this.props.callback(this.state.search);
	}

	onTagChange = (key, id, selected) => {
		if (!this.state.search[key]) {
			this.state.search[key] = [];
		}

		selected ? this.state.search[key].push(id) :
			(this.state.search[key].indexOf(id) > -1 ? this.state.search[key].splice(this.state.search[key].indexOf(id), 1) : null);

		this.setState({});
	}

	render() {
		const {conditions} = this.state;

		return (
			<View style={styles.container}>
				<View style={styles.textview}>
					<Text style={styles.textstyle}>{this.props.text || "白云冷饮"}</Text>
					{
						this.props.search ?
							<TouchableNativeFeedback onPress={this.onShowSearch}
																			 background={TouchableNativeFeedback.SelectableBackground()}
							>
								<View style={styles.buttonstyle}>
									<Icon name="ios-funnel-outline" size={20} color={'#ffffff'}/>
								</View>
							</TouchableNativeFeedback> : null
					}
				</View>
				<Modal
					title="筛选"
					transparent
					maskClosable={false}
					visible={this.state.visible}
					onClose={this.onClose}
					footer={[{ text: '确定', onPress: () => { this.onSearch(); } },{ text: '取消', onPress: () => { this.onClose(); } }]}
				>
					{
						(()=>{
							let  compont = [];

							for(let key in conditions) {
								if (conditions[key].data && conditions[key].data.length > 0) {
									compont.push(<View><Text>{conditions[key].desc}</Text>
										<View style={styles.tagview}>
											{conditions[key].data.map((item) => {
												return <Tag small={true} selected={this.state.search[conditions[key].code] ? this.state.search[conditions[key].code].indexOf(item.id) > -1 : false} onChange={this.onTagChange.bind(this, conditions[key].code, item.id)} style={styles.tagstyle}>{item.name}</Tag>;
											})}
										</View>
									</View>);
								}
							}

							return compont;
						})()
					}

				</Modal>
			</View>
		);
	}
}


export default HeaderNoBack;