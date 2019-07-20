import React from "react";
import ChrisGlyph from "../../static/img/chris-glyph.svg";

export default function Glyph() {
    return (
        <>
            <div className={"glyph--container"}>
                <ChrisGlyph
                    id={"chris-glyph"}
                    height={"100%"}
                    width={"100%"}
                    viewBox={"-200 -200 1000 1000"}
                />
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
