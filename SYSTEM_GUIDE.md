# 🏥 Decentralized Medical Records System - Complete Guide

## Overview

This is a complete decentralized medical record management system with smart contracts on the Ethereum blockchain and a modern web3 frontend. The system gives patients complete control over their medical data.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│  ┌──────────────┬──────────────┬──────────────┐          │
│  │   Patient    │    Doctor    │   Messages   │          │
│  │  Dashboard   │  Dashboard   │   Interface  │          │
│  └──────────────┴──────────────┴──────────────┘          │
│         ↓              ↓              ↓                   │
│  ┌────────────────────────────────────────────┐         │
│  │      Wagmi + ethers.js (Web3 Layer)       │         │
│  └────────────────────────────────────────────┘         │
└────────────────┬──────────────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    ↓                         ↓
┌──────────────────┐  ┌──────────────────┐
│ Smart Contracts  │  │   IPFS Storage   │
│   (Hardhat)      │  │  (Off-chain)     │
│ ┌──────────────┐ │  │                  │
│ │AccessControl │ │  │ Full medical     │
│ │ Manager      │ │  │ records stored   │
│ │              │ │  │ decentralized    │
│ ├──────────────┤ │  └──────────────────┘
│ │ConsentManager│ │
│ │              │ │
│ ├──────────────┤ │
│ │MedicalRecord │ │
│ │Storage       │ │
│ │              │ │
│ ├──────────────┤ │
│ │MessageInbox  │ │
│ └──────────────┘ │
└──────────────────┘
```

## Getting Started

### 1. Deploy Smart Contracts

```bash
cd contracts
npm install
npx hardhat run scripts/deploy.js --network hardhat
```

**Deployed Contracts:**
- AccessControlManager: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- ConsentManager: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- MedicalRecordStorage: `0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9`
- MessageInbox: `0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`

### 2. Start Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Visit http://localhost:3000

## Smart Contracts Explained

### AccessControlManager
**Purpose:** Simple, time-limited access control for all patient records.

**Key Functions:**
```solidity
// Grant doctor access for X seconds
grantAccess(address doctor, uint256 durationInSeconds)

// Immediately revoke access
revokeAccess(address doctor)

// Check if doctor has access
hasAccess(address patient, address doctor) → bool
```

**Use Case:** Patient grants Dr. Smith 24-hour access to view all their records.

---

### ConsentManager
**Purpose:** Fine-grained, per-record consent with temporal control.

**Key Functions:**
```solidity
// Grant access to specific record
grantAccess(address accessor, uint256 recordId, uint256 durationInSeconds)

// Revoke access to specific record
revokeAccess(address accessor, uint256 recordId)

// Check if accessor can view specific record
hasAccess(address patient, address accessor, uint256 recordId) → bool
```

**Use Case:** Patient grants Dr. Smith 7-day access to blood test records only.

**Events:**
- `AccessGranted(patient, accessor, recordId, expiresAt)`
- `AccessRevoked(patient, accessor, recordId)`

---

### MedicalRecordStorage
**Purpose:** Stores medical record references and enforces access control.

**Key Data Structure:**
```solidity
struct MedicalRecord {
    string cid;        // IPFS content hash
    string category;   // blood_test, xray, prescription, etc.
}
```

**Key Functions:**
```solidity
// Add new medical record
addRecord(string cid, string category)

// Retrieve record (with access check)
getRecord(address patient, uint index) → (cid, category)
```

**Flow:**
1. Patient uploads full medical record to IPFS
2. Gets back a CID (e.g., `QmXxxx...`)
3. Stores CID on blockchain via `addRecord()`
4. Doctor can only call `getRecord()` if they have access

---

### MessageInbox
**Purpose:** Secure messaging between patients and healthcare providers.

**Key Functions:**
```solidity
// Send message to user
sendMessage(address to, string content)

// Get all messages sent to caller
getMessages() → Message[]

// Get specific message by index
getMessageByIndex(uint index) → Message

// Get total message count
getMessageCount() → uint
```

**Message Structure:**
```solidity
struct Message {
    address sender;
    string content;
    uint256 timestamp;
}
```

## Frontend Workflow

### For Patients

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Sign message with your wallet

2. **Upload Medical Records**
   - Get IPFS CID from your storage solution (Pinata, NFT.storage, etc.)
   - Go to Patient Dashboard → My Records
   - Enter CID and category
   - Click "Upload Record"

3. **Grant Access**
   - **Option A (General Access):** Patient Dashboard → General Access
     - Enter doctor's address
     - Select duration (1 hour, 1 day, 1 week, 30 days)
     - Click "Grant Access"
   
   - **Option B (Record-Specific):** Patient Dashboard → Record-Specific Consent
     - Enter doctor's address
     - Enter record index
     - Select duration
     - Click "Grant Record Access"

4. **Revoke Access**
   - Patient Dashboard → General Access → Revoke Access
   - Enter doctor's address
   - Click "Revoke Access"

5. **Send Messages**
   - Go to Messages page
   - Enter recipient address
   - Type message
   - Click "Send Message"

### For Doctors

1. **Connect Wallet**
   - Use your doctor wallet address

2. **Request Access**
   - Ask patient to grant you access
   - Share your wallet address with patient

3. **Check Access**
   - Go to Doctor Dashboard
   - Enter patient's address
   - Click "Check Access"
   - System shows if you have permission

4. **View Records**
   - If you have access, enter record index
   - Click "Fetch Record"
   - View IPFS CID and category
   - Click link to view full record on IPFS

5. **Receive Messages**
   - Go to Messages page
   - View all messages sent to you
   - Click refresh to get latest

## Data Privacy & Security

### On-Chain vs Off-Chain

**On-Chain (Blockchain):**
- Access control permissions
- Medical record metadata (CID, category)
- Message history
- Account addresses
- Transaction history

**Off-Chain (IPFS):**
- Full medical record content
- Patient sensitive data
- Encrypted payloads (optional)

**Benefits:**
✅ Sensitive data not exposed publicly
✅ Immutable access audit trail
✅ Patient controls all access
✅ Censorship-resistant
✅ No central authority

### Permission Expiry

All permissions are time-limited:
- 1 hour: For urgent consultations
- 1 day: For routine check-ups
- 1 week: For ongoing treatment
- 30 days: For long-term care

After expiry, permission automatically revokes. No extension needed.

## Development Guide

### Adding New Features

#### 1. New Smart Contract Function
```solidity
// In MedicalRecordStorage.sol
function shareRecord(address recipient, uint256 recordId) external {
    // Implementation
}
```

#### 2. Update ABI in Frontend
```typescript
// In utils/contracts.ts
export const MEDICAL_RECORD_STORAGE_ABI = [
  // ... existing functions
  {
    inputs: [
      { name: "recipient", type: "address" },
      { name: "recordId", type: "uint256" }
    ],
    name: "shareRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
```

#### 3. Use in Component
```typescript
const { write: shareRecord } = useContractWrite({
  address: CONTRACT_ADDRESSES.medicalRecordStorage,
  abi: MEDICAL_RECORD_STORAGE_ABI,
  functionName: "shareRecord",
});

shareRecord({
  args: [recipientAddress, recordId]
});
```

### Testing Smart Contracts

```bash
cd contracts
npx hardhat test
```

### Deploying to Testnet

Edit `hardhat.config.ts`:
```typescript
networks: {
  sepolia: {
    url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
    accounts: [process.env.PRIVATE_KEY!]
  }
}
```

Deploy:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Common Issues & Solutions

### Issue: "Cannot connect to network localhost"
**Solution:** Make sure hardhat node is running:
```bash
npx hardhat node
```

### Issue: "User rejected transaction"
**Solution:** 
- Check wallet connection
- Verify you're on correct network
- Check wallet balance for gas

### Issue: "Record not found" when fetching
**Solution:**
- Verify correct patient address
- Check record index is valid (starts at 0)
- Ensure you have access permission

### Issue: Contract not found at address
**Solution:**
- Verify you're on the correct network
- Check contract addresses in `utils/contracts.ts`
- Redeploy contracts if needed

## Security Best Practices

1. **Never share private keys** - Only share wallet address
2. **Verify addresses** - Double-check before granting access
3. **Use time limits** - Don't grant indefinite access
4. **Revoke regularly** - Revoke access you no longer need
5. **Monitor messages** - Check for suspicious requests
6. **Update software** - Keep dependencies updated

## Future Enhancements

- [ ] Integration with major IPFS providers (Pinata, NFT.storage)
- [ ] Encrypted message content
- [ ] Audit dashboard for patients
- [ ] Access request system (doctors request, patients approve)
- [ ] Multi-signature requirements
- [ ] Bulk operations
- [ ] Role-based access (specialist types)
- [ ] Integration with medical IoT devices
- [ ] Decentralized identity (DID) support

## Resources

- [Hardhat Documentation](https://hardhat.org)
- [Next.js Documentation](https://nextjs.org)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://rainbowkit.com)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com)
- [IPFS Documentation](https://docs.ipfs.io)

## License

MIT License - See LICENSE files in both contracts/ and frontend/ directories

## Support

For issues, questions, or contributions, please open an issue or pull request.

---

**Built with ❤️ for decentralized healthcare**
