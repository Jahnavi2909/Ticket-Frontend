


import React from 'react';
import './TicketTable2.css';

const TicketTable = ({ tickets, onTicketClick }) => {
  const getStatusClass = (status) => {
    const statusLower = (status || '').toLowerCase();
    if (statusLower === 'open') return 'status-open';
    if (statusLower === 'closed') return 'status-closed';
    if (statusLower === 'pending') return 'status-pending';
    if (statusLower === 'masell') return 'status-masell';
    return '';
  };

  const formatDateTime = (dateTime) => dateTime || '-';

  return (
    <div className="ticket-table-container">
      <table className="ticket-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="ticket-row"
              role="button"
              tabIndex={0}
              onClick={() => onTicketClick(ticket)}
              onKeyDown={(e) => { if (e.key === 'Enter') onTicketClick(ticket); }}
            >
              <td className="subject-cell">{ticket.subject}</td>
              <td><span className={`status-badge ${getStatusClass(ticket.status1)}`}>{ticket.status1}</span></td>
              <td className="priority-cell">{ticket.priority}</td>
              <td className="assignee-cell">{ticket.assignee}</td>
              <td className="date-cell">{formatDateTime(ticket.createdAt)}</td>
              <td className="date-cell">{formatDateTime(ticket.updatedAt)}</td>
              <td className="actions-cell">
                {/* make sure clicking the action button doesn't trigger row onClick */}
                <button
                  className="action-btn"
                  onClick={(e) => { e.stopPropagation(); /* open action menu here if needed */ }}
                  aria-label="ticket actions"
                >
                  ⋮
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
