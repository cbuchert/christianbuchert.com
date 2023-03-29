import type { NextPage } from "next"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"
import { useInput } from "../../hooks/useInput"
import styles from "../../styles/experiments.module.css"
import { generateLSystem } from "../../utils/generateLSystem"
import { renderLSystem } from "../../utils/renderLSystem"

const Page: NextPage = () => {
  const windowSize = useWindowSize()
  const axiomInput = useInput("X")
  const rules = new Map([ [ "X", "F+[[X]-X]-F[-FX]+X" ], [ "F", "FF" ] ])
  const depthInput = useInput("6")
  const angleInput = useInput("25")
  const angleJitterInput = useInput("5")
  const lengthInput = useInput("6")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleClick = () => {
    if (canvasRef.current) {
      const lSystemString = generateLSystem(axiomInput.value, rules, + depthInput.value)

      renderLSystem(canvasRef.current, lSystemString, 5, + angleInput.value, + angleJitterInput.value, + lengthInput.value)
    }
  }

  return (
    <>
      <canvas className={styles.canvas} height={windowSize.height} width={windowSize.width} ref={canvasRef}/>
      <main className={styles.main}>
        <h1>Grass L-Tree</h1>
        <div className={styles.inputContainer}>
          <label>Depth <input type="text"  {...depthInput} /></label>
          <label>Angle <input type="text"  {...angleInput} /></label>
          <label>Angle Jitter <input type="text"  {...angleJitterInput} /></label>
          <label>Segment Length <input type="text"  {...lengthInput} /></label>
          <button type={"button"} onClick={handleClick}>Send &apos;er, bud.</button>
        </div>
      </main>
    </>
  )
}

export default Page

