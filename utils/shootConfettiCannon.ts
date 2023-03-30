class Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  maxAge: number

  constructor(width: number, height: number, color: string, maxAge: number) {
    // Generate x and y coordinates within 100 pixel circle at the center of the canvas
    const angle = Math.random() * Math.PI * 2
    const radius = Math.random() * 100
    this.x = width / 2 + radius * Math.cos(angle)
    this.y = height / 2 + radius * Math.sin(angle)

    // Generate random velocity away from the center of the center of the canvas
    const speed = Math.random() * 10
    this.vx = speed * Math.cos(angle)
    this.vy = speed * Math.sin(angle)

    this.color = color
    this.maxAge = Math.random() * maxAge
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.x += this.vx
    this.y += this.vy
    this.vy += 0.5

    ctx.beginPath()
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

export function shootConfettiCannon(canvas: HTMLCanvasElement, particles: number, particleLifeInMs: number) {
  const ctx = canvas.getContext("2d")
  const width = canvas.width
  const height = canvas.height
  const startTime = Date.now()
  const endTime = startTime + particleLifeInMs
  const particleArray: Particle[] = []

  for (let i = 0; i < particles; i ++) {
    const color = `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`

    particleArray.push(new Particle(width, height, color, particleLifeInMs))
  }

  function draw() {
    if (!ctx) {
      return
    }

    const now = Date.now()

    ctx.clearRect(0, 0, width, height)

    if (now > endTime) {
      return
    }

    for (const particle of particleArray) {
      // If particle is offscreen, remove it from the array
      if (particle.x < 0 || particle.x > width || particle.y < 0 || particle.y > height) {
        particleArray.splice(particleArray.indexOf(particle), 1)
      }

      // If a particle's age is greater than its max age, remove it from the array
      if (now - startTime > particle.maxAge) {
        particleArray.splice(particleArray.indexOf(particle), 1)
      }

      if (particle) {
        particle.draw(ctx)
      }
    }

    requestAnimationFrame(draw)
  }

  draw()
}
