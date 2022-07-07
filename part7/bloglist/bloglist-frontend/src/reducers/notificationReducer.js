const initialNotification = null;

const notificationReducer = (state = initialNotification, action) => {
	switch (action.type) {
		case "SHOW":
			return action.message;
		case "RESET":
			return action.message;
		default:
			return state;
	}
};

const showNotification = (message) => {
	return {
		type: "SHOW",
		message,
	};
};

const removeNotification = (message = initialNotification) => {
	return {
		type: "RESET",
		message,
	};
};

export const showNotificationWithTimeout = (message, duration) => {
	return async (dispatch) => {
		dispatch(showNotification(message));

		setTimeout(() => {
			dispatch(removeNotification());
		}, duration);
	};
};

export default notificationReducer;
