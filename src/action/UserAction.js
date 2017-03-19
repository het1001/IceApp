/**
 * Created by houenteng on 17-2-1.
 */

export default UserAction = {
    login : ({params, success, error}) => {
        fetch(__REMOTE_URL__ + '/ice/app/user/login.json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                success(response.data);
            } else {
                error(response.errorMsg);
            }
        }).catch((errors) => {
            console.error(errors);
        });
    },
    getUser : ({params, success, error}) => {
        fetch(__REMOTE_URL__ + '/ice/app/user/getUser.json', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    success(response.data);
                } else {
                    error(response.errorMsg);
                }
            }).catch((errors) => {
            console.error(errors);
        });
    }
}