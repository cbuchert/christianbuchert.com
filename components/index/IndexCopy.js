import NavLinks from "../NavLinks";

export default function IndexCopy({heading, subHeading, bodyHtml, links}) {
    return (
        <>
            <div className={"content"}>
                <div className={"content--container"}>
                    <h1 className={"heading"}>{heading}</h1>
                    <h2 className={"sub-heading"}>{subHeading}</h2>
                    <div className={"body"} dangerouslySetInnerHTML={{__html: bodyHtml}}/>
                    <NavLinks links={links}/>
                </div>
            </div>
            <style jsx>{`
                .content {
                    background-color: #FBAE41;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                }
                
                .content--container {
                    padding: 2rem;
                    margin: 0 auto;
                    max-width: 768px;
                }
                
                .heading {
                  color: #FEFEFE;
                  font-family: Montserrat, Arial, sans-serif;
                  font-weight: 700;
                  text-transform: uppercase;
                  font-size: 40px;
                  margin: 0;
                }
                
                .sub-heading {
                  color: #EFEFEF;
                  font-family: Open Sans Condensed, Arial, sans-serif;
                  margin: 0 0 0 3px;
                }
                
                .body {
                  font-family: Open Sans, Arial, sans-serif;
                  color: #666;
                  margin: 40px 0 80px;
                }
            `}</style>
        </>
    );
}
