import NavLinks from "./NavLinks";

export default function IndexCopy({heading, subHeading, bodyHtml, links}) {
    return (
        <div>
            <h1 className={"heading"}>{heading}</h1>
            <h2 className={"sub-heading"}>{subHeading}</h2>
            <div className={"body"} dangerouslySetInnerHTML={{__html: bodyHtml}}/>
            <NavLinks links={links}/>
            <style jsx>{`
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
