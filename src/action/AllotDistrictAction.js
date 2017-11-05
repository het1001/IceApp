/**
 * Created by houenteng on 17-2-1.
 */

import AjaxUtil from '../util/AjaxUtil';

export default AllotDistrictAction = {
	queryAll: ({params, success, error}) => {
		AjaxUtil.post({
			url: '/ice/app/district/queryAll.json',
			params,
			success,
			error
		});
	},
}