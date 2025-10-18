// src/components/CreateTicketModal/CreateTicketModal.jsx
import React, { useState } from "react";
import "./CreateTicketModal.css";
import ticketAPI from "../../services/api";

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
      status: "OPEN",          // default status for user-created ticket
      requesterId: currentUserId, // current logged-in user's ID
      assigneeId: null, 
    };

    setLoading(true);
    try {
      await ticketAPI.raiseTicket(ticketData);
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
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
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
