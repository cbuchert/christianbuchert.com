import Head from "next/head.js";
import content from "../content/md/home.md";
import NavLinks from "../components/NavLinks";

export default function Index({links}) {
    const headingStyles = {
        color: "#FBAE41",
        fontFamily: "Montserrat, Arial, sans-serif",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "40px",
        margin: "0",
    };
    const subHeadingStyles = {
        color: "#555",
        fontFamily: "Open Sans Condensed, Arial, sans-serif",
        margin: "0",
    };
    const bodyStyles = {
        fontFamily: "Open Sans, Arial, sans-serif",
        color: "#666",
    };

    return (
        <div>
            <Head>
                <title>{content.attributes.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta name="description" content={content.attributes.description}/>
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans|Open+Sans+Condensed:300&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <h1 style={headingStyles}>{content.attributes.heading}</h1>
            <h2 style={subHeadingStyles}>{content.attributes.subHeading}</h2>
            <div style={bodyStyles} dangerouslySetInnerHTML={{__html: content.html}}/>
            <NavLinks links={links}/>
        </div>
    );
}

Index.getInitialProps = async () => {
    const links = (context => {
        const keys = context.keys();
        const values = keys.map(context);

        return keys.map((key, i) => {
            const value = values[i];

            return value.attributes;
        });

    })(require.context("../content/md/home/links", false, /\.md$/));

    return {links};
};
