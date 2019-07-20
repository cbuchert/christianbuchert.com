import Head from "next/head.js";
import content from "../content/md/home.md";
import funConsoleMessage from "../util/funConsoleMessage";
import IndexCopy from "../components/IndexCopy";

export default function Index({links}) {
    funConsoleMessage();

    return (
        <div className={"container"}>
            <Head>
                <title>{content.attributes.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta name="description" content={content.attributes.description}/>
                <link
                    href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans|Open+Sans+Condensed:300&display=swap"
                    rel="stylesheet"
                />
                <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico"/>
            </Head>
            <IndexCopy
                {...content.attributes}
                bodyHtml={content.html}
                links={links}
            />
            <div>
            </div>
            <style jsx>{`
                html,
                body {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                
                body {
                    background-color: #fefefe; 
                }

                .container {
                  max-width: 786px;
                  margin: 0 auto;
                  padding: 120px 10px 0;
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