// Smart contract ABIs and addresses
export const CONTRACT_ADDRESSES = {
  accessControlManager: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  consentManager: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  messageInbox: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  medicalRecordStorage: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
};

export const ACCESS_CONTROL_MANAGER_ABI = [
  {
    inputs: [
      { name: "doctor", type: "address" },
      { name: "durationInSeconds", type: "uint256" },
    ],
    name: "grantAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "doctor", type: "address" }],
    name: "revokeAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "patient", type: "address" },
      { name: "doctor", type: "address" },
    ],
    name: "hasAccess",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "address" },
    ],
    name: "accessList",
    outputs: [
      { name: "allowed", type: "bool" },
      { name: "expiry", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const CONSENT_MANAGER_ABI = [
  {
    inputs: [
      { name: "accessor", type: "address" },
      { name: "recordId", type: "uint256" },
      { name: "durationInSeconds", type: "uint256" },
    ],
    name: "grantAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "accessor", type: "address" },
      { name: "recordId", type: "uint256" },
    ],
    name: "revokeAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "patient", type: "address" },
      { name: "accessor", type: "address" },
      { name: "recordId", type: "uint256" },
    ],
    name: "hasAccess",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "patient", type: "address" },
      { indexed: true, name: "accessor", type: "address" },
      { indexed: false, name: "recordId", type: "uint256" },
      { indexed: false, name: "expiresAt", type: "uint256" },
    ],
    name: "AccessGranted",
    type: "event",
  },
];

export const MESSAGE_INBOX_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "content", type: "string" },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMessages",
    outputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "content", type: "string" },
          { name: "timestamp", type: "uint256" },
        ],
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "index", type: "uint256" }],
    name: "getMessageByIndex",
    outputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "content", type: "string" },
          { name: "timestamp", type: "uint256" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMessageCount",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export const MEDICAL_RECORD_STORAGE_ABI = [
  {
    inputs: [
      { name: "cid", type: "string" },
      { name: "category", type: "string" },
    ],
    name: "addRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "patient", type: "address" },
      { name: "index", type: "uint256" },
    ],
    name: "getRecord",
    outputs: [
      { name: "", type: "string" },
      { name: "", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "accessManager",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];
