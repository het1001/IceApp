import React from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	Modal,
} from 'react-native';

const styles = StyleSheet.create({
	loadingBox: { // Loading居中
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'rgba(0, 0, 0, 0)', // 半透明
	}
});

export default class Loading extends React.Component {
	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {};
	}

	render() {
		return(
			<Modal
				transparent = {true}
				onRequestClose={()=> this.onRequestClose()}
			>
				<View style={styles.loadingBox}>
					<ActivityIndicator animating={true} color='#4a9df8' />
				</View>
			</Modal>
		);
	}
}