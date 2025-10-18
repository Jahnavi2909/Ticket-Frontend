import React from 'react';
import './TicketFilters2.css';

const TicketFilters = ({ activeFilter, setActiveFilter, searchQuery, setSearchQuery, onCreateTicket }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'open', label: 'Open' },
    { id: 'pending', label: 'Pending' },
    { id: 'closed', label: 'Closed' },
  ];

  return (
    <div className="ticket-filters">
      <div className="filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      <div className="filter-actions">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* <span className="search-icon">🔍</span> */}
        </div>
        
        {/* <button className="create-ticket-btn" onClick={onCreateTicket}>
          Create Ticket
        </button> */}
      </div>
    </div>
  );
};

export default TicketFilters;