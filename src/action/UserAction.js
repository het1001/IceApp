/**
 * Created by houenteng on 17-2-1.
 */

import AjaxUtil from '../util/AjaxUtil';

export default UserAction = {
    login : ({params, success, error}) => {
        AjaxUtil.post({
            url: '/ice/app/user/login.json',
            params,
            success,
            error
        });
    },
    getInitAuthCode : ({params, success, error}) => {
        AjaxUtil.post({
            url: '/ice/app/user/getInitAuthCode.json',
            params,
            success,
            error
        });
    },
    authCode : ({params, success, error}) => {
        AjaxUtil.post({
            url: '/ice/app/user/authCode.json',
            params,
            success,
            error
        });
    },
    setPassWord : ({params, success, error}) => {
        AjaxUtil.post({
            url: '/ice/app/user/setPassWord.json',
            params,
            success,
            error
        });
    },
    reSetPassWord : ({params, success, error}) => {
        AjaxUtil.post({
            url: '/ice/app/user/reSetPassWord.json',
            params,
            success,
            error
        });
    },
    getAuthCode : ({params, success, error}) => {
        AjaxUtil.post({
            url: '/ice/app/user/getAuthCode.json',
            params,
            success,
            error
        });
    },
    completeShopInfo : ({params, success, error}) => {
        AjaxUtil.post({
            url: '/ice/app/user/completeShopInfo.json',
            params,
            success,
            error
        });
    }
}