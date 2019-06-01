import Head from "next/head.js";
import content from "../content/md/home.md";

export default function Index() {
	return (
		<div>
			<Head>
				<title>{content.attributes.title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
				<meta name="description" content={content.attributes.description}/>
			</Head>
			<div dangerouslySetInnerHTML={{__html: content.html}}/>
		</div>
	);
}