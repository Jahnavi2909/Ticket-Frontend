// src/components/CreateTicketModal/CreateTicketModal.jsx
import React, { useState } from "react";
import "./CreateTicketModal3.css";
import ticketAPI from "../../services/api";
import { sendTicketEmail } from "../../utils/sendEmail"; // ✅ import the utility
import Cookies from "js-cookie";

const CreateTicketModal3 = ({ onClose, onTicketCreated }) => {
  const [requester, setRequester] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requester || !subject) {
      setError("Please fill out all fields");
      return;
    }

    const ticketData = {
      requester,
      subject,
    };

    setLoading(true);
    try {
      // 1️⃣ Create the ticket via API
      const response = await ticketAPI.raiseTicket(ticketData);
      const createdTicket = response?.data || {};

      // 2️⃣ Trigger email notifications
      const agent = {
        name: Cookies.get("userName"),
        email: Cookies.get("userEmail"),
      };

      await sendTicketEmail(agent, createdTicket, false);

      // // send confirmation to agent (only if agent assigned)
      // if (createdTicket.assigneeEmail) {
      //   const agent = {
      //     name: createdTicket.assigneeName,
      //     email: createdTicket.assigneeEmail,
      //   };
      //   await sendTicketEmail(agent, createdTicket, true);
      // }

      // 3️⃣ Refresh UI
      onTicketCreated();
      onClose();
    } catch (err) {
      console.error("Error creating ticket:", err);
      setError("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Requester</label>
            <input
              type="text"
              value={requester}
              onChange={(e) => setRequester(e.target.value)}
              placeholder="Enter requester name"
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <textarea
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter ticket subject or issue description"
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal3;
