


//code with perfect working of editinf and commenting by connecting api's
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./TicketDialog3.css";
import ticketAPI from "../../services/api";
import Cookies from "js-cookie";

const TicketDialog = ({ ticket, onClose, onTicketUpdated }) => {
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

    // Add the comment
    const addedComment = await ticketAPI.addComment(ticket.id, newComment);

    // Determine if we need to close the ticket
    let newStatus = updatedTicket.status;
    if (currentUser.role === "SUPPORT_AGENT" && updatedTicket.status.toUpperCase() === "IN_PROGRESS") {
      newStatus = "CLOSED";

      // Update ticket status on backend
      const updatedTicketData = {
        id: ticket.id,
        requesterId: ticket.requester?.id || ticket.requesterId,
        assigneeId: ticket.assigneeId || 0,
        subject: ticket.subject,
        priority: ticket.priority,
        status: "CLOSED",
      };
      await ticketAPI.updateTicket(updatedTicketData);
    }

    // Update local ticket state (comments + status)
    setUpdatedTicket((prev) => ({
      ...prev,
      status: newStatus,
      comments: [...(prev.comments || []), addedComment.data],
    }));

    setComment("");
  } catch (err) {
    console.error("Error adding comment:", err);
    alert("Failed to add comment or update ticket. Check console.");
  } finally {
    setLoading(false);
  }
};


const TicketDialog = (props) => {
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(
    <TicketDialogContent {...props} />,
    document.body
  );
};
}

export default TicketDialog;
