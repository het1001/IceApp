/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';
import {
	StyleSheet,
	PropTypes,
	TouchableOpacity,
	View,
	Image
} from 'react-native';

import {
	List,
	InputItem,
	Button,
	ActivityIndicator,
	Result,
	Toast
} from 'antd-mobile';

import HeaderNoBack from '../compontent/HeaderNoBack';

import ImagePickerManager from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';

import LobAction from '../action/LobAction';
import UserAction from '../action/UserAction';

import LoginOutButton from '../compontent/common/LoginOutButton';

const styles = StyleSheet.create({
	cameraBtn: {
		padding: 5,
		marginRight: '50%'
	},
	uploadAvatar: {
		width: 100,
		height: 100,
	},
});

const options = {
	title: '选择图片',
	cancelButtonTitle: '取消',
	takePhotoButtonTitle: '拍照',
	chooseFromLibraryButtonTitle: '图片库',
	cameraType: 'back',
	mediaType: 'photo',
	videoQuality: 'high',
	durationLimit: 10,
	maxWidth: 600,
	maxHeight: 600,
	aspectX: 2,
	aspectY: 1,
	quality: 0.8,
	angle: 0,
	allowsEditing: false,
	noData: false,
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};

const CompleteShopPage = React.createClass({
	propTypes: {
		//title: PropTypes.string.isRequired,
	},
	getInitialState() {
		return {
			shopName: '',
			shopAddress: '',
			avatarSource: null,
			animating: false,
			submitFlag: false,
		};
	},

	onSubmit() {
		if (!this.state.shopName) {
			Toast.show("请输入店铺名称", Toast.SHORT);
			return;
		} else if (!this.state.shopAddress) {
			Toast.show("请输入店铺地址", Toast.SHORT);
			return;
		} else if (!this.state.avatarSource) {
			Toast.show("请上传店铺照片", Toast.SHORT);
			return;
		}

		this.setState({
			animating: true
		});
		LobAction.uploadImage({
			file: this.state.avatarSource,
			success: res => {
				if (res && res.success) {
					UserAction.completeShopInfo({
						params: Object.assign({
							phone: this.props.phone,
							shopImgKey: res.data
						}, this.state),
						success: () => {
							this.setState({
								animating: false,
								submitFlag: true
							});
						},
						error: () => {

						}
					});
				} else {
					Toast.show("照片上传失败", Toast.SHORT);
				}
			},
			error: errors => {

			}
		});


	},

	showImagePicker() {
		ImagePickerManager.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else {
				let source = {uri: response.uri, isStatic: true};
				this.setState({
					avatarSource: source,
				});
			}
		});
	},

	render() {
		return (<View>
			{
				this.state.submitFlag ?
					<List>
						<HeaderNoBack text="白云冷饮"/>
						<List.Item>
							<Result
								img={<Icon name="ios-information-circle" size={50} color={'#3ff867'}/>}
								title="您提交的店铺信息正在审核中"
								message="请等待短信通知后再试"
							/>
						</List.Item>
						<List.Item>
							<LoginOutButton {...this.props} />
						</List.Item>
					</List>
					:
					<List>
						<HeaderNoBack text="白云冷饮"/>
						<InputItem
							onChange={(shopName) => this.setState({shopName})}
							value={this.state.shopName}
							maxLength={128}
							placeholder="请输入店铺名称"
						>店铺名称</InputItem>
						<InputItem
							onChange={(shopAddress) => this.setState({shopAddress})}
							value={this.state.shopAddress}
							maxLength={256}
							placeholder="请输入店铺地址"
						>店铺地址</InputItem>
						<List.Item
							extra={<TouchableOpacity
								onPress={this.showImagePicker}
								style={styles.cameraBtn}>
								<View>
									<Icon name="md-camera" color="#aaa" size={34}/>
								</View>
							</TouchableOpacity>}
						>店铺照片</List.Item>
						{
							this.state.avatarSource ?
								<List.Item><Image source={this.state.avatarSource} style={styles.uploadAvatar}/></List.Item> : null
						}
						<List.Item>
							<Button onClick={this.onSubmit}>提交</Button>
						</List.Item>
						<List.Item>
							<LoginOutButton {...this.props} />
						</List.Item>
						<ActivityIndicator
							toast
							text="正在上传"
							animating={this.state.animating}
						/>
					</List>}
		</View>);
	}
});

export default CompleteShopPage;