// // code with only create ticket button
// import React, { useState, useEffect } from 'react';
// import Sidebar2 from '../../components/Sidebar2/Sidebar2';
// import TicketFilters3 from '../../components/TicketFilters/TicketFilters';
// import TicketTable3 from '../../components/TicketTable/TicketTable';
// import ticketAPI from '../../services/api';
// import CreateTicketModal3 from '../../components/CreateTicketModal/CreateTicketModal';
// import TicketDialog3 from "../../components/TicketDialog/TicketDialog";

// import './SupportPage3.css';

// const SupportPage3 = ({activePage, setActivePage}) => {

//   const activeTab = 'tickets';
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [tickets, setTickets] = useState([]);
//   const [filteredTickets, setFilteredTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);

//   // Fetch tickets on component mount
//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   // Filter tickets when filter or search changes
//   useEffect(() => {
//     filterTickets();
//   }, [activeFilter, searchQuery, tickets]);

//   const fetchTickets = async () => {
//     setLoading(true);
//     try {
//       const data = await ticketAPI.getTickets();
//       // Assuming API returns an array of tickets
//       setTickets(data);
//     } catch (error) {
//       console.error('Failed to fetch tickets:', error);
//       // Use mock data if API fails
//       setTickets(getMockTickets());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterTickets = () => {
//     let filtered = [...tickets];

//     // Filter by status
//     if (activeFilter !== 'all') {
//       filtered = filtered.filter(
//         (ticket) => ticket.status1.toLowerCase() === activeFilter.toLowerCase()
//       );
//     }

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(
//         (ticket) =>
//           ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ticket.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ticket.priority.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredTickets(filtered);
//   };

//   const handleCreateTicket =  () => {
//     // Implement create ticket modal or navigation
//     // console.log('Create ticket clicked');
//     setShowCreateModal(true);
//     // Example:
//     // const newTicket = {
//     //   subject: 'New Ticket',
//     //   priority: 'Medium',
//     //   status: 'Open'
//     // };
//     // await ticketAPI.raiseTicket(newTicket);
//     // fetchTickets();
//   };

//    const handleTicketCreated = async () => {
//     await fetchTickets(); // ✅ Refresh tickets after creation
//   };

//   const handleTicketClick = async (ticket) => {
//     // Fetch full ticket details and show modal/navigate
//     console.log('Ticket clicked:', ticket);
//     try {
//       const fullTicket = await ticketAPI.getTicketById(ticket.id);
//       // console.log('Full ticket details:', fullTicket);
//       setSelectedTicket(fullTicket);
//       // Show modal or navigate to ticket detail page
//     } catch (error) {
//       console.error('Failed to fetch ticket details:', error);
//     }
//   };

//   const getMockTickets = () => {
//     return [
//       {
//         id: '1',
//         subject: 'Email not sending',
//         status1: 'Open',
//         // status2: 'High',
//         priority: 'Open',
//         assignee: 'John D.',
//         createdBy: 'Sarah K.',
//         createdAt: '2024-10-26 10:00 AM',
//         updatedAt: '2024-10-26 10:00 AM',
//       },
//       {
//         id: '2',
//         subject: 'Password reset issue',
//         status1: 'Pending',
//         // status2: 'Medium',
//         priority: 'Jane S.',
//         assignee: 'Jane K.',
//         createdBy: 'Mike R.',
//         createdAt: '2024-10-26 10:00 AM',
//         updatedAt: '2024-10-26 10:00 AM',
//       },
//       {
//         id: '3',
//         subject: 'TKT-2024-002',
//         status1: 'Masell',
//         // status2: 'Low',
//         priority: 'Low',
//         assignee: 'Emily C.',
//         createdBy: '',
//         createdAt: '2024-10-25 03:30 10-26 11:15 AM',
//         updatedAt: '2024-10-25 03:30 10-26 11:15 AM',
//       },
//       {
//         id: '4',
//         subject: 'Login error on mobile',
//         status1: 'Closed',
//         // status2: 'Low',
//         priority: 'Emild L.',
//         assignee: 'John D.',
//         createdBy: '',
//         createdAt: '2024-10-25 03:00 10-26 02:00 AM',
//         updatedAt: '2024-10-25 03:00 10-26 02:00 AM',
//       },
//       {
//         id: '5',
//         subject: 'Integration failed',
//         status1: 'Open',
//         // status2: 'High',
//         priority: 'Low',
//         assignee: 'David L.',
//         createdBy: '',
//         createdAt: '2024-10-26 03:24 10-26 01:45 PM',
//         updatedAt: '2024-10-26 03:24 10-26 01:45 PM',
//       },

//     ];
//   };

//   return (
//     <div className="tickets-page">
//       <Sidebar2 activeTab ={activePage} setActiveTab={setActivePage} />

//       <div className="main-content">
//         <div className="page-header">
//           <h1>Tickets</h1>
//         </div>

//         <TicketFilters3
//           activeFilter={activeFilter}
//           setActiveFilter={setActiveFilter}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           onCreateTicket={handleCreateTicket}
//         />

//         {loading ? (
//           <div className="loading">Loading tickets...</div>
//         ) : (
//           <>
//             <TicketTable3
//               tickets={filteredTickets}
//               onTicketClick={handleTicketClick}
//             />

//             {showCreateModal && (
//         <CreateTicketModal3
//           onClose={() => setShowCreateModal(false)}
//           onTicketCreated={handleTicketCreated}
//         />
//       )}

//       {/* ✅ Ticket Dialog */}
//             {selectedTicket && (
//               <TicketDialog3
//                 ticket={selectedTicket}
//                 onClose={() => setSelectedTicket(null)}
//                 onTicketUpdated={fetchTickets}
//               />
//             )}

//             <div className="pagination">
//               <button
//                 className="pagination-btn"
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage((prev) => prev - 1)}
//               >
//                 Previous
//               </button>

//               <div className="pagination-numbers">
//                 <button className={`page-number ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
//                 <button className={`page-number ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
//                 <button className={`page-number ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
//               </div>

//               <button
//                 className="pagination-btn"
//                 onClick={() => setCurrentPage((prev) => prev + 1)}
//               >
//                 Next
//               </button>

//               <button className="pagination-menu">⋮</button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupportPage3;

//code with create ticket button and editable functionlity
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import TicketFilters from "../../components/TicketFilters/TicketFilters";
import TicketTable from "../../components/TicketTable/TicketTable";
import ticketAPI from "../../services/api";
import CreateTicketModal from "../../components/CreateTicketModal/CreateTicketModal";
import TicketDialog from "../../components/TicketDialog/TicketDialog";

import "./SupportPage3.css";

const SupportPage3 = ({ activePage, setActivePage }) => {
  const activeTab = "tickets";
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
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
     

      // const ticketList =
      //   response?.data?.tickets || // if wrapped inside "data"
      //   response?.tickets || // if directly inside response
      //   [];

       let ticketList = (response?.data?.ticketDtos || []).map(t => ({
  ...t,
  status1: t.status // map backend 'status' to frontend 'status1'
}));


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
      <Sidebar activeTab={activePage} setActiveTab={setActivePage} />

      <div className="main-content">
        <div className="page-header">
          <h1>Tickets</h1>
        </div>

        <TicketFilters
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
            <TicketTable
              tickets={filteredTickets}
              onTicketClick={handleTicketClick}
            />

            {showCreateModal && (
              <CreateTicketModal
                onClose={() => setShowCreateModal(false)}
                onTicketCreated={handleTicketCreated}
              />
            )}

            {selectedTicket && (
              <TicketDialog
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
                onTicketUpdated={fetchTickets}
                userRole="USER"
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
          </>
        )}
      </div>
    </div>
  );
};

export default SupportPage3;
