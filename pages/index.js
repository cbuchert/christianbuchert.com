import content from "../content/md/index.md";

export default function Index() {
	return (
		<div dangerouslySetInnerHTML={{__html: content.html}}/>
	);
}