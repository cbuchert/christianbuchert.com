import Link from "next/link";

export default function ({ title, imageSrc, imageAlt, url, target }) {
  const linkStyles = {
    fontFamily: "Open Sans, Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    color: "#FCECD4",
  };
  const imageStyles = {
    height: "20px",
    marginRight: "10px",
  };

  return (
    <>
      <Link href={url}>
        <a target={target} style={linkStyles}>
          <img
            src={imageSrc}
            alt={imageAlt}
            style={imageStyles}
          />
          {title}
        </a>
      </Link>
    </>
  );
}
