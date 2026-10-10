import Link from "next/link";
import { useAccount } from "wagmi";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

const IndexPage = () => {
  const { address, isConnected } = useAccount();

  return (
    <Layout title="Decentralized Medical Records">
      <div className={styles.container}>
        <h1>🏥 Decentralized Medical Records</h1>
        <p className={styles.subtitle}>
          Secure, blockchain-based medical record management with patient control
        </p>

        {!isConnected ? (
          <div className={styles.connectPrompt}>
            <h2>Connect Your Wallet</h2>
            <p>
              Please connect your wallet to get started. You can use the RainbowKit
              button in the header.
            </p>
          </div>
        ) : (
          <div className={styles.dashboard}>
            <h2>Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}</h2>

            <div className={styles.cardGrid}>
              <Link href="/patient" className={styles.card}>
                <h3>👤 Patient Dashboard</h3>
                <p>Manage your medical records and grant access to healthcare providers</p>
              </Link>

              <Link href="/doctor" className={styles.card}>
                <h3>👨‍⚕️ Doctor Dashboard</h3>
                <p>Access patient records you have permission to view</p>
              </Link>

              <Link href="/messages" className={styles.card}>
                <h3>💬 Messages</h3>
                <p>Communicate securely with patients and healthcare providers</p>
              </Link>

              <Link href="/about" className={styles.card}>
                <h3>ℹ️ About</h3>
                <p>Learn more about this decentralized system</p>
              </Link>
            </div>

            <div className={styles.features}>
              <h3>Key Features</h3>
              <ul>
                <li>✅ Patient-controlled access permissions</li>
                <li>✅ Time-limited consent for specific records</li>
                <li>✅ Secure messaging between parties</li>
                <li>✅ Immutable audit trail on blockchain</li>
                <li>✅ IPFS-based record storage</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;
