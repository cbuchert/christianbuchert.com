import type { NextPage } from "next"
import Link from "next/link"
import { FixedWidthLayout } from "../components/layouts/FixedWidthLayout"
import styles from "../styles/experiments.module.css"

const Experiments: NextPage = (props) => {
  return (<FixedWidthLayout>
    <h1 className={styles.heading}>Experiments</h1>
    <ul className={styles.links}>
      <li><Link href="/experiments/l-tree-grass">L-Tree Grass</Link></li>
      <li><Link href="/experiments/lorenz-attractor-2d">2D Lorenz Attractor</Link></li>
    </ul>
  </FixedWidthLayout>)
}

export default Experiments
