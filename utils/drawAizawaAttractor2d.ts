// https://www.dynamicmath.xyz/strange-attractors/

import { rotate3d } from "./rotate3d"

const MIN_X = - 1.5
const MAX_X = 1.6
const MIN_Y = - 1.6
const MAX_Y = 1.6
const MIN_Z = - .8
const MAX_Z = 0

export function drawAizawaAttractor2d(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  z: number,
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  deltaT: number,
  theta: number,
  phi: number,
  scaleFactor: number,
) {
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return
  }

  // lighten the background by putting a semitransparent white rectangle over the entire canvas
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const deltaX = ((z - b) * x - d * y) * deltaT
  const deltaY = (d * x + (z - b) * y) * deltaT
  const deltaZ = (c + a * z - (z * z * z) / 3 - (x * x + y * y) * (1 + e * z) + f * (x * x * x + y * y * y)) * deltaT

  // Set the color of the line.
  // Calculate a red value based on the x value, normalized between MIN_X and MAX_X.
  const red = Math.floor((x - MIN_X) / (MAX_X - MIN_X) * 255)
  // Calculate a green value based on the y value, normalized between MIN_Y and MAX_Y.
  const green = Math.floor((y - MIN_Y) / (MAX_Y - MIN_Y) * 255)
  // Calculate a blue value based on the z value, normalized between MIN_Z and MAX_Z.
  const blue = Math.floor((z - MIN_Z) / (MAX_Z - MIN_Z) * 255)
  ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`

  // Set the thickness of the line, normalized between MIN_Z and MAX_Z. Don't exceed 10.
  ctx.lineWidth = Math.min((z - MIN_Z) / (MAX_Z - MIN_Z) * scaleFactor, scaleFactor)

  const [ xPrime, yPrime ] = rotate3d(x, y, z, theta, phi)

  // Draw a line from the current point to the next point.
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2 + (xPrime * scaleFactor), canvas.height / 2 + (yPrime * scaleFactor))
  ctx.lineTo(canvas.width / 2 + ((xPrime + deltaX) * scaleFactor), canvas.height / 2 + ((yPrime + deltaY) * scaleFactor))
  ctx.stroke()

  // Request animation frame for smooth animation.
  return requestAnimationFrame(() => {
    // Draw the next iteration of the lorenz attractor.
    drawAizawaAttractor2d(canvas, x + deltaX, y + deltaY, z + deltaZ, a, b, c, d, e, f, deltaT, theta, phi, scaleFactor)
  })
}
