import ToCItemModel from "../../models/ToC/ToCItemModel.js";
import ToCItem from "../../components/ToC/ToCItem.js";

export default class extends React.Component {
  static async getInitialProps() {
    const posts = (context => {
      const keys = context.keys();
      const values = keys.map(context); // What is this actually doing?

      const data = keys.map((key, i) => {
        const value = values[ i ];
        const url = key.replace(/^.*[\\\/]/, "").split(".").slice(0, -1).join(".");

        return new ToCItemModel(value.attributes.title, value.attributes.description, url);
      });

      return data;
    })(require.context("../../content/md/blog", false, /\.md$/));

    return { posts };
  }

  render() {
    return (
      <div>
        <h1>Posts</h1>
        {this.props.posts.map(post => <ToCItem linkModel={post} pathname="/blog/post" key={post.title}/>)}
      </div>
    );
  }
}
