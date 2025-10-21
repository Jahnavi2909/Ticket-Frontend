






// ✅ SupportPage1.jsx
import React, { useState, useEffect } from 'react';
import Sidebar3 from '../../components/Sidebar3/Sidebar3';
import TicketFilters2 from '../../components/TicketFilters2/TicketFilters2';
import TicketTable2 from '../../components/TicketTable2/TicketTable2';
import TicketAPI from '../../services/api'; // ✅ Ensure this matches your import name
import CreateTicketModal2 from '../../components/CreateTicketModal2/CreateTicketModal2';
import TicketDialog2 from "../../components/TicketDialog2/TicketDialog2";

import './SupportPage1.css';

const SupportPage1 = ({ activePage, setActivePage }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]); // ✅ default to empty array
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  

   // Pagination
  const [pageNumber, setPageNumber] = useState(1); // frontend page number starts from 1
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

  // ✅ Corrected ticket fetching logic
  // useEffect(() => {
  //   const fetchTickets = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await TicketAPI.getTickets();

  //       // ✅ Extract the correct array from backend response
  //       const fetchedTickets = res?.data?.ticketDtos || [];

  //       console.log("✅ Fetched tickets:", fetchedTickets);
        
  //       setTickets(fetchedTickets);
  //     } catch (error) {
  //       console.error("❌ Error fetching tickets:", error);
  //       setTickets([]); // fallback to empty array
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTickets();
  // }, []);

  useEffect(() => {
  const init = async () => {
    await fetchTickets();
    await notifyBreachedTickets();
  };
  init();
}, []);
  
    useEffect(() => {
      filterTickets();
    }, [activeFilter, searchQuery, tickets]);


    const fetchTickets = async (page = 1) => {
        setLoading(true);
        try {
          // const data = await ticketAPI.getTickets();
          // setTickets(data || []);
          // setFilteredTickets(data || []);
          const response = await TicketAPI.getTickets(page - 1, pageSize);
        
      const ticketList = response?.data?.ticketDtos || [];
      const totalTickets = response?.data?.totalCount || ticketList.length;

       setTickets(ticketList);
          setFilteredTickets(ticketList);


const total = Math.ceil(totalTickets / pageSize);
setTotalPages(total > 0 ? total : 1);
 setPageNumber(page); 
      console.log("✅ Fetched tickets:", ticketList);
    
          // const ticketList =
          //   response?.data?.tickets || // if wrapped inside "data"
          //   response?.tickets || // if directly inside response
          //   [];
         

        } catch (err) {
          console.error("Error fetching Tickets:",err);
          setTickets([]);
          setFilteredTickets([]);
          setTotalPages(1);
        } finally {
          setLoading(false);
        }
      };

 const notifyBreachedTickets = async () => {
    try {
      const res = await TicketAPI.getBreachedTickets(0, 10); // first page, 10 tickets
       const breachedTickets = res?.data?.ticketDtos || [];
    console.log("Breached tickets:", breachedTickets);

      breachedTickets.forEach(async (ticket) => {
        if (ticket.assigneeId) {
          const message = {
            userId: ticket.assigneeId,
            body: `⚠️ Ticket #${ticket.id} has not been solved in 72 hours. Please resolve it ASAP!`,
          };

          try {
            await TicketAPI.addComment(ticket.id, message);
            console.log(`Notification sent to agent ${ticket.assigneeId} for ticket ${ticket.id}`);
          } catch (err) {
            console.error(`Failed to notify agent for ticket ${ticket.id}:`, err);
          }
        }
      });
    } catch (err) {
      console.error("Failed to fetch breached tickets:", err);
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
    await fetchTickets(pageNumber);
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

   const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {fetchTickets(page);
    }
  };

  return (
    <div className="tickets-page">
      <Sidebar3 activeTab={activePage} setActiveTab={setActivePage} />

      <div className="main-content">
        <div className="page-header">
          <h1>Tickets</h1>
        </div>

        <TicketFilters2
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
            <TicketTable2
              tickets={filteredTickets}
              onTicketClick={handleTicketClick}
            />


            {/* Pagination
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => goToPage(pageNumber - 1)}
                  disabled={pageNumber === 1}
                  className="pagination-btn"
                >
                  &lt;&lt; Previous
                </button>

                <div className="pagination-numbers">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`pagination-number ${pageNumber === i + 1 ? 'active' : ''}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(pageNumber + 1)}
                  disabled={pageNumber === totalPages}
                  className="pagination-btn"
                >
                  Next &gt;&gt;
                </button>
              </div>
            )} */}


            {showCreateModal && (
              <CreateTicketModal2
                onClose={() => setShowCreateModal(false)}
                onTicketCreated={handleTicketCreated}
              />
            )}

            {selectedTicket && (
              <TicketDialog2
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

export default SupportPage1;


