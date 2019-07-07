import Head from "next/head.js";
import content from "../content/md/home.md";
import NavLinks from "../components/NavLinks";

export default function Index({links}) {
	return (
		<div>
			<Head>
				<title>{content.attributes.title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
				<meta name="description" content={content.attributes.description}/>
			</Head>
			<h1>{content.attributes.heading}</h1>
			<h2>{content.attributes.subHeading}</h2>
			<div dangerouslySetInnerHTML={{__html: content.html}}/>
			<NavLinks links={links}/>
		</div>
	);
}

Index.getInitialProps = async () => {
	const links = (context => {
		const keys = context.keys();
		const values = keys.map(context);

		const data = keys.map((key, i) => {
			const value = values[i];

			return value.attributes;
		});

		return data;
	})(require.context("../content/md/home/links", false, /\.md$/));

	return {links};
};
