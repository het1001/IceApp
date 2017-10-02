/**
 * Created by houenteng on 17-2-1.
 */

import AjaxUtil from '../util/AjaxUtil';

export default CommodityAction = {
	queryAllOnline: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/commodity/queryAllOnline.json',
			params,
			success,
			error
		});
	},
}