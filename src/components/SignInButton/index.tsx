import { useState } from 'react';
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton(){
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  function handleIsLoggedIn(){
    setIsLoggedIn(!isLoggedIn)
  }
  // const isLoggedIn = true;
  return isLoggedIn ? (
    <button type="button" className={styles.signInButton} onClick={handleIsLoggedIn}>
    <FaGithub color="#04D361"/>
      Victor Powilleit
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={handleIsLoggedIn}>
    <FaGithub color="#EBA417"/>
      Sign in with Github
    </button>
  )
}