import type { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"
import { MutableRefObject, useCallback, useEffect, useRef } from "react"
import { useWindowSize } from "usehooks-ts"
import { useInput } from "../hooks/useInput"
import styles from "../styles/Home.module.css"
import { drawEnterpriseWindow } from "../utils/drawEnterpriseWindow"
import { generateLSystem } from "../utils/generateLSystem"
import { renderLSystem } from "../utils/renderLSystem"

const Home: NextPage = () => {
  const windowSize = useWindowSize()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cancelAnimationRef: MutableRefObject<number | null> = useRef(null)

  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return

    return drawEnterpriseWindow(canvasRef.current, cancelAnimationRef)
  }, [canvasRef])

  return (
    <>
      <canvas className={styles.canvas} height={windowSize.height} width={windowSize.width} ref={canvasRef}/>
      <main className={styles.main}>
        <div className={styles.titleCard}>
          <h1>Chris Buchert <img src={"/images/chris-glyph-voxels.svg"} alt={"Logo Mark"} className={styles.glyph}/></h1>
          <h2>Software Developer, Cautious Yet Optimistic Android</h2>
          <div className={styles.aboutMe}>
            <p>I&apos;m an engineer, currently based in Utah, USA (America / Denver Time).</p>
            <p>I build web apps, mostly in TypeScript, mostly using React.</p>
            <p>I&apos;m currently kind of grooving on procedural animation.</p>
            <p><Link href="/experiments">Take a look at some past experiments.</Link></p>
          </div>
          <p className={styles.titleLinks}>
            [<Link href="https://www.linkedin.com/in/christianbuchert/">LinkedIn</Link>]
            [<Link href="https://github.com/cbuchert">Github</Link>]
            [<Link href="https://github.com/cbuchert/christianbuchert.com">This page on Github</Link>]
          </p>
        </div>
      </main>
    </>
  )
}


export default Home
