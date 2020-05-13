import { default as React, useState, useEffect, useCallback } from 'react';
import { useApi } from '../services';

const HomePage = ({children}) => {
	const { findAllPosts } = useApi();
	const [ posts, setPosts ] = useState();

	useEffect(() => {
		const fetchPosts = async () => {
			const data = await findAllPosts();
			console.log(data);
			setPosts(data);
		}
		fetchPosts();
	}, []);

	return (
	<div className="post-list">
		{posts && posts.map((post, index) => (
				<article key={post._id}>
					<h1>{post.title}</h1>
					<div>{post.synopsis}</div>
				</article>
		))}
	</div>
	);
};

export default HomePage;