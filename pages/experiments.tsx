import type { NextPage } from "next"
import Link from "next/link"
import { FixedWidthLayout } from "../components/layouts/FixedWidthLayout"

const Experiments: NextPage = (props) => {
  return (<FixedWidthLayout>
    <h1>Experiments</h1>
    <ul>
      <li><Link href="/experiments/l-tree-grass">L-Tree Grass</Link></li>
      <li><Link href="/experiments/lorenz-attractor-2d">2D Lorenz Attractor</Link></li>
    </ul>
  </FixedWidthLayout>)
}

export default Experiments
