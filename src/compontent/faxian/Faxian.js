/**
 * Created by houenteng on 17-2-7.
 */
import React from 'react';
import {
	PropTypes,
	View,
	Text
} from 'react-native';

import {
	List
} from 'antd-mobile';

import HeaderNoBack from '../HeaderNoBack';

class Faxian extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	};

	render() {
		return (
			<View style={{flex: 1}}>
				<List>
					<HeaderNoBack text="白云冷饮"/>
					<View style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: 18}}>功能开发中。。。敬请期待！！！</Text>
					</View>
				</List>
			</View>
		);
	}
}

export default Faxian;