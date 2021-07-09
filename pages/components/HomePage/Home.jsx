import Head from 'next/head'
import Link from 'next/link'
import styles from './home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Daily UI challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to John's <a href="https://daily-react-ui-challenge.vercel.app/">Daily React UI challenge</a>
        </h1>

        <div className={styles.grid}>
          <Link href="/SignUpPage">
            <a className={styles.card}>
              <h3>Sign Up Page</h3>
              <p>Demo navigation with links.</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
