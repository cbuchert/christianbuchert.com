import {easing, styler, tween} from "popmotion";

export function explodeGlyph(distance, duration) {
    const [top, left, right] = ["top", "left", "right"]
        .map(face => styler(document.getElementById(`chris-glyph--${face}`)));
    const tweenConfig = {
        from: 0,
        to: distance * -1,
        duration: duration,
        ease: easing.backInOut,
    };


    tween(tweenConfig).start(value => {
        top.set(getCoordinatesFromVector(90, value));
        right.set(getCoordinatesFromVector(210, value));
        left.set(getCoordinatesFromVector(330, value));
    });
}

function getCoordinatesFromVector(angle, distance) {
    return {
        x: distance * Math.cos(degreesToRadians(angle)),
        y: distance * Math.sin(degreesToRadians(angle)),
    };
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}
