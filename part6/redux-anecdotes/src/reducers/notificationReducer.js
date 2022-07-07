let nextNotificationId = 0;
const initialNotification = { message: "", id: nextNotificationId };

const notificationReducer = (state = initialNotification, action) => {
	switch (action.type) {
		case "SHOW":
			return action.data;
		case "RESET":
			const id = action.data.id;
			if (state.id === id) {
				return initialNotification;
			}
		//no-fallthrough
		default:
			return state;
	}
};

const showNotification = (message, id) => {
	return {
		type: "SHOW",
		data: { message, id },
	};
};

const removeNotification = (id) => {
	return {
		type: "RESET",
		data: { id },
	};
};

export const showNotificationWithTimeout = (message, duration) => {
	return async (dispatch) => {
		const id = nextNotificationId++;
		dispatch(showNotification(message, id));

		setTimeout(() => {
			dispatch(removeNotification(id));
		}, duration);
	};
};

export default notificationReducer;
