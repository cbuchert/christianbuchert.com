import type { NextPage } from "next"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"
import { FullWidthLayout } from "../../components/layouts/FullWidthLayout"
import { useInput } from "../../hooks/useInput"
import styles from "../../styles/experiments.module.css"
import { drawLorenzAttractor2d } from "../../utils/drawLorenzAttractor2d"

const Page: NextPage = () => {
  const windowSize = useWindowSize()
  const ref = useRef<HTMLCanvasElement>(null)
  const xField = useInput("0.01")
  const yField = useInput("0.01")
  const zField = useInput("0")
  const dtField = useInput("0.01")
  const scaleFactorField = useInput("13")

  const handleClick = () => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d")

      if (ctx) {
        ctx.clearRect(0, 0, windowSize.width, windowSize.height)
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, windowSize.width, windowSize.height)
      }

      drawLorenzAttractor2d(ref.current, + xField.value, + yField.value, + zField.value, 10, 28, 8 / 3, + dtField.value, + scaleFactorField.value)
    }
  }

  return (
    <FullWidthLayout>
      <canvas ref={ref} height={windowSize.height} width={windowSize.width} className={styles.canvas}/>
      <main className={styles.main}>
        <h1>2D Lorenz Attractor</h1>
        <div className={styles.inputContainer}>
          <label>x <input type="number" {...xField} /></label>
          <label>y <input type="number" {...yField} /></label>
          <label>z <input type="number" {...zField} /></label>
          <label>dt <input type="number" {...dtField} /></label>
          <label>scale factor <input type="text" {...scaleFactorField} /></label>
          <button type="button" onClick={handleClick}>Send &apos;er, bud.</button>
        </div>
      </main>
    </FullWidthLayout>
  )
}

export default Page
