import classNames from "classnames"
import type { NextPage } from "next"
import { FullWidthLayout } from "../../components/layouts/FullWidthLayout"
import styles from "../../styles/experiments.module.css"
import { simulateGravity } from "../../utils/simulateGravity"

const Page: NextPage = () => {
  const handleClick = () => {
    const allGravityElements = [ ...document.querySelectorAll(".gravity-element") ].filter(element => element instanceof HTMLElement) as HTMLElement[]

    simulateGravity(allGravityElements)
  }

  return (
    <FullWidthLayout>
      <main className={styles.main}>
        <div>
        <h1 className={"gravity-element"}>Gravity</h1>
          <p className={"gravity-element"}>Mom&apos;s spaghetti.</p>
        </div>
        <div className={classNames(styles.inputContainer, "gravity-element")}>
          <button type={"button"} onClick={handleClick} >One shot.</button>
        </div>
      </main>
    </FullWidthLayout>
  )
}

export default Page
