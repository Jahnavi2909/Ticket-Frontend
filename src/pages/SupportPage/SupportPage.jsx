
// ✅ SupportPage1.jsx
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

















//code before deployment
// //before making the code to layout of the page
// import React, { useState, useEffect } from 'react';
// import Sidebar2 from '../../components/Sidebar2/Sidebar2';
// import TicketFilters3 from '../../components/TicketFilters3/TicketFilters3';
// import TicketTable3 from '../../components/TicketTable3/TicketTable3';
// import TicketAPI from '../../services/api'; // ✅ Ensure this matches your import name
// import CreateTicketModal3 from '../../components/CreateTicketModal3/CreateTicketModal3';
// import TicketDialog3 from "../../components/TicketDialog3/TicketDialog3";

// import './SupportPage.css';

// const SupportPage = ({ activePage, setActivePage }) => {
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [tickets, setTickets] = useState([]); // ✅ default to empty array
//   const [filteredTickets, setFilteredTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);
  


//   useEffect(() => {
//       fetchTickets();
//     }, []);
  
//     useEffect(() => {
//       filterTickets();
//     }, [activeFilter, searchQuery, tickets]);


    
  
//     const fetchTickets = async () => {
//         setLoading(true);
//         try {
//           // const data = await ticketAPI.getTickets();
//           // setTickets(data || []);
//           // setFilteredTickets(data || []);
//           const response = await TicketAPI.getTickets();
        
//       const ticketList = response?.data?.ticketDtos || [];

//       console.log("✅ Fetched tickets:", ticketList);
    
//           // const ticketList =
//           //   response?.data?.tickets || // if wrapped inside "data"
//           //   response?.tickets || // if directly inside response
//           //   [];
//           setTickets(ticketList);
//           setFilteredTickets(ticketList);
//         } catch (err) {
//           console.error("Error fetching Tickets:",err);
//           setTickets([]);
//           setFilteredTickets([]);
//         } finally {
//           setLoading(false);
//         }
//       };


//       const filterTickets = () => {
//     let filtered = Array.isArray(tickets) ? [...tickets] : [];

//     if (activeFilter !== 'all') {
//       filtered = filtered.filter(
//         (ticket) => ticket.status?.toLowerCase() === activeFilter.toLowerCase()
//       );
//     }

//     if (searchQuery) {
//       filtered = filtered.filter(
//         (ticket) =>
//           ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ticket.assignee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ticket.priority?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredTickets(filtered);
//   };


//   // ✅ Apply filters and search
//   // useEffect(() => {
//   //   let filtered = Array.isArray(tickets) ? [...tickets] : [];

//   //   if (activeFilter !== 'all') {
//   //     filtered = filtered.filter(
//   //       (ticket) => ticket.status1?.toLowerCase() === activeFilter.toLowerCase()
//   //     );
//   //   }

//   //   if (searchQuery) {
//   //     filtered = filtered.filter(
//   //       (ticket) =>
//   //         ticket.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   //         ticket.assignee?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   //         ticket.priority?.toLowerCase().includes(searchQuery.toLowerCase())
//   //     );
//   //   }

//   //   setFilteredTickets(filtered);
//   // }, [activeFilter, searchQuery, tickets]);

//   // ✅ Open create modal
//   const handleCreateTicket = () => {
//     setShowCreateModal(true);
//   };

//   // ✅ Refresh after creating
//   const handleTicketCreated = async () => {
//     // const res = await TicketAPI.getTickets();
//     // const fetchedTickets = res?.data?.ticketDtos || [];
//     // setTickets(fetchedTickets);
//     await fetchTickets();
//   };

//   // ✅ Open ticket details
//   const handleTicketClick = async (ticket) => {
//     try {
//       const fullTicket = await TicketAPI.getTicketById(ticket.id);
//       const ticketObj = fullTicket?.data ?? fullTicket ?? ticket;
//       setSelectedTicket(ticketObj);
//     } catch (error) {
//       console.error('Failed to fetch ticket details:', error);
//       setSelectedTicket(ticket);
//     }
//   };

//   return (
//     <div className="tickets-page">
//       <Sidebar2 activeTab={activePage} setActiveTab={setActivePage} />

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
//             {/* ✅ Pass tickets safely */}
//             <TicketTable3
//               tickets={filteredTickets}
//               onTicketClick={handleTicketClick}
//             />

//             {showCreateModal && (
//               <CreateTicketModal3
//                 onClose={() => setShowCreateModal(false)}
//                 onTicketCreated={handleTicketCreated}
//               />
//             )}

//             {selectedTicket && (
//               <TicketDialog3
//                 ticket={selectedTicket}
//                 onClose={() => setSelectedTicket(null)}
//                 onTicketUpdated={handleTicketCreated}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupportPage;



//agent  can only see the ticekts creted by him and assigned by the admin
// import React, { useState, useEffect } from "react";
// import Sidebar2 from "../../components/Sidebar2/Sidebar2";
// import TicketFilters3 from "../../components/TicketFilters3/TicketFilters3";
// import TicketTable3 from "../../components/TicketTable3/TicketTable3";
// import TicketDialog3 from "../../components/TicketDialog3/TicketDialog3";
// import CreateTicketModal3 from '../../components/CreateTicketModal3/CreateTicketModal3';
// import TicketAPI from "../../services/api";
// import Cookies from "js-cookie";
// import "./SupportPage.css";

// const SupportPage = ({ activePage, setActivePage }) => {
//   const [tickets, setTickets] = useState([]);
//   const [filteredTickets, setFilteredTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false); 

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const fetchTickets = async () => {
//     setLoading(true);
//     try {
//       const response = await TicketAPI.getTickets();
//       const ticketList = response?.data?.ticketDtos || [];

//       const userRole = Cookies.get("userRole"); // ADMIN | SUPPORT_AGENT | USER
//       const userName = Cookies.get("userName");

//       let visibleTickets = [];

//       if (userRole === "ADMIN") {
//         // ✅ Admin sees everything
//         visibleTickets = ticketList;
//       } 
//       else if (userRole === "SUPPORT_AGENT") {
//         // ✅ Agent sees:
//         // 1️⃣ Tickets they created (as requester)
//         // 2️⃣ Tickets assigned to them (as assignee)
//         // 🚫 No unassigned tickets
//         visibleTickets = ticketList.filter(
//           (t) =>
//             (t.requester?.name?.toLowerCase() === userName?.toLowerCase()) ||
//             (t.assignee?.name?.toLowerCase() === userName?.toLowerCase())
//         );

//         // remove unassigned tickets (no assignee)
//         visibleTickets = visibleTickets.filter((t) => t.assignee && t.assignee.name);
//       } 
//       else if (userRole === "USER") {
//         // ✅ User sees only their own tickets
//         visibleTickets = ticketList.filter(
//           (t) => t.requester?.name?.toLowerCase() === userName?.toLowerCase()
//         );
//       }

//       setTickets(visibleTickets);
//       setFilteredTickets(visibleTickets);
//       console.log("✅ Visible tickets:", visibleTickets);
//     } catch (err) {
//       console.error("❌ Error fetching tickets:", err);
//       setTickets([]);
//       setFilteredTickets([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="tickets-page">
//       <Sidebar2 activeTab={activePage} setActiveTab={setActivePage} />
//       <div className="main-content">
//         <div className="page-header">
//           <h1>Tickets</h1>
//         </div>

//         <TicketFilters3
//           tickets={tickets}
//           setFilteredTickets={setFilteredTickets}
//           onCreateTicket={() => setShowCreateModal(true)}
//         />

//         {loading ? (
//           <div className="loading">Loading tickets...</div>
//         ) : (
//           <TicketTable3
//             tickets={filteredTickets}
//             onTicketClick={(ticket) => setSelectedTicket(ticket)}
//           />
//         )}

//         {selectedTicket && (
//           <TicketDialog3
//             ticket={selectedTicket}
//             onClose={() => setSelectedTicket(null)}
//             onTicketUpdated={fetchTickets}
//           />
//         )}

//          {showCreateModal && (
//           <CreateTicketModal3
//             onClose={() => setShowCreateModal(false)}
//             onTicketCreated={fetchTickets}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupportPage;

