# 🏥 Decentralized Medical Records - Frontend

A modern, user-friendly interface for the decentralized medical record management system built with Next.js, TypeScript, and Wagmi.

## Features

- **Patient Dashboard**: Manage medical records and grant/revoke access
- **Doctor Dashboard**: Access patient records with proper permissions
- **Secure Messaging**: Built-in communication system
- **Web3 Integration**: Connect wallets with RainbowKit
- **Real-time Updates**: React-based UI with instant feedback
- **Responsive Design**: Works on desktop, tablet, and mobile

## Prerequisites

- Node.js 16+
- npm or yarn
- A web3 wallet (MetaMask, WalletConnect, etc.)

## Installation

```bash
cd frontend
npm install --legacy-peer-deps
```

## Environment Setup

Create a `.env.local` file in the frontend directory:

```
NEXT_PUBLIC_PROJECT_ID=YOUR_WALLETCONNECT_PROJECT_ID
```

Get your WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com)

## Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

### Home Page (`/`)
Dashboard showing available features and wallet connection status.

### Patient Dashboard (`/patient`)
- **Grant General Access**: Allow healthcare providers time-limited access to all records
- **Record-Specific Consent**: Grant access to specific medical records
- **Upload Records**: Add new medical records with IPFS CIDs

### Doctor Dashboard (`/doctor`)
- **Check Access**: Verify if you have access to a patient's records
- **View Records**: Retrieve and view patient medical records
- **Access Status**: See which patients have granted you access

### Messages (`/messages`)
- **Send Messages**: Communicate securely with other users
- **View Inbox**: Receive and read messages from patients and providers
- **Real-time Updates**: Refresh to see new messages

### About (`/about`)
Information about the system, how it works, and privacy/security details.

## Contract Integration

The frontend interacts with 4 smart contracts:

1. **AccessControlManager** (`0x5FbDB2315678afecb367f032d93F642f64180aa3`)
   - Grant/revoke general access
   - Check access permissions

2. **ConsentManager** (`0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`)
   - Fine-grained, per-record access control
   - Time-limited permissions

3. **MedicalRecordStorage** (`0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9`)
   - Store medical record CIDs
   - Retrieve records with permission checks

4. **MessageInbox** (`0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0`)
   - Send and receive messages
   - Store message history

## Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Web3**: Wagmi + ethers.js
- **Wallet Connection**: RainbowKit
- **Styling**: CSS Modules
- **State Management**: React Hooks

## File Structure

```
frontend/
├── pages/                 # Next.js pages
│   ├── _app.tsx          # App wrapper with Web3 setup
│   ├── index.tsx         # Home page
│   ├── patient.tsx       # Patient dashboard
│   ├── doctor.tsx        # Doctor dashboard
│   ├── messages.tsx      # Messaging page
│   └── about.tsx         # About page
├── components/            # React components
│   └── Layout.tsx        # App layout with header/footer
├── styles/               # CSS modules
│   ├── globals.css       # Global styles
│   ├── Layout.module.css # Layout styles
│   ├── Home.module.css   # Home page styles
│   └── Dashboard.module.css # Dashboard styles
├── utils/                # Utility functions
│   └── contracts.ts      # Contract ABIs and addresses
└── interfaces/           # TypeScript interfaces
    └── index.ts         # Shared types
```

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Wallet Connection Issues
- Ensure you have MetaMask or another Web3 wallet installed
- Try disconnecting and reconnecting your wallet
- Clear browser cache and cookies

### Contract Interaction Errors
- Verify you're connected to the correct network (Sepolia or Localhost)
- Ensure your wallet has sufficient balance for gas fees
- Check contract addresses in `utils/contracts.ts`

### IPFS Gateway Issues
- The app uses Pinata's IPFS gateway for viewing records
- Make sure your IPFS CID is valid

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details
