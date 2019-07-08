import Link from "next/link";

export default function ({title, imageSrc, imageAlt, url, target}) {
    const imageStyles = {
        height: "20px",
    };

    return (
        <Link href={url}>
            <a target={target}>
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    style={imageStyles}
                />
                {title}
            </a>
        </Link>
    );
}