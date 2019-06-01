export default class extends React.Component {
	static async getInitialProps() {
		return {
			posts: require.context("../content/md", true, /\.md$/).keys(),
		};
	}

	render() {
		return (
			<div>
				<h1>Posts</h1>
				{this.props.posts.map(post => {
					return (
						<p key={post}>{post}</p>
					)
				})}
			</div>
		);
	}
}
