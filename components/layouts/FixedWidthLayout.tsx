import type { FC, ReactNode } from "react"
import Header from "./Header"
import styles from "./FixedWidthLayout.module.css"

type Props = {
  children: ReactNode;
};

export const FixedWidthLayout: FC<Props> = ({children}) => {
  return (
    <div className={styles.layout}>
      <Header/>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};
