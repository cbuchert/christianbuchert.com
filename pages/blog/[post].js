import { Component } from "react";
import Link from "next/link.js";
import Head from "next/head.js";

export default class Post extends Component {
  static async getInitialProps({ query }) {
    console.log(query);
    const post = await import(`../../content/md/blog/${query.post}.md`);
    console.log(post);

    return { ...post.default, filename: query.post };
  }

  render() {
    const baseUrl = "https://christianbuchert.com/blog";
    const url = `${baseUrl}/${this.props.filename}.html`;

    return (
      <div>
        <Head>
          <title>{this.props.attributes.title}</title>
          <meta charSet="UTF-8"/>
          <meta name="description" content={this.props.attributes.description}/>
          {/*<meta name="keywords" content={this.props.attributes.keywords.join(",")}/>*/}
          <meta name="author" content="Christian Buchert"/>
          <meta property="og:title" content={this.props.attributes.title}/>
          <meta property="og:description" content={this.props.attributes.description}/>
          {/*<meta property="og:image" content={this.props.attributes.heroImage}/>*/}
          <meta property="og:url" content={url}/>
          <meta name="twitter:card" content="summary_large_image"/>
          <link rel="canonical" href={url}/>
        </Head>

        <h1>{this.props.attributes.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: this.props.html }}/>
        <Link href="/">
          <a>Go back to home</a>
        </Link>
      </div>
    );
  }
}
