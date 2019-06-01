import content from "../content/md/index.md";

export default function Index() {
	console.log(content.html);
	return (
		<div dangerouslySetInnerHTML={{__html: content.html}}/>
	);
}