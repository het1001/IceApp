
const DoubleUtil = {
	add: (num1, num2) => {
		let baseNum, baseNum1, baseNum2;
		try {
			baseNum1 = num1.toString().split(".")[1].length;
		} catch (e) {
			baseNum1 = 0;
		}
		try {
			baseNum2 = num2.toString().split(".")[1].length;
		} catch (e) {
			baseNum2 = 0;
		}
		baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
		let precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;//精度
		return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision);
	},
	sub: (num1, num2) => {
		let baseNum, baseNum1, baseNum2;
		try {
			baseNum1 = num1.toString().split(".")[1].length;
		} catch (e) {
			baseNum1 = 0;
		}
		try {
			baseNum2 = num2.toString().split(".")[1].length;
		} catch (e) {
			baseNum2 = 0;
		}
		baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
		let precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
		return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
	},
}

export default DoubleUtil;