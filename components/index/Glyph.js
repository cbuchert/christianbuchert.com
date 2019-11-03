import React, { useState, useEffect } from "react";
import ChrisGlyph from "../../static/img/chris-glyph.svg";
import { easing, styler, tween } from "popmotion";

export default function Glyph() {
  useEffect(() => {
    const glyph = styler(document.getElementById("chris-glyph"));
    const tweenConfig = {
      from: {
        y: -5,
      },
      to: {
        y: 5,
      },
      ease: easing.easeInOut,
      flip: Infinity,
      duration: 1500,
    };
    tween(tweenConfig).start(glyph.set);
  });

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
