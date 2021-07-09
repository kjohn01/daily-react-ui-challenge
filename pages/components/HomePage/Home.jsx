import Head from 'next/head'
import Link from 'next/link'
import { Navbar, Container } from 'react-bootstrap'
import styles from './home.module.scss'
import MediaCard from '../MediaCard/MediaCard'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Daily UI challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navbar>
          <Container>
            <Navbar.Brand className={styles.title} href="https://daily-react-ui-challenge.vercel.app/">
              <img
                alt="logo"
                src="/logo.svg"
                with="100"
                height="100"
                className={styles.logo}
              />
              <h3>Daily React UI challenge</h3>
            </Navbar.Brand>
          </Container>
        </Navbar>

        <Container className={styles.grid}>
          <Link href="/SignUpPage">
            <a className={styles.card}>
              <MediaCard 
                title="SignUpPage" 
                description="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica" 
                img="https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              />
            </a>
          </Link>
        </Container>

        <footer className={styles.footer}>
          <p>Daily UI Logo designed by <a href="https://collectui.com/designers/CatherineWang">Catherine Wang</a>.</p>
        </footer>
      </main>
    </div>
  )
}
