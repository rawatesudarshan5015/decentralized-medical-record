import { useState, useEffect } from "react";
import { useAccount, useContractWrite, useContractRead } from "wagmi";
import Layout from "../components/Layout";
import { CONTRACT_ADDRESSES, MESSAGE_INBOX_ABI } from "../utils/contracts";
import styles from "../styles/Dashboard.module.css";

const MessagesPage = () => {
  const { address, isConnected } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Send message
  const { write: sendMessage } = useContractWrite({
    address: CONTRACT_ADDRESSES.messageInbox as `0x${string}`,
    abi: MESSAGE_INBOX_ABI,
    functionName: "sendMessage",
  });

  // Get messages
  const { data: messagesData, refetch: refetchMessages } = useContractRead({
    address: CONTRACT_ADDRESSES.messageInbox as `0x${string}`,
    abi: MESSAGE_INBOX_ABI,
    functionName: "getMessages",
    enabled: isConnected,
  });

  // Get message count
  const { data: messageCount } = useContractRead({
    address: CONTRACT_ADDRESSES.messageInbox as `0x${string}`,
    abi: MESSAGE_INBOX_ABI,
    functionName: "getMessageCount",
    enabled: isConnected,
  });

  useEffect(() => {
    if (messagesData && Array.isArray(messagesData)) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipientAddress || !messageContent) {
      alert("Please fill in all fields");
      return;
    }

    try {
      sendMessage({
        args: [recipientAddress as `0x${string}`, messageContent],
      });
      setRecipientAddress("");
      setMessageContent("");
      alert("Message sent!");
      
      // Refresh messages after a delay
      setTimeout(() => {
        refetchMessages?.();
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  if (!isConnected) {
    return (
      <Layout title="Messages">
        <div className={styles.container}>
          <p>Please connect your wallet to view and send messages.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Messages">
      <div className={styles.container}>
        <h1>💬 Secure Messaging</h1>
        <p className={styles.address}>Your Address: {address?.slice(0, 10)}...{address?.slice(-8)}</p>

        <div className={styles.grid}>
          {/* Send Message Section */}
          <div className={styles.section}>
            <h2>Send Message</h2>
            <p>Send a secure message to another user on the platform.</p>

            <form onSubmit={handleSendMessage} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Recipient Address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea
                  placeholder="Type your message..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={4}
                />
              </div>

              <button type="submit" className={styles.button}>
                Send Message
              </button>
            </form>
          </div>

          {/* Inbox Section */}
          <div className={styles.section}>
            <h2>Your Inbox</h2>
            <p>Messages received: {messageCount ? Number(messageCount) : 0}</p>

            {messages.length === 0 ? (
              <div className={styles.empty}>
                <p>📭 No messages yet</p>
              </div>
            ) : (
              <div className={styles.messageList}>
                {messages.map((msg, index) => (
                  <div key={index} className={styles.messageItem}>
                    <div className={styles.messageHeader}>
                      <strong>From: {msg.sender?.slice(0, 10)}...{msg.sender?.slice(-8)}</strong>
                      <span className={styles.timestamp}>
                        {new Date(Number(msg.timestamp) * 1000).toLocaleString()}
                      </span>
                    </div>
                    <p className={styles.messageContent}>{msg.content}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => refetchMessages?.()}
              className={styles.secondaryButton}
            >
              🔄 Refresh Messages
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
