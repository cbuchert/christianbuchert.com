import type { FC, ReactNode } from "react"
import styles from "./FullWidthLayout.module.css"
import Header from "./Header"

type Props = {
  children: ReactNode
};

export const FullWidthLayout: FC<Props> = ({ children }) => {

  return (
    <div className={styles.layout}>
      <Header/>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
