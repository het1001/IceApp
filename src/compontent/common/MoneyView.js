import React from 'react';

import {
	View,
	Text
} from 'react-native';

class MoneyView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			integer: '0',
			decimals: '0'
		};
	};

	componentWillMount() {
		this.onPares(this.props);
	};

	componentWillReceiveProps(nextProps) {
		this.onPares(nextProps);
	};

	onPares(props) {
		if (!props.number && props.number !== 0 && props.number !== '0') {
			return;
		}

		const number = String(props.number);
		const ns = number.split('.');
		if (ns.length == 2) {
			this.setState({
				integer: ns[0],
				decimals: ns[1]
			});
		} else {
			this.setState({
				integer: ns[0],
				decimals: '0'
			});
		}
	};

	render() {
		const size = this.props.size ? this.props.size : 1;
		const color = this.props.color ? this.props.color : 'red';

		return (
			<Text style={{ flex: 1, flexDirection: 'row', marginTop: 3}}>
				<Text style={{ marginTop: 7, fontSize: 18 * size, color: color}}>￥</Text>
				<Text style={{ fontSize: 25 * size, color: color}}>{this.state.integer}.</Text>
				<Text style={{ marginTop: 7, fontSize: 18 * size, color: color}}>{this.state.decimals}</Text>
			</Text>
		);
	}
}

export default MoneyView;