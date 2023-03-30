import Link from "next/link"
import { FC } from "react"
import styles from "./Header.module.css"

type Props = {};

const Header: FC<Props> = (props) => {
  return (
    <header className={styles.header}>
      <h1><Link href={"/"}>Chris Buchert</Link></h1>
    </header>
  )
}

export default Header
