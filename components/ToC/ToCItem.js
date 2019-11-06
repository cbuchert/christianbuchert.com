import Link from "next/link";

export default function ToCItem({ pathname, linkModel }) {
  const timeStamp = new Date(linkModel.date).toLocaleDateString();

  return (
    <li>
      <Link
        as={`${pathname}/${linkModel.url}`}
        href={
          {
            pathname: `${pathname}/[post]`,
            query: { post: linkModel.url },
          }
        }
      >
        <a>{timeStamp} - {linkModel.title}</a>
      </Link>
    </li>
  );
}
