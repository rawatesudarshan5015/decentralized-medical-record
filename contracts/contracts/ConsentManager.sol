// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ConsentManager {
    struct AccessEntry {
        bool isAllowed;
        uint256 expiresAt; // UNIX timestamp
    }

    // patient => accessor => recordId => access details
    mapping(address => mapping(address => mapping(uint256 => AccessEntry))) public accessPermissions;

    event AccessGranted(address indexed patient, address indexed accessor, uint256 recordId, uint256 expiresAt);
    event AccessRevoked(address indexed patient, address indexed accessor, uint256 recordId);

    modifier onlyPatient(address patient) {
        require(msg.sender == patient, "Not authorized: Only patient can manage access");
        _;
    }

    /// @notice Patient grants time-limited access to a specific record
    function grantAccess(
        address accessor,
        uint256 recordId,
        uint256 durationInSeconds
    ) external {
        accessPermissions[msg.sender][accessor][recordId] = AccessEntry({
            isAllowed: true,
            expiresAt: block.timestamp + durationInSeconds
        });

        emit AccessGranted(msg.sender, accessor, recordId, block.timestamp + durationInSeconds);
    }

    /// @notice Patient can revoke access to a record anytime
    function revokeAccess(address accessor, uint256 recordId) external {
        accessPermissions[msg.sender][accessor][recordId] = AccessEntry({
            isAllowed: false,
            expiresAt: 0
        });

        emit AccessRevoked(msg.sender, accessor, recordId);
    }

    /// @notice Check if access is currently valid
    function hasAccess(
        address patient,
        address accessor,
        uint256 recordId
    ) external view returns (bool) {
        AccessEntry memory access = accessPermissions[patient][accessor][recordId];
        return access.isAllowed && block.timestamp <= access.expiresAt;
    }
}
