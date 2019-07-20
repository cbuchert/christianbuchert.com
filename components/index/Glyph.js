import React, {useState, useEffect} from "react";
import ChrisGlyph from "../../static/img/chris-glyph.svg";

export default function Glyph(props) {
    return (
        <>
            <div className={"glyph--container"}>
                <ChrisGlyph
                    id={"chris-glyph"}
                    height={"100%"}
                    width={"100%"}
                    viewBox={"0 0 800 800"}
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
