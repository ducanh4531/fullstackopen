import React from "react";
import BlogForm from "./BlogForm";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

describe("<BlogForm />", () => {
	let component;
	const mockHandler = jest.fn();

	beforeEach(() => {
		const blogs = [
			{
				title: "Blog form test1",
				author: "sam",
				url: "fb.com",
				user: { name: "sam", username: "samros1" },
			},
			{
				title: "Blog form test2",
				author: "sam",
				url: "fb.com",
				user: { name: "sam", username: "samros12" },
			},
		];

		component = render(
			<BlogForm
				createBlog={mockHandler}
				modifyBlog={mockHandler}
				blogs={blogs}
			/>
		);
	});

	test("test for new blog", () => {
		const input = {
			titleInput: component.container.querySelector("#title"),
			authorInput: component.container.querySelector("#author"),
			urlInput: component.container.querySelector("#url"),
		};
		const div = component.container.querySelector(".formDiv");

		fireEvent.change(input.titleInput, { target: { value: "flutter" } });
		fireEvent.change(input.authorInput, { target: { value: "sam" } });
		fireEvent.change(input.urlInput, { target: { value: "fb.com" } });
		fireEvent.submit(div);

		console.log(prettyDOM(div));

		expect(mockHandler.mock.calls).toHaveLength(1);
		expect(mockHandler.mock.calls[0][0]).toEqual({
			title: "flutter",
			author: "sam",
			url: "fb.com",
		});
	});
});
