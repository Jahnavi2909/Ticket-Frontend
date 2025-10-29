// src/components/CreateTicketModal/CreateTicketModal.jsx
import React, { useState } from "react";
import "./CreateTicketModal.css";
import ticketAPI from "../../services/api";
import { sendTicketEmail } from "../../utils/sendEmail"; // ✅ import the utility
import Cookies from "js-cookie";

const CreateTicketModal = ({ onClose, onTicketCreated, currentUserId }) => {
  const [requester, setRequester] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("HIGH");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject) {
      setError("Please fill out all fields");
      return;
    }

    const ticketData = {
      subject,
      priority,
      status: "OPEN", // default status for user-created ticket
      requesterId: currentUserId, // current logged-in user's ID
      assigneeId: null,
    };

    setLoading(true);
    try {
      // 1️⃣ Create the ticket via API
      const response = await ticketAPI.raiseTicket(ticketData);
      const createdTicket = response?.data || {};

      // 2️⃣ Trigger email notifications
      const user = {
        name: Cookies.get("userName"),
        email: Cookies.get("userEmail"),
      };

      await sendTicketEmail(user, createdTicket, false);

      // send confirmation to agent (only if agent assigned)
      if (createdTicket.assigneeEmail) {
        const agent = {
          name: createdTicket.assigneeName,
          email: createdTicket.assigneeEmail,
        };
        await sendTicketEmail(agent, createdTicket, true);
      }

      // 3️⃣ Refresh UI
      onTicketCreated();
      onClose();
    } catch (err) {
      console.error("Error creating ticket:", err);
      setError("Failed to create ticket.Please try again.");
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
            <label>Subject</label>
            <textarea
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter ticket subject or issue description"
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
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

export default CreateTicketModal;