
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navbar, Container } from 'react-bootstrap';
import styles from './home.module.scss';
import MediaCard from '../MediaCard/MediaCard';
import Footer from '../Footer/Footer';

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
          <Link href="/TodoListPage">
            <a className={styles.card}>
              <MediaCard 
                title="Todo List" 
                description="A simple todo list with custom css animation, using the useReducer hook and context API to manage the states in the local cache." 
                img="https://cdn.dribbble.com/users/821812/screenshots/3967195/todoanim.gif"
              />
            </a>
          </Link>
          <Link href="/CalculatorPage">
            <a className={styles.card}>
              <MediaCard 
                title="Calculator" 
                description="A clone of the iphone calculator with equation showing. Event delegation is implemented for button event binding." 
                img="https://cdn.dribbble.com/users/85529/screenshots/2377589/calculator.png"
              />
            </a>
          </Link>
        </Container>

        <Footer 
          className="position-relative d-block" 
          text="Daily UI Logo designed by" 
          link="https://collectui.com/designers/CatherineWang" author="Catherine Wang" 
        />
      </main>
    </div>
  )
}
