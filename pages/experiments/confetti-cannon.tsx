import type { NextPage } from "next"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"
import { FullWidthLayout } from "../../components/layouts/FullWidthLayout"
import { useInput } from "../../hooks/useInput"
import { shootConfettiCannon } from "../../utils/shootConfettiCannon"
import styles from "../../styles/experiments.module.css"

const ConfettiCanonPage: NextPage = () => {
  const windowSize = useWindowSize()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleCountField = useInput("500")
  const particleLifetimeField = useInput("1000")
  const handleClick = () => {
    if (canvasRef.current) {
      shootConfettiCannon(canvasRef.current, +particleCountField.value, +particleLifetimeField.value)
    }
  }

  return (
    <FullWidthLayout>
      <canvas className={styles.canvas} height={windowSize.height} width={windowSize.width} ref={canvasRef}/>
      <main className={styles.main}>
        <h1>Confetti Cannon</h1>
        <div className={styles.inputContainer}>
          <label>Particle Count <input type={"number"} {...particleCountField}/></label>
          <label>Particle Lifetime (ms) <input type={"number"} {...particleLifetimeField}/></label>
          <button type={"button"} onClick={handleClick}>Send &apos;er, bud.</button>
        </div>
      </main>
    </FullWidthLayout>
  )
}

export default ConfettiCanonPage
