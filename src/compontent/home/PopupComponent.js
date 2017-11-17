/**
 * Created by houenteng on 17-11-5.
 */
import React from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import {
	Button,
	Popup,
	Stepper,
	List,
	Toast
} from 'antd-mobile';

import ShoppingCartAction from '../../action/ShoppingCartAction';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
		alignSelf: 'stretch',
		backgroundColor: '#4a9df8',
	},
});

class PopupComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			stepNumber: 1,
		};
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
					this.props.callback();
				}
			}
		});
	};

	render() {
		return <View>
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
							onChange={(stepNumber) => {
								this.setState({stepNumber})
							}}
						/>
					}
				>
					数量
				</List.Item>
				<List.Item>
					<Button onClick={this.insertCart.bind(this)}>确定</Button>
				</List.Item>
			</List>
		</View>
	}
}

export default PopupComponent;