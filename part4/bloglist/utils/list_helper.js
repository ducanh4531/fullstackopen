const dummy = (blogs) => {
	return 1;
}

const totalLikes = (blogs) => {
	if (!blogs) {
		return 0;
	}
	return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlogs = (blogs) => {
	const mostLike = blogs
		.reduce((t, v) => {
			t.push(v.likes);
			return t;
		}, [])
		.reduce((t, v) => (t > v ? t : v));

	const topBlog = blogs.filter((item) => item.likes === mostLike);

	return topBlog[0];
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlogs,
};
