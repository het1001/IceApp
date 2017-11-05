/**
 * Created by houenteng on 17-2-1.
 */

import AjaxUtil from '../util/AjaxUtil';

export default ShoppingCartAction = {
	create: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/shoppingcart/create.json',
			params,
			success,
			error
		});
	},
	update: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/shoppingcart/update.json',
			params,
			success,
			error
		});
	},
	delete: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/shoppingcart/delete.json',
			params,
			success,
			error
		});
	},
	queryByPhone: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/shoppingcart/queryByPhone.json',
			params,
			success,
			error
		});
	},
}