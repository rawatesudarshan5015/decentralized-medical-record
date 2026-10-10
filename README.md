# 🏥 Decentralized Medical Records - Complete System

A blockchain-based decentralized medical record management system where patients control their data.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Quick Start](#quick-start)
4. [Smart Contracts](#smart-contracts)
5. [Frontend Application](#frontend-application)
6. [Usage Guide](#usage-guide)
7. [Deployment](#deployment)

---

## Project Overview

This project implements a complete decentralized healthcare system where:

✅ **Patients own their medical records**
✅ **Doctors request access, patients grant it**
✅ **Access is time-limited and revocable**
✅ **Full records stored on IPFS (private)**
✅ **Only hashes stored on blockchain (public)**
✅ **Secure messaging built-in**
✅ **Complete audit trail on blockchain**

### Problem Solved
Traditional medical systems have security and privacy issues:
- Centralized data breaches
- Limited patient control
- Medical data sold to third parties
- Complex access management

This solution:
- Decentralized data storage (IPFS)
- Patient-controlled permissions
- Transparent access logging
- Smart contract enforcement

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│            User Interface (Next.js)                 │
│   Dashboard | Records | Access | Messages           │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ↓                         ↓
  ┌──────────────────┐    ┌──────────────┐
  │ Smart Contracts  │    │ IPFS Storage │
  │ (Blockchain)     │    │ (Off-chain)  │
  │                  │    │              │
  │ • Access Control │    │ Medical      │
  │ • Permissions    │    │ Records      │
  │ • Messaging      │    │              │
  └──────────────────┘    └──────────────┘
```

---

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- MetaMask or Web3 wallet
- Git

### Step 1: Clone & Install
```bash
git clone <repo>
cd decentralized-medical-record

# Install contracts
cd contracts
npm install

# Install frontend
cd ../frontend
npm install --legacy-peer-deps
```

### Step 2: Deploy Contracts
```bash
cd contracts
npx hardhat run scripts/deploy.js --network hardhat
```

**Deployed Addresses:**
```
AccessControlManager: 0x5FbDB2315678afecb367f032d93F642f64180aa3
ConsentManager: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
MedicalRecordStorage: 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
MessageInbox: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

### Step 3: Start Frontend
```bash
cd frontend
npm run dev
```

Visit: http://localhost:3000

---

## Smart Contracts

### 1. AccessControlManager ✅
**Simple, global access control**

```solidity
// Grant 24-hour access
grantAccess(0xDoctorAddress, 86400)

// Revoke access
revokeAccess(0xDoctorAddress)

// Check if doctor has access
hasAccess(0xPatientAddress, 0xDoctorAddress) → true/false
```

**Use Case:** "Dr. Smith, you can see all my records for 24 hours"

---

### 2. ConsentManager ✅
**Fine-grained, per-record consent**

```solidity
// Grant access to specific record only
grantAccess(0xDoctorAddress, 0, 604800) // 7 days for record #0

// Revoke access to specific record
revokeAccess(0xDoctorAddress, 0)

// Check record-level permission
hasAccess(0xPatientAddress, 0xDoctorAddress, 0) → true/false
```

**Use Case:** "Dr. Smith, you can see my blood test results for 7 days only"

---

### 3. MedicalRecordStorage ✅
**Stores and manages medical record references**

```solidity
// Upload new record
addRecord("QmXxxx...", "blood_test")

// Retrieve record (if authorized)
getRecord(0xPatientAddress, 0) → ("QmXxxx...", "blood_test")
```

**Data Flow:**
1. Patient uploads file to IPFS → Gets CID
2. Stores CID on blockchain
3. Doctor retrieves CID → Views on IPFS gateway

---

### 4. MessageInbox ✅
**Secure messaging system**

```solidity
// Send message
sendMessage(0xRecipient, "Please review my latest blood work")

// Get all messages
getMessages() → [Message[], ...]

// Get specific message
getMessageByIndex(0) → Message
```

**Features:**
- Timestamp included
- Immutable records
- On-chain proof of communication

---

## Frontend Application

### Pages Built

| Page | Features | Status |
|------|----------|--------|
| `/` | Home, dashboard, navigation | ✅ Complete |
| `/patient` | Grant/revoke access, upload records | ✅ Complete |
| `/doctor` | Check access, view records | ✅ Complete |
| `/messages` | Send/receive secure messages | ✅ Complete |
| `/about` | System information | ✅ Complete |

### Technology Stack
- **Framework:** Next.js 15
- **Language:** TypeScript
- **Web3:** Wagmi + ethers.js
- **Wallet:** RainbowKit
- **Styling:** CSS Modules

### Key Components

**Header/Navigation:**
- Logo and navigation links
- RainbowKit wallet connect button
- Responsive design

**Patient Dashboard:**
- Tabs for different features
- Grant/revoke access forms
- Record upload interface
- Duration selectors

**Doctor Dashboard:**
- Access verification
- Record retrieval
- IPFS gateway links
- Status indicators

**Messages:**
- Send message form
- Inbox with message list
- Timestamp display
- Refresh functionality

---

## Usage Guide

### As a Patient

#### 1. Connect Wallet
1. Click "Connect Wallet" in header
2. Choose wallet (MetaMask, WalletConnect, etc.)
3. Sign message to verify ownership

#### 2. Upload Medical Record
1. Go to Patient Dashboard → My Records
2. Prepare record on IPFS (Pinata, NFT.storage, etc.)
3. Get IPFS CID (e.g., QmXxxx...)
4. Enter CID and select category
5. Click "Upload Record"

#### 3. Grant Access (Option A: General)
1. Go to Patient Dashboard → General Access
2. Enter doctor's wallet address
3. Select duration:
   - 1 Hour: For urgent consultations
   - 1 Day: For routine check-ups
   - 1 Week: For ongoing treatment
   - 30 Days: For long-term care
4. Click "Grant Access"
5. Confirm transaction in wallet

#### 4. Grant Access (Option B: Record-Specific)
1. Go to Patient Dashboard → Record-Specific Consent
2. Enter doctor's address
3. Enter record index (0, 1, 2, etc.)
4. Select duration
5. Click "Grant Record Access"

#### 5. Revoke Access
1. Go to Patient Dashboard → General Access
2. Enter doctor's address to revoke
3. Click "Revoke Access"
4. Confirm transaction

#### 6. Send Message
1. Go to Messages page
2. Enter recipient's address
3. Type message
4. Click "Send Message"

### As a Doctor

#### 1. Connect Wallet
1. Use your doctor wallet address
2. Click "Connect Wallet"
3. Sign verification message

#### 2. Request Access
1. Share your wallet address with patient
2. Ask patient to grant you access
3. Patient follows "Grant Access" steps

#### 3. Verify Access
1. Go to Doctor Dashboard
2. Enter patient's address
3. Click "Check Access"
4. See if you have permission

#### 4. View Records
1. If you have access:
2. Go to Doctor Dashboard → View Patient Records
3. Enter patient address (should be pre-filled)
4. Enter record index (starting at 0)
5. Click "Fetch Record"
6. View IPFS CID and category
7. Click link to view on IPFS gateway

#### 5. Receive Messages
1. Go to Messages page
2. View all messages sent to you
3. See sender and timestamp
4. Click refresh to get latest

---

## Deployment

### Development
```bash
# Terminal 1: Start blockchain node
cd contracts
npx hardhat run scripts/deploy.js --network hardhat

# Terminal 2: Start frontend
cd frontend
npm run dev
```

### Testnet (Sepolia)
```bash
# 1. Update hardhat.config.ts with RPC URL and private key
# 2. Deploy contracts
cd contracts
npx hardhat run scripts/deploy.js --network sepolia

# 3. Update contract addresses in frontend/utils/contracts.ts
# 4. Run frontend
cd frontend
npm run dev
```

### Production (Mainnet)
```bash
# 1. Ensure contracts are audited
# 2. Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet

# 3. Deploy frontend to Vercel
vercel deploy --prod
```

---

## File Structure

```
decentralized-medical-record/
├── contracts/
│   ├── contracts/
│   │   ├── AccessControlManager.sol
│   │   ├── ConsentManager.sol
│   │   ├── MedicalRecordStorage.sol
│   │   └── MessageInbox.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── hardhat.config.ts
│   └── package.json
│
├── frontend/
│   ├── pages/
│   │   ├── _app.tsx (Web3 setup)
│   │   ├── index.tsx (Home)
│   │   ├── patient.tsx (Patient dashboard)
│   │   ├── doctor.tsx (Doctor dashboard)
│   │   ├── messages.tsx (Messaging)
│   │   └── about.tsx (Info)
│   │
│   ├── components/
│   │   └── Layout.tsx (Header, nav, footer)
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── Layout.module.css
│   │   ├── Home.module.css
│   │   └── Dashboard.module.css
│   │
│   ├── utils/
│   │   └── contracts.ts (ABIs & addresses)
│   │
│   └── package.json
│
└── README.md (this file)
```

---

## Key Features

### Security
✅ Patient controls all permissions
✅ Time-limited access (auto-expires)
✅ Revocable at any time
✅ Immutable audit trail
✅ No central authority

### Privacy
✅ Full records on IPFS (private)
✅ Only hashes on blockchain
✅ Patient data not exposed
✅ Encrypted messaging support
✅ Zero-knowledge proofs (future)

### Usability
✅ Simple web interface
✅ Wallet connection via RainbowKit
✅ Clear permission status
✅ Easy access revocation
✅ Built-in messaging

---

## Troubleshooting

### Contract Issues

**"Cannot connect to network"**
- Ensure hardhat node is running
- Check RPC URL in hardhat.config.ts
- Verify network configuration

**"Access denied" error**
- Check if you have permission
- Verify permission hasn't expired
- Ask patient to grant access

**"Contract not found"**
- Verify contract addresses
- Ensure deployment completed
- Check you're on correct network

### Frontend Issues

**"Wallet won't connect"**
- Clear browser cache
- Try different wallet
- Check network settings
- Disable browser extensions

**"Can't submit transaction"**
- Check account balance
- Verify gas price
- Confirm network is correct
- Sign transaction in wallet

**"Records not showing"**
- Verify patient address
- Check record index
- Ensure you have access
- Try refreshing page

---

## Advanced Features (Future)

- [ ] Access request system (doctors request, patients approve)
- [ ] Encrypted medical records
- [ ] Multi-signature approvals
- [ ] Role-based access (specialist types)
- [ ] Automated compliance (HIPAA, GDPR)
- [ ] Medical device integration
- [ ] Insurance integration
- [ ] Decentralized ID (DID)

---

## Performance & Scalability

### Current Limitations
- Single chain (add L2 scaling)
- Synchronous calls (add indexing)
- No caching (add The Graph)

### Scalability Solutions
- Layer 2 networks (Arbitrum, Optimism)
- Off-chain data aggregation
- Batch transactions
- Event indexing

---

## Testing

```bash
# Test smart contracts
cd contracts
npx hardhat test

# Test frontend (manual)
cd frontend
npm run dev
# Visit http://localhost:3000
```

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## License

MIT License - See LICENSE files in both contracts/ and frontend/

---

## Support

- 📖 [Smart Contract Guide](./contracts/README.md)
- 🎨 [Frontend Guide](./frontend/FRONTEND_README.md)
- 📋 [System Architecture Guide](./SYSTEM_GUIDE.md)
- 📊 [Frontend Summary](./FRONTEND_SUMMARY.md)

---

## Acknowledgments

Built with:
- Hardhat for smart contracts
- Next.js for frontend
- Wagmi for Web3 integration
- RainbowKit for wallet connection
- IPFS for decentralized storage

---

**Made with ❤️ for decentralized healthcare**

For questions or support, open an issue on GitHub.
# decentralized-medical-record
# decentralized-medical-record
