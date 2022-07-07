import React from "react";
import Blog from "./Blog";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
	let component;
	const mockHandler = jest.fn();

	beforeEach(() => {
		const blog = {
			title: "Blog test",
			author: "sam",
			url: "fb.com",
			user: { name: "sam", username: "samros1" },
		};

		component = render(
			<Blog
				blog={blog}
				userInfo={{ name: "sam", username: "samros12" }}
				modifyBlog={mockHandler}
				handleDelete={mockHandler}
			/>
		);
	});

	test("div contains url, likes be hidden", () => {
		const div = component.container.querySelector(".hiddenDiv");
		// console.log(prettyDOM(div));

		expect(component.container).toHaveTextContent("Blog test");
		expect(component.container).toHaveTextContent("sam");
		expect(div).not.toBeVisible();
		expect(div).toHaveStyle("display: none");
	});

	test("div contains url, likes displays when button clicked", () => {
		const button = component.getByText("view");
		const div = component.container.querySelector(".hiddenDiv");

		fireEvent.click(button);
		// console.log(prettyDOM(div));

		expect(div).not.toHaveStyle("display: none");
	});

	test("the event handler called twice after like button clicked twice,", () => {
		const likeButton = component.getByText("like");
		const showButton = component.getByText("view");
		const div = component.container.querySelector(".hiddenDiv");

		fireEvent.click(showButton);
		userEvent.dblClick(likeButton);

		console.log(prettyDOM(div));

		expect(mockHandler.mock.calls).toHaveLength(2);
		expect(mockHandler).toHaveBeenCalledTimes(2);
	});
});
