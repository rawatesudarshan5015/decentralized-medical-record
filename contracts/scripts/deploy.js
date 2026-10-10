const hre = require("hardhat");

async function main() {
  // Deploy AccessControlManager
  const AccessControlManagerFactory = await hre.ethers.getContractFactory("AccessControlManager");
  const accessControlManagerInstance = await AccessControlManagerFactory.deploy();
  console.log("✅ AccessControlManager deployed to:", accessControlManagerInstance.address || accessControlManagerInstance.target);

  // Deploy ConsentManager
  const ConsentManagerFactory = await hre.ethers.getContractFactory("ConsentManager");
  const consentManagerInstance = await ConsentManagerFactory.deploy();
  console.log("✅ ConsentManager deployed to:", consentManagerInstance.address || consentManagerInstance.target);

  // Deploy MessageInbox
  const MessageInboxFactory = await hre.ethers.getContractFactory("MessageInbox");
  const messageInboxInstance = await MessageInboxFactory.deploy();
  console.log("✅ MessageInbox deployed to:", messageInboxInstance.address || messageInboxInstance.target);

  // Deploy MedicalRecordStorage (pass AccessControlManager dependency)
  const MedicalRecordStorageFactory = await hre.ethers.getContractFactory("MedicalRecordStorage");
  const medicalRecordStorageInstance = await MedicalRecordStorageFactory.deploy(
    accessControlManagerInstance.address || accessControlManagerInstance.target
  );
  console.log("✅ MedicalRecordStorage deployed to:", medicalRecordStorageInstance.address || medicalRecordStorageInstance.target);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
