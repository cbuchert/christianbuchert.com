import {Component} from 'react'
import Link from 'next/link.js'
import Head from 'next/head.js'

export default class Index extends Component {
	static async getInitialProps({query}) {
		const post = await import(`../../content/md/blog/${query.id}.md`);
		return {...post};
	}

	render() {
		return (
			<main>
				<Head>
					<title>{this.props.attributes.title}</title>
				</Head>

				<h1>{this.props.attributes.title}</h1>
				<div dangerouslySetInnerHTML={{__html: this.props.body}}/>
				<Link href='/'>
					<a>Go back to home</a>
				</Link>
			</main>
		)
	}
}