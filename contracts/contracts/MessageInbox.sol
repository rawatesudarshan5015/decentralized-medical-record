// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MessageInbox {
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    // recipient => list of messages
    mapping(address => Message[]) private inbox;

    event MessageSent(address indexed from, address indexed to, string content, uint256 timestamp);

    /// @notice Send a message to another user
    function sendMessage(address to, string memory content) external {
        require(to != address(0), "Invalid recipient");

        Message memory newMessage = Message({
            sender: msg.sender,
            content: content,
            timestamp: block.timestamp
        });

        inbox[to].push(newMessage);
        emit MessageSent(msg.sender, to, content, block.timestamp);
    }

    /// @notice Retrieve all messages for the caller
    function getMessages() external view returns (Message[] memory) {
        return inbox[msg.sender];
    }

    /// @notice Retrieve specific message by index
    function getMessageByIndex(uint index) external view returns (Message memory) {
        require(index < inbox[msg.sender].length, "Invalid index");
        return inbox[msg.sender][index];
    }

    /// @notice Get total messages count
    function getMessageCount() external view returns (uint) {
        return inbox[msg.sender].length;
    }
}
