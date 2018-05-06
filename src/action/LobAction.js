/**
 * Created by houenteng on 17-2-1.
 */

export default LobAction = {
	getMainKey: ({params, success, error}) => {
		fetch(__REMOTE_URL__ + '/ice/app/getMainKey.json', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => {
				success(data);
			}).catch((errors) => {
			error(errors);
		});
	},
	uploadImage: ({file, success, error}) => {
		file.type = 'multipart/form-data';
		file.name = 'a.jpg';
		let formData = new FormData();
		formData.append("file", file);

		fetch(__REMOTE_URL__ + '/ice/common/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				success(data);
			}).catch((errors) => {
			error(errors);
		});
	}
}