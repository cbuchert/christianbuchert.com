import type { NextPage } from "next"
import { useEffect, useRef } from "react"
import { useWindowSize } from "usehooks-ts"
import { drawLorenzAttractor2d } from "../../utils/drawLorenzAttractor2d"

const Page: NextPage = () => {
  const windowSize = useWindowSize()
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d")

      if (ctx) {
        ctx.clearRect(0, 0, windowSize.width, windowSize.height)
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, windowSize.width, windowSize.height)
      }

      drawLorenzAttractor2d(ref.current, .01, .01, 0, 10, 28, 8/3, .01)
    }
  }, [windowSize])

  return (
    <>
      <canvas ref={ref} height={windowSize.height} width={windowSize.width} />
    </>
  )
}

export default Page
