const minX = -25
const maxX = 25
const minY = -30
const maxY = 35
const minZ = 0
const maxZ = 60

export function drawLorenzAttractor(canvas: HTMLCanvasElement, x: number, y: number, z: number, sigma: number, rho: number, beta: number, dt: number) {
  const ctx = canvas.getContext("2d")
  const scaleFactor = 10

  if (!ctx) {
    return
  }

  const deltaX = (sigma * (y - x)) * dt
  const deltaY = (x * (rho - z) - y) * dt
  const deltaZ = (x * y - beta * z) * dt

//   Set the color of the line.
//   Calculate a red value based on the x value, normalized between minX and maxX.
  const red = Math.floor((x - minX) / (maxX - minX) * 255)
//   Calculate a green value based on the y value, normalized between minY and maxY.
  const green = Math.floor((y - minY) / (maxY - minY) * 255)
//   Calculate a blue value based on the z value, normalized between minZ and maxZ.
  const blue = Math.floor((z - minZ) / (maxZ - minZ) * 255)
  const color = `rgb(${red}, ${green}, ${blue})`
  ctx.strokeStyle = color

//   Set the thickness of the line, normalized between minZ and maxZ. Don't exceed 5.
  const lineWidth = Math.min((z - minZ) / (maxZ - minZ) * 5, 5)
  ctx.lineWidth = lineWidth

//   Draw a line from the current point to the next point.
  ctx.beginPath()
  ctx.moveTo(canvas.width / 2 + (x * scaleFactor), canvas.height / 2 + (y * scaleFactor))
  ctx.lineTo(canvas.width / 2 + ((x + deltaX) * scaleFactor), canvas.height / 2 + ((y + deltaY) * scaleFactor))
  ctx.stroke()

//   Request animation frame for smooth animation.
  requestAnimationFrame(() => {
    //   Draw the next iteration of the lorenz attractor.
    drawLorenzAttractor(canvas, x + deltaX, y + deltaY, z + deltaZ, sigma, rho, beta, dt)
  })
}
