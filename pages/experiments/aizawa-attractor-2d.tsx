import type { NextPage } from "next"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"
import { FullWidthLayout } from "../../components/layouts/FullWidthLayout"
import { useInput } from "../../hooks/useInput"
import styles from "../../styles/experiments.module.css"
import { drawAizawaAttractor2d } from "../../utils/drawAizawaAttractor2d"

const Page: NextPage = () => {
  const windowSize = useWindowSize()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const xField = useInput("0.1")
  const yField = useInput("0.1")
  const zField = useInput("0.1")
  const aField = useInput("0.95")
  const bField = useInput("0.7")
  const cField = useInput("0.6")
  const dField = useInput("3.5")
  const eField = useInput("0.25")
  const fField = useInput("0.1")
  const deltaTField = useInput("0.01")
  const thetaField = useInput("0.1")
  const phiField = useInput("0.1")
  const scaleFactorField = useInput("240")

  const handleClick = () => {
    if (canvasRef.current) {
      drawAizawaAttractor2d(
        canvasRef.current,
        + xField.value,
        + yField.value,
        + zField.value,
        + aField.value,
        + bField.value,
        + cField.value,
        + dField.value,
        + eField.value,
        + fField.value,
        + deltaTField.value,
        + thetaField.value,
        + phiField.value,
        240,
      )
    }
  }

  return (
    <FullWidthLayout>
      <canvas className={styles.canvas} height={windowSize.height} width={windowSize.width} ref={canvasRef}/>
      <main className={styles.main}>
        <h1>2D Aizawa Attractor</h1>
        <div className={styles.inputContainer}>
          <label>x <input type="number" {...xField} /></label>
          <label>y <input type="number" {...yField} /></label>
          <label>z <input type="number" {...zField} /></label>
          <label>a <input type="number" {...aField} /></label>
          <label>b <input type="number" {...bField} /></label>
          <label>c <input type="number" {...cField} /></label>
          <label>d <input type="number" {...dField} /></label>
          <label>e <input type="number" {...eField} /></label>
          <label>f <input type="number" {...fField} /></label>
          <label>delta t <input type="number" {...deltaTField} /></label>
          <label>&theta; <input type="number" {...thetaField} /></label>
          <label>&phi; <input type="number" {...phiField} /></label>
          <label>scale factor <input type="number" {...scaleFactorField} /></label>
          <button type="button" onClick={handleClick}>Send &apos;er, bud.</button>
        </div>
      </main>
    </FullWidthLayout>
  )
}

export default Page
