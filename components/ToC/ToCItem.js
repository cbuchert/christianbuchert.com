import Link from "next/link";

export default function ToCItem({ pathname, linkModel }) {
  return (
    <Link as={`${pathname}/${linkModel.url}`} href={{ pathname: `${pathname}`, query: { id: linkModel.url } }}>
      <a>{linkModel.title}</a>
    </Link>
  );
}
