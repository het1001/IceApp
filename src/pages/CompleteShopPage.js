/**
 * Created by houenteng on 17-2-7.
 */

import React from 'react';
import {
	StyleSheet,
	PropTypes,
	TouchableOpacity,
	View,
	ScrollView,
	Image
} from 'react-native';

import {
	List,
	InputItem,
	Button,
	ActivityIndicator,
	Result,
	Toast,
	DatePicker,
	Picker
} from 'antd-mobile';

import HeaderNoBack from '../compontent/HeaderNoBack';

import ImagePickerManager from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';

import LobAction from '../action/LobAction';
import UserAction from '../action/UserAction';
import AllotDistrictAction from '../action/AllotDistrictAction';

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

class CompleteShopPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arkTimeValue: '',
			district: [],
			avatarSource: null,
			animating: false,
			submitFlag: false,
			form: {
				userName: '',
				shopName: '',
				shopAddress: '',
				freezerType: '',
				freezerModel: '',
				arkTime: '',
				districtId: '',
			}
		};
	};

	componentWillMount() {
		AllotDistrictAction.queryAll({
			params: {},
			success: (res) => {
				if (res && res.success && res.data && res.data.length > 0) {
					this.setState({
						district: res.data.map((item) => {
							return {
								label: item.name,
								value: String(item.id)
							}
						})
					});
				}
			}
		});
	};

	onSubmit() {
		if (!this.state.form.userName) {
			Toast.show("请输入姓名", 2, null, false);
			return;
		} else if (!this.state.form.shopName) {
			Toast.show("请输入店铺名称", 2, null, false);
			return;
		} else if (!this.state.form.shopAddress) {
			Toast.show("请输入店铺地址", 2, null, false);
			return;
		} else if (!this.state.avatarSource) {
			Toast.show("请上传店铺照片", 2, null, false);
			return;
		} else if (!this.state.form.freezerType) {
			Toast.show("请输入冰柜种类", 2, null, false);
			return;
		} else if (!this.state.form.freezerModel) {
			Toast.show("请输入冰柜型号", 2, null, false);
			return;
		} else if (!this.state.form.arkTime) {
			Toast.show("请选择投柜时间", 2, null, false);
			return;
		} else if (!this.state.form.districtId) {
			Toast.show("请选择所属片区", 2, null, false);
			return;
		}

		this.setState({
			animating: true
		});
		LobAction.uploadImage({
			file: this.state.avatarSource,
			success: res => {
				if (res && res.success) {
					this.state.form.districtId = this.state.form.districtId[0];
					UserAction.completeShopInfo({
						params: Object.assign({
							phone: localInfo.phone,
							shopImgKey: res.data
						}, this.state.form),
						success: (res) => {
							if (res && res.success) {
								this.setState({
									animating: false,
									submitFlag: true
								});
							} else {
								Toast.show("提交失败", 2, null, false);
							}
						}
					});
				} else {
					Toast.show("照片上传失败", 2, null, false);
				}
			}
		});
	};

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
	};

	onInputFormChange(key, value) {
		this.state.form[key] = value;
		this.setState({});
	};

	render() {
		return (<ScrollView>
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
							<LoginOutButton resetLogin={this.props.navigation.state.params.resetLogin} />
						</List.Item>
					</List>
					:
					<List>
						<HeaderNoBack text="信息完善"/>
						<InputItem
							onChange={this.onInputFormChange.bind(this, 'userName')}
							value={this.state.form.userName}
							maxLength={50}
							placeholder="请输入姓名"
						>姓名</InputItem>
						<InputItem
							onChange={this.onInputFormChange.bind(this, 'shopName')}
							value={this.state.form.shopName}
							maxLength={128}
							placeholder="请输入店铺名称"
						>店铺名称</InputItem>
						<InputItem
							onChange={this.onInputFormChange.bind(this, 'shopAddress')}
							value={this.state.form.shopAddress}
							maxLength={256}
							placeholder="请输入店铺地址"
						>店铺地址</InputItem>
						<List.Item
							extra={<TouchableOpacity
								onPress={this.showImagePicker.bind(this)}
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
						<InputItem
							onChange={this.onInputFormChange.bind(this, 'freezerType')}
							value={this.state.form.freezerType}
							maxLength={200}
							placeholder="请输入冰柜种类"
						>冰柜种类</InputItem>
						<InputItem
							onChange={this.onInputFormChange.bind(this, 'freezerModel')}
							value={this.state.form.freezerModel}
							maxLength={100}
							placeholder="请输入冰柜型号"
						>冰柜型号</InputItem>
						<DatePicker
							mode="date"
							title="投柜时间"
							onChange={(arkTimeValue) => {
								this.state.form.arkTime = arkTimeValue.format("YYYY-MM-DD");
								this.setState({
									arkTimeValue
								});
							}}
							value={this.state.arkTimeValue}
						>
							<List.Item arrow="horizontal">投柜时间</List.Item>
						</DatePicker>
						<Picker data={this.state.district} cols={1}
										onChange={this.onInputFormChange.bind(this, 'districtId')}
										value={this.state.form.districtId}
										className="forss">
							<List.Item arrow="horizontal">所属片区</List.Item>
						</Picker>
						<List.Item>
							<Button type="primary" onClick={this.onSubmit.bind(this)}>提交</Button>
						</List.Item>
						<List.Item>
							<LoginOutButton resetLogin={this.props.navigation.state.params.resetLogin} />
						</List.Item>
						<ActivityIndicator
							toast
							text="正在提交"
							animating={this.state.animating}
						/>
					</List>}
		</ScrollView>);
	}
}

export default CompleteShopPage;