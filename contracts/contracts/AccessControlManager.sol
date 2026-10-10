

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract AccessControlManager {
    struct AccessPermission {
        bool allowed;
        uint256 expiry;
    }

    mapping(address => mapping(address => AccessPermission)) public accessList;

    function grantAccess(address doctor, uint256 durationInSeconds) external {
        accessList[msg.sender][doctor] = AccessPermission({
            allowed: true,
            expiry: block.timestamp + durationInSeconds
        });
    }

    function revokeAccess(address doctor) external {
        delete accessList[msg.sender][doctor];
    }

    function hasAccess(address patient, address doctor) public view returns (bool) {
        AccessPermission memory permission = accessList[patient][doctor];
        return permission.allowed && block.timestamp < permission.expiry;
    }
}
