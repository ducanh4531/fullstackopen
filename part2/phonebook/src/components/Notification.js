import React from "react";

const Notification = ({ message, name }) => {
	if (message === null) {
		return null;
	}
	if (message) {
		return <div className="success">Added {name}</div>;
	}
	// ) : (
	// 	<div className="error">
	// 		Information of {name} has already been removed from server
	// 	</div>
	// );
};

export default Notification;
