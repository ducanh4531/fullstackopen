import React from "react";
import PropTypes from "prop-types";
import "@testing-library/dom";

const Notification = ({ message }) => {
	const errorStyle = {
		color: "red",
		background: "lightgrey",
		fontSize: 20,
		borderStyle: "solid",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	if (message === null) {
		return null;
	}

	return (
		<>
			<p
				className="error"
				style={
					message.includes("added")
						? { ...errorStyle, color: "green" }
						: errorStyle
				}
			>
				{message}
			</p>
		</>
	);
};

Notification.propTypes = {
	message: PropTypes.string,
};

export default Notification;
