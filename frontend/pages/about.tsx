import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

const AboutPage = () => (
  <Layout title="About | Decentralized Medical Records">
    <div className={styles.container}>
      <h1>About Decentralized Medical Records</h1>

      <div className={styles.section}>
        <h2>What is This?</h2>
        <p>
          This is a blockchain-based, decentralized medical record management system
          that puts patients in control of their healthcare data. Unlike traditional
          centralized systems, here patients own and manage their records on the blockchain.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Patient Control:</strong> Patients decide who can access their records
          </li>
          <li>
            <strong>Time-Limited Permissions:</strong> Grant access for specific durations
          </li>
          <li>
            <strong>Granular Consent:</strong> Allow access to specific records, not all data
          </li>
          <li>
            <strong>Secure Messaging:</strong> Built-in communication between patients and providers
          </li>
          <li>
            <strong>Immutable Audit Trail:</strong> All actions recorded on blockchain
          </li>
          <li>
            <strong>IPFS Storage:</strong> Records stored decentralized, only hashes on-chain
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>How It Works</h2>
        <ol>
          <li>
            <strong>Patients Upload Records:</strong> Store medical record hashes (CIDs)
            from IPFS on the blockchain
          </li>
          <li>
            <strong>Grant Access:</strong> Use AccessControlManager or ConsentManager
            to grant healthcare providers time-limited access
          </li>
          <li>
            <strong>Doctors View Records:</strong> Doctors can only access records
            they have explicit permission for
          </li>
          <li>
            <strong>Revoke Anytime:</strong> Patients can revoke access at any time
          </li>
          <li>
            <strong>Communicate Securely:</strong> Use MessageInbox for secure messaging
          </li>
        </ol>
      </div>

      <div className={styles.section}>
        <h2>Smart Contracts</h2>
        <p>The system consists of 4 main smart contracts:</p>
        <ul>
          <li>
            <strong>AccessControlManager:</strong> Simple time-limited access to all records
          </li>
          <li>
            <strong>ConsentManager:</strong> Fine-grained, per-record access control
          </li>
          <li>
            <strong>MedicalRecordStorage:</strong> Stores record CIDs and manages access
          </li>
          <li>
            <strong>MessageInbox:</strong> Secure messaging between users
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Privacy & Security</h2>
        <p>
          Your full medical records are stored on IPFS (decentralized storage), not on
          the blockchain. Only the IPFS content hashes are stored on-chain, along with
          access control information. This means:
        </p>
        <ul>
          <li>Your sensitive data is not exposed on the public blockchain</li>
          <li>Only you control who can access your records</li>
          <li>Every access is logged for audit purposes</li>
          <li>You can revoke access instantly</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Get Started</h2>
        <p>
          <Link href="/">
            Go to the home page
          </Link>
          {" "} and connect your wallet using RainbowKit to start using the system.
        </p>
      </div>
    </div>
  </Layout>
);

export default AboutPage;
