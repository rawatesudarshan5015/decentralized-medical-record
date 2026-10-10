import { useState } from "react";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import Layout from "../components/Layout";
import { CONTRACT_ADDRESSES, ACCESS_CONTROL_MANAGER_ABI, CONSENT_MANAGER_ABI } from "../utils/contracts";
import styles from "../styles/Dashboard.module.css";

const PatientDashboard = () => {
  const { address, isConnected } = useAccount();
  const [doctorAddress, setDoctorAddress] = useState("");
  const [duration, setDuration] = useState("86400"); // 1 day default
  const [recordId, setRecordId] = useState("");
  const [recordCID, setRecordCID] = useState("");
  const [recordCategory, setRecordCategory] = useState("");
  const [activeTab, setActiveTab] = useState<"access" | "records" | "consent">("access");

  // Grant access via AccessControlManager
  const { write: grantAccess } = useContractWrite({
    address: CONTRACT_ADDRESSES.accessControlManager as `0x${string}`,
    abi: ACCESS_CONTROL_MANAGER_ABI,
    functionName: "grantAccess",
  });

  // Revoke access
  const { write: revokeAccess } = useContractWrite({
    address: CONTRACT_ADDRESSES.accessControlManager as `0x${string}`,
    abi: ACCESS_CONTROL_MANAGER_ABI,
    functionName: "revokeAccess",
  });

  // Grant consent for specific record
  const { write: grantConsent } = useContractWrite({
    address: CONTRACT_ADDRESSES.consentManager as `0x${string}`,
    abi: CONSENT_MANAGER_ABI,
    functionName: "grantAccess",
  });

  const handleGrantAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorAddress || !duration) {
      alert("Please fill in all fields");
      return;
    }
    grantAccess({
      args: [doctorAddress as `0x${string}`, BigInt(parseInt(duration))],
    });
    setDoctorAddress("");
    setDuration("86400");
  };

  const handleRevokeAccess = () => {
    if (!doctorAddress) {
      alert("Please enter doctor address");
      return;
    }
    revokeAccess({
      args: [doctorAddress as `0x${string}`],
    });
  };

  const handleGrantConsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorAddress || !recordId || !duration) {
      alert("Please fill in all fields");
      return;
    }
    grantConsent({
      args: [doctorAddress as `0x${string}`, BigInt(parseInt(recordId)), BigInt(parseInt(duration))],
    });
    setDoctorAddress("");
    setRecordId("");
    setDuration("86400");
  };

  if (!isConnected) {
    return (
      <Layout title="Patient Dashboard">
        <div className={styles.container}>
          <p>Please connect your wallet to access the patient dashboard.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Patient Dashboard">
      <div className={styles.container}>
        <h1>👤 Patient Dashboard</h1>
        <p className={styles.address}>Account: {address?.slice(0, 10)}...{address?.slice(-8)}</p>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "access" ? styles.active : ""}`}
            onClick={() => setActiveTab("access")}
          >
            General Access
          </button>
          <button
            className={`${styles.tab} ${activeTab === "consent" ? styles.active : ""}`}
            onClick={() => setActiveTab("consent")}
          >
            Record-Specific Consent
          </button>
          <button
            className={`${styles.tab} ${activeTab === "records" ? styles.active : ""}`}
            onClick={() => setActiveTab("records")}
          >
            My Records
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === "access" && (
            <div className={styles.section}>
              <h2>Grant General Access</h2>
              <p>Allow a healthcare provider to access all your records for a limited time.</p>
              
              <form onSubmit={handleGrantAccess} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Healthcare Provider Address</label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={doctorAddress}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Duration (seconds)</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="3600">1 Hour</option>
                    <option value="86400">1 Day</option>
                    <option value="604800">1 Week</option>
                    <option value="2592000">30 Days</option>
                  </select>
                </div>

                <button type="submit" className={styles.button}>
                  Grant Access
                </button>
              </form>

              <div className={styles.section}>
                <h3>Revoke Access</h3>
                <p>Immediately revoke access for a healthcare provider.</p>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Provider address to revoke"
                    value={doctorAddress}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleRevokeAccess}
                  className={`${styles.button} ${styles.danger}`}
                >
                  Revoke Access
                </button>
              </div>
            </div>
          )}

          {activeTab === "consent" && (
            <div className={styles.section}>
              <h2>Grant Specific Record Access</h2>
              <p>Grant access to specific records with fine-grained control.</p>

              <form onSubmit={handleGrantConsent} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Healthcare Provider Address</label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={doctorAddress}
                    onChange={(e) => setDoctorAddress(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Record ID</label>
                  <input
                    type="number"
                    placeholder="e.g., 0"
                    value={recordId}
                    onChange={(e) => setRecordId(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Duration (seconds)</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    <option value="3600">1 Hour</option>
                    <option value="86400">1 Day</option>
                    <option value="604800">1 Week</option>
                    <option value="2592000">30 Days</option>
                  </select>
                </div>

                <button type="submit" className={styles.button}>
                  Grant Record Access
                </button>
              </form>
            </div>
          )}

          {activeTab === "records" && (
            <div className={styles.section}>
              <h2>Upload Medical Record</h2>
              <p>Add a new medical record (IPFS CID required)</p>

              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label>IPFS CID</label>
                  <input
                    type="text"
                    placeholder="QmXxxx..."
                    value={recordCID}
                    onChange={(e) => setRecordCID(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select value={recordCategory} onChange={(e) => setRecordCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="blood_test">Blood Test</option>
                    <option value="xray">X-Ray</option>
                    <option value="prescription">Prescription</option>
                    <option value="notes">Doctor Notes</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button type="submit" className={styles.button}>
                  Upload Record
                </button>
              </form>

              <div className={styles.info}>
                <p>💡 Records are stored on IPFS. You only store the CID (hash) on the blockchain.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
