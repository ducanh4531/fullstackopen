import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = React.forwardRef(({ children, buttonLabel }, ref) => {
	const [visible, setVisible] = useState(false);

	const showWhenVisible = { display: visible ? "" : "none" };
	const hideWhenVisible = { display: visible ? "none" : "" };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => ({ toggleVisibility }));

	return (
		<>
			<div style={showWhenVisible}>
				{children}
				<Button onClick={toggleVisibility} type="submit">
					cancel
				</Button>
			</div>

			<div>
				<Button style={hideWhenVisible} onClick={toggleVisibility}>
					{buttonLabel}
				</Button>
			</div>
		</>
	);
});

Togglable.displayName = "Togglable";
Togglable.propTypes = { buttonLabel: PropTypes.string.isRequired };
Togglable.propTypes = { children: PropTypes.object.isRequired };

export default Togglable;
