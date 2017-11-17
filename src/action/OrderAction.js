/**
 * Created by houenteng on 17-11-8.
 */

import AjaxUtil from '../util/AjaxUtil';

export default OrderAction = {
	create: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/order/create.json',
			params,
			success,
			error
		});
	},
	cancel: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/order/cancel.json',
			params,
			success,
			error
		});
	},
	queryByPhone: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/order/queryByPhone.json',
			params,
			success,
			error
		});
	},
}