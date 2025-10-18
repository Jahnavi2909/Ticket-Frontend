




// // //code with create ticket button and editable functionlity
// import React, { useState, useEffect } from 'react';
// import Sidebar2 from '../../components/Sidebar2/Sidebar2';
// import TicketFilters from '../../components/TicketFilters/TicketFilters';
// import TicketTable from '../../components/TicketTable/TicketTable';
// import ticketAPI from '../../services/api';
// import CreateTicketModal from '../../components/CreateTicketModal/CreateTicketModal';
// import TicketDialog from "../../components/TicketDialog/TicketDialog";

// import './SupportPage.css';

// const SupportPage = ({ activePage, setActivePage }) => {
//   const activeTab = 'tickets';
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [tickets, setTickets] = useState([]);
//   const [filteredTickets, setFilteredTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   useEffect(() => {
//     filterTickets();
//   }, [activeFilter, searchQuery, tickets]);

//   const fetchTickets = async () => {
//     setLoading(true);
//     try {
//       const data = await ticketAPI.getTickets();
//       setTickets(data);
//     } catch (error) {
//       console.error('Failed to fetch tickets:', error);
//       setTickets(getMockTickets());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterTickets = () => {
//     let filtered = [...tickets];
//     if (activeFilter !== 'all') {
//       filtered = filtered.filter(
//         (ticket) => ticket.status1?.toLowerCase() === activeFilter.toLowerCase()
//       );
//     }
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (ticket) =>
//           ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ticket.assignee?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ticket.priority?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
//     setFilteredTickets(filtered);
//   };

//   const handleCreateTicket = () => {
//     setShowCreateModal(true);
//   };

//   const handleTicketCreated = async () => {
//     await fetchTickets();
//   };

//   // Robust handleTicketClick with logs + fallback
//   const handleTicketClick = async (ticket) => {
//     console.log('Ticket clicked (from table):', ticket);
//     try {
//       const fullTicket = await ticketAPI.getTicketById(ticket.id);
//       console.log('getTicketById returned:', fullTicket);
//       const ticketObj = fullTicket?.data ?? fullTicket ?? ticket;
//       setSelectedTicket(ticketObj);
//     } catch (error) {
//       console.error('Failed to fetch ticket details (API). Falling back to the row data.', error);
//       setSelectedTicket(ticket);
//     }
//   };

//   const getMockTickets = () => [
//     { id: '1', subject: 'Email not sending', status1: 'Open', priority: 'High', assignee: 'John D.', createdBy: 'Sarah K.', createdAt: '2024-10-26 10:00 AM', updatedAt: '2024-10-26 10:00 AM' },
//     { id: '2', subject: 'Password reset issue', status1: 'Pending', priority: 'Medium', assignee: 'Jane K.', createdBy: 'Mike R.', createdAt: '2024-10-26 10:00 AM', updatedAt: '2024-10-26 10:00 AM' },
//     { id: '3', subject: 'TKT-2024-002', status1: 'Masell', priority: 'Low', assignee: 'Emily C.', createdBy: '', createdAt: '2024-10-25 11:15 AM', updatedAt: '2024-10-25 11:15 AM' },
//     { id: '4', subject: 'Login error on mobile', status1: 'Closed', priority: 'Low', assignee: 'John D.', createdBy: '', createdAt: '2024-10-25 02:00 AM', updatedAt: '2024-10-25 02:00 AM' },
//     { id: '5', subject: 'Integration failed', status1: 'Open', priority: 'Low', assignee: 'David L.', createdBy: '', createdAt: '2024-10-26 01:45 PM', updatedAt: '2024-10-26 01:45 PM' },
//   ];

//   return (
//     <div className="tickets-page">
//       <Sidebar2 activeTab={activePage} setActiveTab={setActivePage} />

//       <div className="main-content">
//         <div className="page-header"><h1>Tickets</h1></div>

//         <TicketFilters
//           activeFilter={activeFilter}
//           setActiveFilter={setActiveFilter}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           onCreateTicket={handleCreateTicket}
//         />

//         {/* Dev test button (optional) */}
//         {/* <button onClick={() => setSelectedTicket(tickets[0] ?? { id: '1', subject: 'Test' })}>Open Test Dialog</button> */}

//         {loading ? (
//           <div className="loading">Loading tickets...</div>
//         ) : (
//           <>
//             <TicketTable tickets={filteredTickets} onTicketClick={handleTicketClick} />

//             {showCreateModal && (
//               <CreateTicketModal onClose={() => setShowCreateModal(false)} onTicketCreated={handleTicketCreated} />
//             )}

//             {selectedTicket && (
//               <TicketDialog
//                 ticket={selectedTicket}
//                 onClose={() => setSelectedTicket(null)}
//                 onTicketUpdated={fetchTickets}
//               />
//             )}

//             {/* <div className="pagination">
//               <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Previous</button>
//               <div className="pagination-numbers">
//                 <button className={`page-number ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
//                 <button className={`page-number ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
//                 <button className={`page-number ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
//               </div>
//               <button className="pagination-btn" onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
//               <button className="pagination-menu">⋮</button>
//             </div> */}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupportPage;




//modernn
 import React, { useState, useEffect } from 'react';
import Sidebar2 from '../../components/Sidebar2/Sidebar2';
import TicketFilters3 from '../../components/TicketFilters3/TicketFilters3';
import TicketTable3 from '../../components/TicketTable3/TicketTable3';
import ticketAPI from '../../services/api';
import CreateTicketModal3 from '../../components/CreateTicketModal3/CreateTicketModal3';
import TicketDialog3 from "../../components/TicketDialog3/TicketDialog3";

import './SupportPage.css';

const SupportPage = ({ activePage, setActivePage }) => {
  const activeTab = 'tickets';
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  // useEffect(() => {
  //   filterTickets();
  // }, [activeFilter, searchQuery, tickets]);

  const fetchTickets = async () => {
      setLoading(true);
      try {
        // const data = await ticketAPI.getTickets();
        // setTickets(data || []);
        // setFilteredTickets(data || []);
        const response = await ticketAPI.getTickets();
        let ticketList = (response?.data?.ticketDtos || []).map(t => ({
  ...t,
  status1: t.status // map backend 'status' to frontend 'status1'
}));
  
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

  // const filterTickets = () => {
  //   let filtered = [...tickets];
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
  // };

  const handleCreateTicket = () => {
    setShowCreateModal(true);
  };

  const handleTicketCreated = async () => {
    await fetchTickets();
  };

  // Robust handleTicketClick with logs + fallback
  const handleTicketClick = async (ticket) => {
    // console.log('Ticket clicked (from table):', ticket);
    // try {
    //   const fullTicket = await ticketAPI.getTicketById(ticket.id);
    //   console.log('getTicketById returned:', fullTicket);
    //   const ticketObj = fullTicket?.data ?? fullTicket ?? ticket;
      setSelectedTicket(ticket);
    // } catch (error) {
    //   console.error('Failed to fetch ticket details (API). Falling back to the row data.', error);
    //   setSelectedTicket(ticket);
    // }
  };

  // const getMockTickets = () => [
  //   { id: '1', subject: 'Email not sending', status1: 'Open', priority: 'High', assignee: 'John D.', createdBy: 'Sarah K.', createdAt: '2024-10-26 10:00 AM', updatedAt: '2024-10-26 10:00 AM' },
  //   { id: '2', subject: 'Password reset issue', status1: 'Pending', priority: 'Medium', assignee: 'Jane K.', createdBy: 'Mike R.', createdAt: '2024-10-26 10:00 AM', updatedAt: '2024-10-26 10:00 AM' },
  //   { id: '3', subject: 'TKT-2024-002', status1: 'Masell', priority: 'Low', assignee: 'Emily C.', createdBy: '', createdAt: '2024-10-25 11:15 AM', updatedAt: '2024-10-25 11:15 AM' },
  //   { id: '4', subject: 'Login error on mobile', status1: 'Closed', priority: 'Low', assignee: 'John D.', createdBy: '', createdAt: '2024-10-25 02:00 AM', updatedAt: '2024-10-25 02:00 AM' },
  //   { id: '5', subject: 'Integration failed', status1: 'Open', priority: 'Low', assignee: 'David L.', createdBy: '', createdAt: '2024-10-26 01:45 PM', updatedAt: '2024-10-26 01:45 PM' },
  // ];

  return (
    <div className="tickets-page">
      <Sidebar2 activeTab={activePage} setActiveTab={setActivePage} />

      <div className="main-content">
        <div className="page-header"><h1>Tickets</h1></div>

        <TicketFilters3
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCreateTicket={handleCreateTicket}
        />

        {/* Dev test button (optional) */}
        {/* <button onClick={() => setSelectedTicket(tickets[0] ?? { id: '1', subject: 'Test' })}>Open Test Dialog</button> */}

        {loading ? (
          <div className="loading">Loading tickets...</div>
        ) : (
          <>
            <TicketTable3 tickets={filteredTickets} onTicketClick={handleTicketClick} />

            {showCreateModal && (
              <CreateTicketModal3 onClose={() => setShowCreateModal(false)} onTicketCreated={handleTicketCreated} />
            )}

            {selectedTicket && (
              <TicketDialog3
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
                onTicketUpdated={fetchTickets}
              />
            )}

             <div className="pagination">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </button>
              <div className="pagination-numbers">
                <button
                  className={`page-number ${currentPage === 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
                <button
                  className={`page-number ${currentPage === 2 ? "active" : ""}`}
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </button>
                <button
                  className={`page-number ${currentPage === 3 ? "active" : ""}`}
                  onClick={() => setCurrentPage(3)}
                >
                  3
                </button>
              </div>
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
              <button className="pagination-menu">⋮</button>
            </div>

            {/* <div className="pagination">
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Previous</button>
              <div className="pagination-numbers">
                <button className={`page-number ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
                <button className={`page-number ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
                <button className={`page-number ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
              </div>
              <button className="pagination-btn" onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
              <button className="pagination-menu">⋮</button>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default SupportPage;




//code with create ticket button and editable functionlity
// import React, { useState, useEffect } from 'react';
// import Sidebar2 from '../../components/Sidebar2/Sidebar2';
// import TicketFilters from '../../components/TicketFilters/TicketFilters';
// import TicketTable from '../../components/TicketTable/TicketTable';
// import { getTickets, getTicketById, updateTicket, deleteTicket, addComment } from "../../services/api";
// import CreateTicketModal from '../../components/CreateTicketModal/CreateTicketModal';
// import TicketDialog from "../../components/TicketDialog/TicketDialog";

// import './SupportPage.css';

// const SupportPage = ({ activePage, setActivePage }) => {
//   const activeTab = 'tickets';
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [tickets, setTickets] = useState([]);
//   const [filteredTickets, setFilteredTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   useEffect(() => {
//     filterTickets();
//   }, [activeFilter, searchQuery, tickets]);

//  const fetchTickets = async () => {
//     try {
//       setLoading(true);
//       const data = await getTickets(); // GET /api/tckts/gtalltckt
//       setTickets(data);
//       setFilteredTickets(data);
//     } catch (error) {
//       console.error("Error fetching tickets:", error);
//       alert("Failed to load tickets. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterTickets = () => {
//     let filtered = [...tickets];
//     if (activeFilter !== 'all') {
//       filtered = filtered.filter(
//         (ticket) => ticket.status1?.toLowerCase() === activeFilter.toLowerCase()
//       );
//     }
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (ticket) =>
//           ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ticket.assignee?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ticket.priority?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
//     setFilteredTickets(filtered);
//   };

//   const handleCreateTicket = () => {
//     setShowCreateModal(true);
//   };

//   const handleTicketCreated = async () => {
//     await fetchTickets();
//   };

//   // Robust handleTicketClick with logs + fallback
//   const handleTicketClick = async (ticket) => {
//     console.log('Ticket clicked (from table):', ticket);
//     try {
//       const fullTicket = await ticketAPI.getTicketById(ticket.id);
//       console.log('getTicketById returned:', fullTicket);
//       const ticketObj = fullTicket?.data ?? fullTicket ?? ticket;
//       setSelectedTicket(ticketObj);
//     } catch (error) {
//       console.error('Failed to fetch ticket details (API). Falling back to the row data.', error);
//       setSelectedTicket(ticket);
//     }
//   };

//   const getMockTickets = () => [
//     { id: '1', subject: 'Email not sending', status1: 'Open', priority: 'High', assignee: 'John D.', createdBy: 'Sarah K.', createdAt: '2024-10-26 10:00 AM', updatedAt: '2024-10-26 10:00 AM' },
//     { id: '2', subject: 'Password reset issue', status1: 'Pending', priority: 'Medium', assignee: 'Jane K.', createdBy: 'Mike R.', createdAt: '2024-10-26 10:00 AM', updatedAt: '2024-10-26 10:00 AM' },
//     { id: '3', subject: 'TKT-2024-002', status1: 'Masell', priority: 'Low', assignee: 'Emily C.', createdBy: '', createdAt: '2024-10-25 11:15 AM', updatedAt: '2024-10-25 11:15 AM' },
//     { id: '4', subject: 'Login error on mobile', status1: 'Closed', priority: 'Low', assignee: 'John D.', createdBy: '', createdAt: '2024-10-25 02:00 AM', updatedAt: '2024-10-25 02:00 AM' },
//     { id: '5', subject: 'Integration failed', status1: 'Open', priority: 'Low', assignee: 'David L.', createdBy: '', createdAt: '2024-10-26 01:45 PM', updatedAt: '2024-10-26 01:45 PM' },
//   ];

//   return (
//     <div className="tickets-page">
//       <Sidebar2 activeTab={activePage} setActiveTab={setActivePage} />

//       <div className="main-content">
//         <div className="page-header"><h1>Tickets</h1></div>

//         <TicketFilters
//           activeFilter={activeFilter}
//           setActiveFilter={setActiveFilter}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           onCreateTicket={handleCreateTicket}
//         />

//         {/* Dev test button (optional) */}
//         {/* <button onClick={() => setSelectedTicket(tickets[0] ?? { id: '1', subject: 'Test' })}>Open Test Dialog</button> */}

//         {loading ? (
//           <div className="loading">Loading tickets...</div>
//         ) : (
//           <>
//             <TicketTable tickets={filteredTickets} onTicketClick={handleTicketClick} />

//             {showCreateModal && (
//               <CreateTicketModal onClose={() => setShowCreateModal(false)} onTicketCreated={handleTicketCreated} />
//             )}

//             {selectedTicket && (
//               <TicketDialog
//                 ticket={selectedTicket}
//                 onClose={() => setSelectedTicket(null)}
//                 onTicketUpdated={fetchTickets}
//               />
//             )}

//             {/* <div className="pagination">
//               <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Previous</button>
//               <div className="pagination-numbers">
//                 <button className={`page-number ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
//                 <button className={`page-number ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
//                 <button className={`page-number ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
//               </div>
//               <button className="pagination-btn" onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
//               <button className="pagination-menu">⋮</button>
//             </div> */}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupportPage;

