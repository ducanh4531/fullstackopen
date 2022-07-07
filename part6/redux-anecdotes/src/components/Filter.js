import React from "react";
import { connect } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = (props) => {
	const handleChange = (event) => {
		const value = event.target.value;
		props.filterChange(value);
	};

	const style = {
		marginBottom: 10,
	};

	return (
		<div style={style}>
			filter <input onChange={handleChange} />
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		filterChange: (value) => {
			dispatch(filterChange(value));
		},
	};
};

export default connect(null, mapDispatchToProps)(Filter);
