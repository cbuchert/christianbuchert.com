import Head from "next/head.js";
import content from "../content/md/home.md";
import funConsoleMessage from "../util/funConsoleMessage";
import IndexCopy from "../components/index/IndexCopy";
import Glyph from "../components/index/Glyph";

export default function Index({links}) {
    funConsoleMessage();

    return (
        <div className={"layout"}>
            <Head>
                <title>{content.attributes.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta name="description" content={content.attributes.description}/>
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat:700|Open+Sans|Open+Sans+Condensed:300&display=swap"
                    rel="stylesheet"
                />
                <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico"/>
                <style>{`
                    html,
                    body {
                        height: 100%;
                        margin: 0;
                        padding: 0;
                    }
                    
                    body {
                        background-color: #fefefe;
                        display: flex;
                    }
                `}</style>
            </Head>
            <IndexCopy
                {...content.attributes}
                bodyHtml={content.html}
                links={links}
            />
            <Glyph/>
            <style jsx>{`
                .layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    height: 100%;
                }
            `}</style>
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