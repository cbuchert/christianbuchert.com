export function renderLSystem(canvas: HTMLCanvasElement, lSystemString: string, iterations: number, angle: number, angleJitter: number, length: number) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

//   Set stroke to pale pastel orange
  ctx.strokeStyle = "#FFB347"

//   Reset the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0)
//   Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

//   Start drawing at the bottom center of the canvas
  ctx.translate(canvas.width / 2, canvas.height - 20)

// Write a loop to iterate over the lSystemString and draw the lines
  for (let i = 0; i < lSystemString.length; i ++) {
    // Animate each setup of the l system
    setTimeout(() => {
      const char = lSystemString[ i ]

      if (char === "F") {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, - length)
        ctx.stroke()
        ctx.translate(0, - length)
      } else if (char === "+") {
        ctx.rotate(degreesToRadians(Math.random() * angleJitter + angle))
      } else if (char === "-") {
        ctx.rotate(degreesToRadians(- (Math.random() * angleJitter + angle)))
      } else if (char === "[") {
        ctx.save()
      } else if (char === "]") {
        ctx.restore()
      }
    }, 1000/60)
  }
}

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}
