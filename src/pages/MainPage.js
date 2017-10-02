/**
 * Created by houenteng on 17-2-2.
 */

import React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	tab: {
		height: 63,
		alignItems: 'center'
	}
});

import Icon from 'react-native-vector-icons/Ionicons';

import TabNavigator from 'react-native-tab-navigator';

import Personal from '../compontent/personal/Personal';
import Home from '../compontent/home/Home';

const tabbarArray = [{
	key: 'home',
	normalIcon: 'ios-home-outline',
	selectIcon: 'ios-home',
	title: '首页',
}, {
	key: 'faxian',
	normalIcon: 'ios-compass-outline',
	selectIcon: 'ios-compass',
	title: '发现',
}, {
	key: 'cart',
	normalIcon: 'ios-cart-outline',
	selectIcon: 'ios-cart',
	title: '购物车',
}, {
	key: 'personal',
	normalIcon: 'ios-contact-outline',
	selectIcon: 'ios-contact',
	title: '我的',
}]
const MainPage = React.createClass({
	getInitialState() {
		return {
			selectedTab: 'home'
		};
	},

	_renderTabItem(item, childView) {
		return (
			<TabNavigator.Item
				key={item.title}
				title={item.title}
				selected={this.state.selectedTab === item.key}
				renderIcon={() => <Icon name={item.normalIcon} size={30} color={'#4A9DF8'}/>}
				renderSelectedIcon={() => <Icon name={item.selectIcon} size={30} color={'#4A9DF8'}/>}
				onPress={() => this.setState({selectedTab: item.key})}>
				{childView}
			</TabNavigator.Item>
		);
	},

	_createChildView(tag) {
		if (tag === 'personal') {
			return (<Personal {...this.props} />);
		} else if (tag === 'home') {
			return (<Home {...this.props} />);
		} else {
			return (<View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
				<Text style={{fontSize: 22}}>{tag}</Text>
			</View>);
		}
	},

	render() {
		return (
			<TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
				{
					tabbarArray.map((item) => {
						return this._renderTabItem(item, this._createChildView(item.key));
					})
				}
			</TabNavigator>
		);
	}
});

export default MainPage;