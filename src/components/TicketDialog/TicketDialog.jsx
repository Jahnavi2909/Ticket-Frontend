//code with perfect working of editing and commenting by connecting api's
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./TicketDialog.css";
import ticketAPI from "../../services/api";
import Cookies from "js-cookie";

const TicketDialogContent = ({ ticket, onClose, onTicketUpdated }) => {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState(ticket || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUpdatedTicket(ticket || {});
    console.log("TicketDialog mounted with ticket:", ticket);
    return () => console.log("TicketDialog unmount");
  }, [ticket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTicket({ ...updatedTicket, [name]: value });
  };

  const handleUpdate = async () => {
  setLoading(true);
  try {
    // Only send what the backend needs
    const ticketToUpdate = {
      id: updatedTicket.id,
      requesterId: updatedTicket.requester?.id || updatedTicket.requesterId,
      assigneeId: updatedTicket.assigneeId || 0,
      subject: updatedTicket.subject,
      status: updatedTicket.status.toUpperCase(),
      priority: updatedTicket.priority.toUpperCase(),
    };

    console.log("Sending update payload:", ticketToUpdate);

    const result = await ticketAPI.updateTicket(ticketToUpdate);
    
    console.log("Update result:", result);
    onTicketUpdated();
    setIsEditing(false);
    
  } catch (err) {
    console.error("Update error:", err);
    alert(`Failed to update ticket: ${err.message}`);
  } finally {
    setLoading(false);
  }
};



  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;
    setLoading(true);
    try {
      await ticketAPI.deleteTicket(ticket.id);
      onTicketUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete ticket.");
    } finally {
      setLoading(false);
    }
  };

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
        userName: currentUser.name,
        userEmail: currentUser.email,
        userRole: currentUser.role,
        body: comment,
      };

      const addedComment = await ticketAPI.addComment(ticket.id, newComment);

      // Update local ticket comments
      setUpdatedTicket({
        ...updatedTicket,
        comments: [...(updatedTicket.comments || []), addedComment.data],
      });

      setComment("");
    } catch (err) {
      console.error(err);
       console.error("Error adding comment:", err);
      alert("Failed to add comment.check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ticket-dialog-overlay" onClick={onClose}>
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

            </>
          ) : (
            <>
              <p>
                <strong>ID:</strong> {ticket.id}
              </p>
              <p>
                <strong>Subject:</strong> {ticket.subject}
              </p>
              <p>
                <strong>Status:</strong> {ticket.status}
              </p>
              <p>
                <strong>Priority:</strong> {ticket.priority}
              </p>
              <p>
                <strong>Requester:</strong> {ticket.requester?.name || "-"}
              </p>
              <p>
                <strong>Assignee:</strong>{" "}
                {ticket.assignee?.name || "Unassigned"}
              </p>
              <p>
                <strong>Created At:</strong> {ticket.createdAt}
              </p>
              <p>
                <strong>Updated At:</strong> {ticket.updatedAt}
              </p>
            

            {/* ✅ Display Agent Comments Only */}
      <div className="comments-section">
        <h4>Agent Comments</h4>
        {ticket.comments && ticket.comments.length > 0 ? (
          <ul>
            {ticket.comments
              .filter(
                (c) =>
                  c.userRole?.toLowerCase() === "support_agent" ||
                  c.user?.role?.toLowerCase() === "support_agent"
              )
              .map((c, i) => (
                <li key={i} className="comment-item">
                  <strong>{c.user?.name || "Agent"}:</strong> {c.body}
                </li>
              ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
             
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
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              
            </>
          )}
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