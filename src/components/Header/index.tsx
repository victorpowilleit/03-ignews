import { useState } from 'react'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header (){
  const [activeBtn, setActiveBtn] = useState(true)
  function handleActiveBtn(){
    setActiveBtn(!activeBtn)
  }
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <a className={activeBtn&&styles.active} onClick={handleActiveBtn}>Home</a>
          <a className={!activeBtn&&styles.active} onClick={handleActiveBtn}>Posts</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}