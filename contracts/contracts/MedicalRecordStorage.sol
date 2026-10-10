// contracts/MedicalRecordStorage.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./AccessControlManager.sol";

contract MedicalRecordStorage {
    AccessControlManager public accessManager;

    constructor(address _accessManager) {
        accessManager = AccessControlManager(_accessManager);
    }

    struct MedicalRecord {
        string cid;
        string category;
    }

    mapping(address => MedicalRecord[]) private records;

    function addRecord(string calldata cid, string calldata category) external {
        records[msg.sender].push(MedicalRecord(cid, category));
    }

    function getRecord(address patient, uint index) external view returns (string memory, string memory) {
        require(accessManager.hasAccess(patient, msg.sender), "Access denied");
        MedicalRecord memory record = records[patient][index];
        return (record.cid, record.category);
    }
}
