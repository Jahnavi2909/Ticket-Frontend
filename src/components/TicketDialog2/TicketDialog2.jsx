
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./TicketDialog2.css";
import ticketAPI from "../../services/api";
import Cookies from "js-cookie";

const TicketDialogContent = ({ ticket, onClose, onTicketUpdated }) => {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState(ticket || {});
  const [loading, setLoading] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [isAssigned, setIsAssigned] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isCommented, setIsCommented] = useState(false); // ✅ Disable after 1 comment

  useEffect(() => {
    setUpdatedTicket(ticket || {});
    // Check if ticket is already assigned
    const hasAssignee = ticket?.assignee?.id || ticket?.assigneeId;
    setIsAssigned(!!hasAssignee);

    // ✅ Check if already commented
    if (ticket?.comments?.length > 0) {
      setIsCommented(true);
    }
  }, [ticket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTicket({ ...updatedTicket, [name]: value });
  };

  // ✅ When Admin assigns agent → Open → In Progress
  const handleAssignAgent = async () => {
    if (!agentId.trim()) {
      alert("Please enter an Agent ID.");
      return;
    }

    if (isAssigned) {
      alert("This ticket is already assigned!");
      return;
    }

    setLoading(true);
    try {
      const assignmentData = {
        id: updatedTicket.id,
        assigneeId: parseInt(agentId),
      };

      await ticketAPI.assignTicket(assignmentData);

      console.log("Assigning ticket:", assignmentData);
      const result = await ticketAPI.assignTicket(assignmentData);
      console.log("Assign Ticket Response:", result);

      // Step 2: Update ticket status to IN_PROGRESS
      const updatedTicketData = {
        id: updatedTicket.id,
        requesterId: updatedTicket.requester?.id || updatedTicket.requesterId,
        assigneeId: parseInt(agentId),
        subject: updatedTicket.subject,
        status: "IN_PROGRESS",
        priority: updatedTicket.priority?.toUpperCase(),
      };

      await ticketAPI.updateTicket(updatedTicketData);

      setUpdatedTicket({
        ...updatedTicket,
        assigneeId: parseInt(agentId),
        status: "IN_PROGRESS",
      });

      setIsAssigned(true);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);

      onTicketUpdated();
      setAgentId("");
      setIsEditing(false);
    } catch (err) {
      console.error("Error assigning agent:", err);
      alert("Failed to assign agent. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ When Admin comments → In Progress → Closed
  const handleAddComment = async () => {
    if (!comment.trim()) return alert("Please enter a comment.");
    setLoading(true);
    try {
      const currentUser = {
        id: parseInt(Cookies.get("userId")),
        name: Cookies.get("userName"),
        email: Cookies.get("userEmail"),
        role: Cookies.get("userRole"),
      };

      const newComment = {
        userId: currentUser.id,
        body: comment,
      };

      const addedComment = await ticketAPI.addComment(ticket.id, newComment);

      const newComments = [
        ...(updatedTicket.comments || []),
        addedComment.data,
      ];

      let newStatus = updatedTicket.status;
      if (updatedTicket.status === "IN_PROGRESS") {
        newStatus = "CLOSED";
        await ticketAPI.updateTicket({
          ...updatedTicket,
          status: newStatus,
        });
      }

      setUpdatedTicket({
        ...updatedTicket,
        comments: newComments,
        status: newStatus,
      });

      onTicketUpdated();
      setComment("");
      setIsCommented(true); // ✅ Disable comment after first comment
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const ticketToUpdate = {
        id: updatedTicket.id,
        requesterId: updatedTicket.requester?.id || updatedTicket.requesterId,
        assigneeId:
          updatedTicket.assignee?.id || updatedTicket.assigneeId || null,
        subject: updatedTicket.subject,
        status: updatedTicket.status?.toUpperCase(),
        priority: updatedTicket.priority?.toUpperCase(),
      };
      await ticketAPI.updateTicket(ticketToUpdate);
      onTicketUpdated();
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      alert(`Failed to update ticket: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-dialog-overlay" onClick={onClose}>
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-popup-content">
            <div className="success-icon">✓</div>
            <h3>Agent Assigned Successfully!</h3>
            <p>Status changed to IN_PROGRESS</p>
          </div>
        </div>
      )}

      <div className="ticket-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>Ticket Details</h3>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="dialog-content">
          {isEditing ? (
            <>
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                value={updatedTicket.subject || ""}
                onChange={handleInputChange}
              />

              <label>Status:</label>
              <select
                name="status"
                value={updatedTicket.status || "OPEN"}
                onChange={handleInputChange}
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CLOSED">Closed</option>
              </select>

              <label>Priority:</label>
              <select
                name="priority"
                value={updatedTicket.priority || "MEDIUM"}
                onChange={handleInputChange}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              {/* ✅ Agent Assignment Section */}
              <div className="assignment-section">
                <label>
                  Assign to Support Agent:
                  {isAssigned && (
                    <span style={{ color: "green", marginLeft: "10px" }}>
                      ✓ Already Assigned
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  placeholder="Enter Agent ID"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                  disabled={isAssigned}
                  className="agent-input"
                />
                <button
                  className="assign-btn"
                  onClick={handleAssignAgent}
                  disabled={loading || isAssigned || !agentId}
                >
                  {loading
                    ? "Assigning..."
                    : isAssigned
                    ? "✓ Assigned"
                    : "Assign Ticket"}
                </button>
              </div>
            </>
          ) : (
            <>
              <p><strong>ID:</strong> {ticket.id}</p>
              <p><strong>Subject:</strong> {ticket.subject}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status-${ticket.status?.toLowerCase()}`}>
                  {ticket.status}
                </span>
              </p>
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Requester:</strong> {ticket.requester?.name || "-"}</p>
              <p>
                <strong>Assignee ID:</strong>{" "}
                {ticket.assignee?.id || ticket.assigneeId || "Unassigned"}
              </p>

              {/* ✅ Display Comments */}
              {updatedTicket.comments && updatedTicket.comments.length > 0 && (
                <div className="comments-list">
                  <h4>Comments</h4>
                  {updatedTicket.comments.map((c, i) => (
                    <div key={i} className="comment-item">
                      <strong>Admin:</strong> {c.body}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="dialog-footer">
          {isEditing ? (
            <>
              <button
                className="save-btn"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>

        {/* ✅ Add Comment Section */}
        <div className="comment-section">
          <h4>Add Comment</h4>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            disabled={isCommented} // disable after first comment
          />
          <button
            className="comment-btn"
            onClick={handleAddComment}
            disabled={loading || isCommented}
          >
            {loading
              ? "Submitting..."
              : isCommented
              ? "Comment Submitted"
              : "Submit Comment"}
          </button>
        </div>
      </div>
    </div>
  );
};

const TicketDialog = (props) => {
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(
    <TicketDialogContent {...props} />,
    document.body
  );
};

export default TicketDialog;


