/**
 * Created by houenteng on 17-2-1.
 */

import AjaxUtil from '../util/AjaxUtil';

export default PromotionAction = {
	queryCurrent: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/promotion/queryCurrent.json',
			params,
			success,
			error
		});
	},
}