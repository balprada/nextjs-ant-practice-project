import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LoginPage from './login'

export default function Home() {
  return (
    <div style={{height: "100%", width: "100%"}}>
      <LoginPage />
    </div>
  )
}
