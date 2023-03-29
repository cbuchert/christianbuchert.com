import type { NextPage } from "next"
import Link from "next/link"

const Experiments: NextPage = (props) => {
  return (<div>
    <h1>Experiments</h1>
    <ul>
      <li><Link href="/experiments/l-tree-grass">L-Tree Grass</Link></li>
    </ul>
  </div>)
}

export default Experiments
