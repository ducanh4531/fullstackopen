import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
	const message = useSelector((state) => state.notification);

	// const errorStyle = {
	// 	color: "red",
	// 	background: "lightgrey",
	// 	fontSize: 20,
	// 	borderStyle: "solid",
	// 	borderRadius: 5,
	// 	padding: 10,
	// 	marginBottom: 10,
	// };

	if (message === null) {
		return null;
	}

	return (
		<>
			<Alert
				className="error"
				variant={
					["added", "updated"].some((el) => message.includes(el))
						? "success"
						: "danger"
				}
			>
				{message}
			</Alert>
		</>
	);
};

Notification.propTypes = {
	message: PropTypes.string,
};

export default Notification;
