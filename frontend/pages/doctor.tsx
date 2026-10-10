import { useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import Layout from "../components/Layout";
import { CONTRACT_ADDRESSES, ACCESS_CONTROL_MANAGER_ABI, MEDICAL_RECORD_STORAGE_ABI } from "../utils/contracts";
import styles from "../styles/Dashboard.module.css";

const DoctorDashboard = () => {
  const { address, isConnected } = useAccount();
  const [patientAddress, setPatientAddress] = useState("");
  const [recordIndex, setRecordIndex] = useState("0");
  const [accessGranted, setAccessGranted] = useState(false);
  const [recordData, setRecordData] = useState<{ cid: string; category: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Check access
  const { data: hasAccess } = useContractRead({
    address: CONTRACT_ADDRESSES.accessControlManager as `0x${string}`,
    abi: ACCESS_CONTROL_MANAGER_ABI,
    functionName: "hasAccess",
    args: patientAddress ? [patientAddress as `0x${string}`, address as `0x${string}`] : undefined,
  });

  const checkAccess = async (patientAddr: string) => {
    if (!patientAddr || !address) {
      alert("Please enter patient address and connect wallet");
      return;
    }
    // The hasAccess hook will be called automatically
  };

  const getRecord = async () => {
    if (!patientAddress || !recordIndex || !address) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Here you would call the contract to get the record
      // For now, show placeholder
      setRecordData({
        cid: "QmExample123...",
        category: "blood_test",
      });
    } catch (error) {
      console.error("Error fetching record:", error);
      alert("Unable to fetch record. Check permissions.");
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Layout title="Doctor Dashboard">
        <div className={styles.container}>
          <p>Please connect your wallet to access the doctor dashboard.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Doctor Dashboard">
      <div className={styles.container}>
        <h1>👨‍⚕️ Doctor Dashboard</h1>
        <p className={styles.address}>Your Address: {address?.slice(0, 10)}...{address?.slice(-8)}</p>

        <div className={styles.section}>
          <h2>Access Patient Records</h2>
          <p>Enter a patient's address to check if you have access to their records.</p>

          <div className={styles.form}>
            <div className={styles.formGroup}>
              <label>Patient Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={patientAddress}
                onChange={(e) => {
                  setPatientAddress(e.target.value);
                  setAccessGranted(false);
                  setRecordData(null);
                }}
              />
            </div>

            <button
              onClick={() => checkAccess(patientAddress)}
              className={styles.button}
            >
              Check Access
            </button>
          </div>

          {patientAddress && (
            <div className={styles.accessStatus}>
              <h3>Access Status</h3>
              {hasAccess ? (
                <div className={styles.success}>
                  <p>✅ You have access to this patient's records!</p>
                </div>
              ) : (
                <div className={styles.error}>
                  <p>❌ You don't have access to this patient's records.</p>
                  <p>Ask the patient to grant you access from their dashboard.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {hasAccess && (
          <div className={styles.section}>
            <h2>View Patient Records</h2>

            <div className={styles.form}>
              <div className={styles.formGroup}>
                <label>Record Index</label>
                <input
                  type="number"
                  placeholder="0"
                  value={recordIndex}
                  onChange={(e) => setRecordIndex(e.target.value)}
                />
              </div>

              <button
                onClick={getRecord}
                disabled={loading}
                className={styles.button}
              >
                {loading ? "Loading..." : "Fetch Record"}
              </button>
            </div>

            {recordData && (
              <div className={styles.recordCard}>
                <h3>Medical Record</h3>
                <div className={styles.recordContent}>
                  <p>
                    <strong>IPFS CID:</strong> <code>{recordData.cid}</code>
                  </p>
                  <p>
                    <strong>Category:</strong> {recordData.category}
                  </p>
                  <p>
                    <strong>Patient:</strong> {patientAddress.slice(0, 10)}...{patientAddress.slice(-8)}
                  </p>
                  <button className={styles.secondaryButton}>
                    <a href={`https://gateway.pinata.cloud/ipfs/${recordData.cid}`} target="_blank" rel="noopener noreferrer">
                      View on IPFS Gateway
                    </a>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={styles.section}>
          <h2>How to Get Access</h2>
          <ol>
            <li>Share your wallet address with the patient</li>
            <li>Patient grants you access from their Patient Dashboard</li>
            <li>Come back here and check your access</li>
            <li>View the patient's records once access is granted</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
