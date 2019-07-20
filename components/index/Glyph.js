import React from "react";
import ChrisGlyph from "../../static/img/chris-glyph.svg";

export default function Glyph(props) {
    return (
        <>
            <div className={"glyph--container"}>
                <ChrisGlyph/>
            </div>
            <style jsx>{`
                .glyph--container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </>
    );
}