/**
 * Created by houenteng on 17-8-20.
 */

import AjaxUtil from '../util/AjaxUtil';

export default UserShopInfoAction = {
	getLastShopInfo: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/shopinfo/getShopInfo.json',
			params,
			success,
			error
		});
	},
}