import { MutableRefObject, RefObject } from "react"

export const drawEnterpriseWindow = (canvas: HTMLCanvasElement, cancelAnimationRef: MutableRefObject<number | null>) => {
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const lines = [
    ...Array.from({ length: 80 }, () => new Line(Math.ceil(Math.random() * 7) * 2)),
    ...Array.from({ length: 10 }, () => new Line(Math.ceil(Math.random() * 5) * 7)),
    ...Array.from({ length: 7 }, () => new Line(Math.ceil(Math.random() * 3) * 10)),
  ]

  const draw = () => {
    ctx.rect(0, 0, window.innerWidth, window.innerHeight)
    ctx.fillStyle = "black"
    ctx.fill()
    lines.forEach((line) => {
      line.update()
      line.draw(ctx)
    })
    cancelAnimationRef.current = requestAnimationFrame(draw)
  }

  draw()

  return () => {
    if (cancelAnimationRef.current) {
      cancelAnimationFrame(cancelAnimationRef.current)
    }
  }
}

class Line {
  private x: number
  private y: number
  private length: number
  private readonly width: number

  constructor( private velocity: number) {
    this.length = Math.floor(Math.random() * 100) * velocity
    this.width = velocity
    this.y = Math.floor(Math.random() * window.innerHeight)
    this.x = Math.floor(Math.random() * window.innerWidth)
  }

  update() {
    if (this.x > window.innerWidth) {
      this.length = Math.floor(Math.random() * 100) * this.velocity
      this.y = Math.floor(Math.random() * window.innerHeight)
      this.x = 0 - this.length
    } else {
      this.x += this.velocity
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x + this.length, this.y)
    ctx.lineWidth = this.width
    ctx.strokeStyle = "white"
    ctx.stroke()
  }
}
