const MIN_X = - 25
const MAX_X = 25
const MIN_Y = - 30
const MAX_Y = 35
const MIN_Z = 0
const MAX_Z = 60

export function drawLorenzAttractor2d(canvas: HTMLCanvasElement, x: number, y: number, z: number, sigma: number, rho: number, beta: number, deltaT: number, scaleFactor: number) {
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return
  }

  // lighten the background by putting a semitransparent white rectangle over the entire canvas
  ctx.fillStyle = "rgba(255, 255, 255, 0.01)"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const deltaX = (sigma * (y - x)) * deltaT
  const deltaY = (x * (rho - z) - y) * deltaT
  const deltaZ = (x * y - beta * z) * deltaT

//   Set the color of the line.
//   Calculate a red value based on the x value, normalized between MIN_X and MAX_X.
  const red = Math.floor((x - MIN_X) / (MAX_X - MIN_X) * 255)
//   Calculate a green value based on the y value, normalized between MIN_Y and MAX_Y.
  const green = Math.floor((y - MIN_Y) / (MAX_Y - MIN_Y) * 255)
//   Calculate a blue value based on the z value, normalized between MIN_Z and MAX_Z.
  const blue = Math.floor((z - MIN_Z) / (MAX_Z - MIN_Z) * 255)
  ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`

//   Set the thickness of the line, normalized between MIN_Z and MAX_Z. Don't exceed 10.
  ctx.lineWidth = Math.min((z - MIN_Z) / (MAX_Z - MIN_Z) * scaleFactor, scaleFactor)

//   Draw a line from the current point to the next point.
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2 + (x * scaleFactor), canvas.height / 2 + (y * scaleFactor))
  ctx.lineTo(canvas.width / 2 + ((x + deltaX) * scaleFactor), canvas.height / 2 + ((y + deltaY) * scaleFactor))
  ctx.stroke()

//   Request animation frame for smooth animation.
  return requestAnimationFrame(() => {
    //   Draw the next iteration of the lorenz attractor.
    drawLorenzAttractor2d(canvas, x + deltaX, y + deltaY, z + deltaZ, sigma, rho, beta, deltaT, scaleFactor)
  })
}
