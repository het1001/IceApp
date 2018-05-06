/**
 * Created by Administrator on 2017/8/20.
 */
import {
	Toast
} from 'antd-mobile';

const AjaxUtil = {
	post: ({url, params, success, error}) => {
		storage.load({
			key: 'user',
		}).then(ret => {
			fetch(__REMOTE_URL__ + url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'token': ret.token,
				},
				body: JSON.stringify(params)
			}).then((response) => {
				return response.json();
			})
				.then((data) => {
					success(data);
				}).catch((errors) => {
					if (error) {
						error(errors);
					} else {
						Toast.fail(errors, 2, null, false);
					}
			});
		});
	},
	postNt: ({url, params, success, error}) => {
		fetch(__REMOTE_URL__ + url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(params)
		}).then((response) => {
			return response.json();
		})
			.then((data) => {
				success(data);
			}).catch((errors) => {
				if (error) {
					error(errors);
				} else {
					Toast.fail(errors, 2, null, false);
				}
		});
	}
}

export default AjaxUtil;