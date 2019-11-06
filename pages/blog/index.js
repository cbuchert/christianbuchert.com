import ToCItem from "../../components/ToC/ToCItem.js";

export default class extends React.Component {
  static async getInitialProps() {
    const posts = (context => {
      const keys = context.keys();
      const values = keys.map(context);

      //TODO: Sort posts by date, descending.
      const data = keys.map((key, i) => {
        const value = values[ i ];
        const url = key.replace(/^.*[\\\/]/, "").split(".").slice(0, -1).join(".");

        return {
          title: value.attributes.title,
          description: value.attributes.description,
          date: new Date(value.attributes.date),
          url,
        };
      });

      data.sort((a, b) => a.date <= b.date ? 1 : -1);

      return data;
    })(require.context("../../content/md/blog", false, /\.md$/));

    return { posts };
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <ul>
          {this.props.posts.map(post => <ToCItem linkModel={post} pathname="/blog" key={post.title}/>)}
        </ul>
      </div>
    );
  }
}
