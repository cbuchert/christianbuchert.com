import type { NextPage } from "next"
import Link from "next/link"
import { useRef } from "react"
import { useWindowSize } from "usehooks-ts"
import { useInput } from "../hooks/useInput"
import styles from "../styles/Home.module.css"
import { generateLSystem } from "../utils/generateLSystem"
import { renderLSystem } from "../utils/renderLSystem"

const Home: NextPage = () => {
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
        <div className={styles.titleCard}>
          <h1>Chris Buchert</h1>
          <h2>Software Developer, Cautious Yet Optimistic Android</h2>
          <div className={styles.aboutMe}>
            <p>I&apos;m an engineer, currently based in Utah, USA (America / Denver Time).</p>
            <p>I build web apps, mostly in TypeScript, mostly using React.</p>
            <p><Link href="/experiments">Take a look at some past experiments.</Link></p>
          </div>
          <p className={styles.titleLinks}>
            [<Link href="https://www.linkedin.com/in/christianbuchert/">LinkedIn</Link>]
            [<Link href="https://github.com/cbuchert">Github</Link>]
            [<Link href="https://github.com/cbuchert/christianbuchert.com">This page on Github</Link>]
          </p>
        </div>
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


export default Home
