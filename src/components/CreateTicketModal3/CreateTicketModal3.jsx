// src/components/CreateTicketModal/CreateTicketModal.jsx
import React, { useState } from "react";
import "./CreateTicketModal3.css";
import ticketAPI from "../../services/api";

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
      await ticketAPI.raiseTicket(ticketData);
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
