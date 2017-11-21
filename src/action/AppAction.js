/**
 * Created by houenteng on 17-2-1.
 */

import AjaxUtil from '../util/AjaxUtil';

export default AppAction = {
	isUpdate: ({success, error}) => {
		AjaxUtil.postNt({
			url: '/ice/app/isUpdate.json',
			params: {
				version: global.appVersion
			},
			success,
			error
		});
	}
}