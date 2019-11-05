import Link from "next/link";

export default function ToCItem({ pathname, linkModel }) {
  return (
    <Link
      as={`${pathname}/${linkModel.url}`}
      href={
        {
          pathname: `${pathname}/[post]`,
          query: { post: linkModel.url },
        }
      }
    >
      <a>{linkModel.title}</a>
    </Link>
  );
}
