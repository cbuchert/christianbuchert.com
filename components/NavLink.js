import Link from "next/link";

export default function ({title, imageSrc, imageAlt, url, target}) {
    return (
        <Link href={url}>
            <a target={target}>
                <img
                    src={imageSrc}
                    alt={imageAlt}
                />
                {title}
            </a>
        </Link>
    );
}