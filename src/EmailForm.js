import { useState } from 'react';
import axios from "axios";

export default function EmailForm() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!to || !subject || !message) {
      setStatus("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/send", {
        from: "fitnessatd21@gmail.com",
        to,
        subject,
        message
      });
      
      setStatus("Email sent successfully!");
      setTo("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus(` Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", fontFamily: "Arial" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Recipient Email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <textarea
          rows="5"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        ></textarea>
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Send Email
        </button>
      </form>
      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}
