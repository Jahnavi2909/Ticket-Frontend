


//before making the code to layout of the page

import React, { useState, useEffect } from 'react';
import Sidebar2 from '../../components/Sidebar2/Sidebar2';
import TicketFilters3 from '../../components/TicketFilters3/TicketFilters3';
import TicketTable3 from '../../components/TicketTable3/TicketTable3';
import TicketAPI from '../../services/api'; // ✅ Ensure this matches your import name
import CreateTicketModal3 from '../../components/CreateTicketModal3/CreateTicketModal3';
import TicketDialog3 from "../../components/TicketDialog3/TicketDialog3";

import './SupportPage.css';

const SupportPage = ({ activePage, setActivePage }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]); // ✅ default to empty array
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  


  useEffect(() => {
      fetchTickets();
    }, []);
  
    useEffect(() => {
      filterTickets();
    }, [activeFilter, searchQuery, tickets]);


    
  
    const fetchTickets = async () => {
        setLoading(true);
        try {
          // const data = await ticketAPI.getTickets();
          // setTickets(data || []);
          // setFilteredTickets(data || []);
          const response = await TicketAPI.getTickets();
        
      const ticketList = response?.data?.ticketDtos || [];

      console.log("✅ Fetched tickets:", ticketList);
    
          // const ticketList =
          //   response?.data?.tickets || // if wrapped inside "data"
          //   response?.tickets || // if directly inside response
          //   [];
          setTickets(ticketList);
          setFilteredTickets(ticketList);
        } catch (err) {
          console.error("Error fetching Tickets:",err);
          setTickets([]);
          setFilteredTickets([]);
        } finally {
          setLoading(false);
        }
      };


      const filterTickets = () => {
    let filtered = Array.isArray(tickets) ? [...tickets] : [];

    if (activeFilter !== 'all') {
      filtered = filtered.filter(
        (ticket) => ticket.status?.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.assignee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.priority?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTickets(filtered);
  };


  // ✅ Apply filters and search
  // useEffect(() => {
  //   let filtered = Array.isArray(tickets) ? [...tickets] : [];

  //   if (activeFilter !== 'all') {
  //     filtered = filtered.filter(
  //       (ticket) => ticket.status1?.toLowerCase() === activeFilter.toLowerCase()
  //     );
  //   }

  //   if (searchQuery) {
  //     filtered = filtered.filter(
  //       (ticket) =>
  //         ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         ticket.assignee?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         ticket.priority?.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   setFilteredTickets(filtered);
  // }, [activeFilter, searchQuery, tickets]);

  // ✅ Open create modal
  const handleCreateTicket = () => {
    setShowCreateModal(true);
  };

  // ✅ Refresh after creating
  const handleTicketCreated = async () => {
    // const res = await TicketAPI.getTickets();
    // const fetchedTickets = res?.data?.ticketDtos || [];
    // setTickets(fetchedTickets);
    await fetchTickets();
  };

  // ✅ Open ticket details
  const handleTicketClick = async (ticket) => {
    try {
      const fullTicket = await TicketAPI.getTicketById(ticket.id);
      const ticketObj = fullTicket?.data ?? fullTicket ?? ticket;
      setSelectedTicket(ticketObj);
    } catch (error) {
      console.error('Failed to fetch ticket details:', error);
      setSelectedTicket(ticket);
    }
  };

  return (
    <div className="tickets-page">
      <Sidebar2 activeTab={activePage} setActiveTab={setActivePage} />

      <div className="main-content">
        <div className="page-header">
          <h1>Tickets</h1>
        </div>

        <TicketFilters3
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCreateTicket={handleCreateTicket}
        />

        {loading ? (
          <div className="loading">Loading tickets...</div>
        ) : (
          <>
            {/* ✅ Pass tickets safely */}
            <TicketTable3
              tickets={filteredTickets}
              onTicketClick={handleTicketClick}
            />

            {showCreateModal && (
              <CreateTicketModal3
                onClose={() => setShowCreateModal(false)}
                onTicketCreated={handleTicketCreated}
              />
            )}

            {selectedTicket && (
              <TicketDialog3
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
                onTicketUpdated={handleTicketCreated}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SupportPage;
