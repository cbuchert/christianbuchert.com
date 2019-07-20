import Head from "next/head.js";
import content from "../content/md/home.md";
import NavLinks from "../components/NavLinks";
import funConsoleMessage from "../util/funConsoleMessage";

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
            <h1 className={"heading"}>{content.attributes.heading}</h1>
            <h2 className={"sub-heading"}>{content.attributes.subHeading}</h2>
            <div className={"body"} dangerouslySetInnerHTML={{__html: content.html}}/>
            <NavLinks links={links}/>
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
                
                .heading {
                  color: #FBAE41;
                  font-family: Montserrat, Arial, sans-serif;
                  font-weight: bold;
                  text-transform: uppercase;
                  font-size: 40px;
                  margin: 0;
                }
                
                .sub-heading {
                  color: #999;
                  font-family: Open Sans Condensed, Arial, sans-serif;
                  margin: 0 0 0 3px;
                }
                
                .body {
                  font-family: Open Sans, Arial, sans-serif;
                  color: #666;
                  margin: 40px 0 80px;
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
