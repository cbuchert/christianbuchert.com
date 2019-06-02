import Link from 'next/link';

export default function ToCItem(props) {
	return (
		<Link as={`${props.pathname}/${props.linkModel.url}`} href={{pathname: props.pathname, query: {id: props.linkModel.url}}}>
			<a>{props.linkModel.title}</a>
		</Link>
	);
}