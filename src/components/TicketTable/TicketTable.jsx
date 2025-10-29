import React from "react";
import "./TicketTable.css";

const TicketTable = ({ tickets, onTicketClick }) => {
  const getStatusClass = (status) => {
    const statusLower = (status || "").toLowerCase();
    if (statusLower === "open") return "status-open";
    if (statusLower === "closed") return "status-closed";
    if (statusLower === "pending") return "status-pending";
    return "";
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  // const renderAgentComments = (comments) => {
  //   if (!Array.isArray(comments) || comments.length === 0) return "No comments";
  //   const agentComments = comments.filter(
  //     (c) =>
  //       c.user?.role?.toLowerCase() === "support_agent" ||
  //       c.userRole?.toLowerCase() === "support_agent"
  //   );
  //   if (agentComments.length === 0) return "No agent comments";
  //   return agentComments.map((c, i) => (
  //     <div key={i} className="comment-item">
  //       <span className="comment-body"> {c.body}</span>
  //     </div>
  //   ));
  // };

  return (
    <div className="ticket-table-container">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="ticket-row"
                // role="button"
                // tabIndex={0}
                // onClick={() => onTicketClick(ticket)}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") onTicketClick(ticket);
                // }}
                onClick={() => onTicketClick(ticket)}
              >
                <td className="id-cell">{ticket.id}</td>
                <td className="subject-cell">{ticket.subject || "-"}</td>
                <td>
                  <span
                    className={`status-badge ${getStatusClass(ticket.status)}`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="priority-cell">{ticket.priority || "-"}</td>
                {/* <td className="comments-cell">
                  {renderAgentComments(ticket.comments)}
                </td> */}
                <td className="date-cell">
                  {formatDateTime(ticket.createdAt)}
                </td>
                <td className="date-cell">
                  {formatDateTime(ticket.updatedAt)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-tickets">
                No tickets found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
