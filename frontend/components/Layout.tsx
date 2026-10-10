import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/Layout.module.css";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Decentralized Medical Records" }: Props) => (
  <div className={styles.layout}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Decentralized medical record management system" />
    </Head>
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          🏥 Medical Records
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/patient">Patient</Link>
          <Link href="/doctor">Doctor</Link>
          <Link href="/messages">Messages</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className={styles.connect}>
          <ConnectButton />
        </div>
      </div>
    </header>
    <main className={styles.main}>{children}</main>
    <footer className={styles.footer}>
      <p>🔗 Decentralized Medical Records System | Built with Blockchain & IPFS</p>
    </footer>
  </div>
);

export default Layout;
