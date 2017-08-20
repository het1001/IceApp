/**
 * Created by Administrator on 2017/8/20.
 */

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
            }).then((response) => { return response.json(); })
                .then((data) => {
                    success(data);
                }).catch((errors) => {
                error(errors);
            });
        });
    }
}

export default AjaxUtil;