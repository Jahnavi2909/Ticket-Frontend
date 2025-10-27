

//code before deployment
// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import "./TicketDialog2.css";
// import ticketAPI from "../../services/api";
// import Cookies from "js-cookie";

// const TicketDialogContent = ({ ticket, onClose, onTicketUpdated }) => {
//   const [comment, setComment] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedTicket, setUpdatedTicket] = useState(ticket || {});
//   const [loading, setLoading] = useState(false);
//   const [agents, setAgents] = useState([]);
//   const [selectedAgent, setSelectedAgent] = useState("");

//   useEffect(() => {
//     setUpdatedTicket(ticket || {});
//     console.log("TicketDialog mounted with ticket:", ticket);
//     fetchAgents();
//     return () => console.log("TicketDialog unmount");
//   }, [ticket]);

//   const fetchAgents = async () => {
//     try {
//       const res = await fetch(
//         `${
//           process.env.REACT_APP_API_BASE_URL ||
//           "https://team-env.eba-mghaptds.ap-south-1.elasticbeanstalk.com"
//         }/api/usr/getAllSupportAgents`,
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("jwtToken")}`,
//           },
//         }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         setAgents(data?.data || []); // assuming backend returns { data: [agents] }
//       } else {
//         console.error("Failed to fetch agents:", data.message);
//       }
//     } catch (err) {
//       console.error("Error fetching agents:", err);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedTicket({ ...updatedTicket, [name]: value });
//   };

//   const handleUpdate = async () => {
//     setLoading(true);
//     try {
//       const ticketToUpdate = {
//         id: updatedTicket.id,
//         requesterId: updatedTicket.requester?.id || updatedTicket.requesterId,
//         assigneeId:
//           updatedTicket.assignee?.id || updatedTicket.assigneeId || null,
//         subject: updatedTicket.subject,
//         status: updatedTicket.status.toUpperCase(),
//         priority: updatedTicket.priority.toUpperCase(),
//       };

//       console.log("Sending update payload:", ticketToUpdate);
//       const result = await ticketAPI.updateTicket(ticketToUpdate);
//       console.log("Update result:", result);
//       onTicketUpdated();
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Update error:", err);
//       alert(`Failed to update ticket: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAssignAgent = async () => {
//     if (!selectedAgent) {
//       alert("Please select an agent to assign the ticket.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const assignmentData = {
//         id: updatedTicket.id,
//         assigneeId: parseInt(selectedAgent),
//       };

//       console.log("Assigning ticket:", assignmentData);
//       const result = await ticketAPI.assignTicket(assignmentData);
//  console.log("Assign Ticket Response:", result);
    
//  const updatedTicketData = {
//       id: updatedTicket.id,
//       requesterId: updatedTicket.requester?.id || updatedTicket.requesterId,
//       assigneeId: parseInt(selectedAgent),
//       subject: updatedTicket.subject,
//       status: "IN_PROGRESS",
//       priority: updatedTicket.priority.toUpperCase(),
//     };

//     console.log("Updating ticket status to IN_PROGRESS:", updatedTicketData);
//     await ticketAPI.updateTicket(updatedTicketData);

//     // 3️⃣ Update local state and notify parent
//     setUpdatedTicket({
//       ...updatedTicket,
//       assigneeId: parseInt(selectedAgent),
//       status: "IN_PROGRESS",
//     });
 
 
//  alert("✅ Ticket successfully assigned!");
//       onTicketUpdated();
//       setSelectedAgent("");
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Error assigning ticket:", err);
//       alert("Failed to assign ticket. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddComment = async () => {
//     if (!comment.trim()) return alert("Please enter a comment.");
//     setLoading(true);
//     try {
//       const currentUser = {
//         id: parseInt(Cookies.get("userId")),
//         name: Cookies.get("userName"),
//         email: Cookies.get("userEmail"),
//         role: Cookies.get("userRole"),
//       };

//       const newComment = {
//         userId: currentUser.id,
//         body: comment,
//       };

//       const addedComment = await ticketAPI.addComment(ticket.id, newComment);
//       setUpdatedTicket({
//         ...updatedTicket,
//         comments: [...(updatedTicket.comments || []), addedComment.data],
//       });

//       setComment("");
//     } catch (err) {
//       console.error("Error adding comment:", err);
//       alert("Failed to add comment. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="ticket-dialog-overlay" onClick={onClose}>
//       <div className="ticket-dialog" onClick={(e) => e.stopPropagation()}>
//         <div className="dialog-header">
//           <h3>Ticket Details</h3>
//           <button className="close-btn" onClick={onClose}>
//             ✖
//           </button>
//         </div>

//         <div className="dialog-content">
//           {isEditing ? (
//             <>
//               <label>Subject:</label>
//               <input
//                 type="text"
//                 name="subject"
//                 value={updatedTicket.subject || ""}
//                 onChange={handleInputChange}
//               />

//               <label>Status:</label>
//               <select
//                 name="status"
//                 value={updatedTicket.status || "OPEN"}
//                 onChange={handleInputChange}
//               >
//                 <option value="OPEN">Open</option>
//                 <option value="IN_PROGRESS">IN_PROGRESS</option>
//                 <option value="CLOSED">Closed</option>
//               </select>

//               <label>Priority:</label>
//               <select
//                 name="priority"
//                 value={updatedTicket.priority || "MEDIUM"}
//                 onChange={handleInputChange}
//               >
//                 <option value="LOW">Low</option>
//                 <option value="MEDIUM">Medium</option>
//                 <option value="HIGH">High</option>
//               </select>

//               {/* ✅ Input field for assigning agent by ID */}
//               <label>Assign to Support Agent (Enter Agent ID):</label>
//               <input
//                 type="number"
//                 value={selectedAgent}
//                 onChange={(e) => setSelectedAgent(e.target.value)}
//                 placeholder="Enter agent ID"
//               />

              

//               <button
//                 className="assign-btn"
//                 onClick={handleAssignAgent}
//                 disabled={loading}
//                 style={{ marginTop: "10px" }}
//               >
//                 {loading ? "Assigning..." : "Assign Ticket"}
//               </button>
//             </>
//           ) : (
//             <>
//               <p>
//                 <strong>ID:</strong> {ticket.id}
//               </p>
//               <p>
//                 <strong>Subject:</strong> {ticket.subject}
//               </p>
//               <p>
//                 <strong>Status:</strong> {ticket.status}
//               </p>
//               <p>
//                 <strong>Priority:</strong> {ticket.priority}
//               </p>
//               <p>
//                 <strong>Requester:</strong> {ticket.requester?.name || "-"}
//               </p>
//               <p>
//                 <strong>Assignee:</strong>{" "}
//                 {ticket.assignee?.name || "Unassigned"}
//               </p>
//               <p>
//                 <strong>Created At:</strong> {ticket.createdAt}
//               </p>
//               <p>
//                 <strong>Updated At:</strong> {ticket.updatedAt}
//               </p>

//               <h4>Comments</h4>
//               <ul>
//                 {(updatedTicket.comments || []).map((c) => (
//                   <li key={c.id}>
//                     <strong>{c.user?.name || "Unknown"}:</strong> {c.body}
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>

//         <div className="dialog-footer">
//           {isEditing ? (
//             <>
//               <button
//                 className="save-btn"
//                 onClick={handleUpdate}
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//               <button
//                 className="cancel-btn"
//                 onClick={() => setIsEditing(false)}
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button className="edit-btn" onClick={() => setIsEditing(true)}>
//               Edit
//             </button>
//           )}
//         </div>

//         <div className="comment-section">
//           <h4>Add Comment</h4>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Write your comment..."
//           />
//           <button
//             className="comment-btn"
//             onClick={handleAddComment}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit Comment"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TicketDialog = (props) => {
//   if (typeof document === "undefined") return null;
//   return ReactDOM.createPortal(
//     <TicketDialogContent {...props} />,
//     document.body
//   );
// };

// export default TicketDialog;










// // //code with perfect working of editing and commenting by connecting api's
// // import React, { useState, useEffect } from "react";
// // import ReactDOM from "react-dom";
// // import "./TicketDialog2.css";
// // import ticketAPI from "../../services/api";
// // import Cookies from "js-cookie";

// // const TicketDialogContent = ({ ticket, onClose, onTicketUpdated }) => {
// //   const [comment, setComment] = useState("");
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [updatedTicket, setUpdatedTicket] = useState(ticket || {});
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     setUpdatedTicket(ticket || {});
// //     console.log("TicketDialog mounted with ticket:", ticket);
// //     return () => console.log("TicketDialog unmount");
// //   }, [ticket]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setUpdatedTicket({ ...updatedTicket, [name]: value });
// //   };

// //   const handleUpdate = async () => {
// //   setLoading(true);
// //   try {
// //     // Only send what the backend needs
// //     const ticketToUpdate = {
// //       id: updatedTicket.id,
// //       requesterId: updatedTicket.requester?.id || updatedTicket.requesterId,
// //       assigneeId: updatedTicket.assigneeId || 0,
// //       subject: updatedTicket.subject,
// //       status: updatedTicket.status.toUpperCase(),
// //       priority: updatedTicket.priority.toUpperCase(),
// //     };

// //     console.log("Sending update payload:", ticketToUpdate);

// //     const result = await ticketAPI.updateTicket(ticketToUpdate);

// //     console.log("Update result:", result);
// //     onTicketUpdated();
// //     setIsEditing(false);

// //   } catch (err) {
// //     console.error("Update error:", err);
// //     alert(`Failed to update ticket: ${err.message}`);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   // const handleUpdate = async () => {
// //   //   setLoading(true);
// //   //   try {
// //   //     // Prepare the ticket data matching backend structure exactly
// //   //     const ticketToUpdate = {
// //   //       id: updatedTicket.id,
// //   //       requester: updatedTicket.requester || {
// //   //         id: updatedTicket.requesterId,
// //   //         email: updatedTicket.requester?.email || "string",
// //   //         name: updatedTicket.requester?.name || "string",
// //   //         role: updatedTicket.requester?.role || "string",
// //   //       },
// //   //       requesterId: updatedTicket.requester?.id || updatedTicket.requesterId,
// //   //       assignee: updatedTicket.assignee || null,
// //   //       assigneeId: updatedTicket.assigneeId || 0,
// //   //       subject: updatedTicket.subject,
// //   //       status: updatedTicket.status.toUpperCase(), // Backend expects uppercase
// //   //       priority: updatedTicket.priority.toUpperCase(), // Backend expects uppercase
// //   //       createdAt: updatedTicket.createdAt,
// //   //       updatedAt: updatedTicket.updatedAt,
// //   //       comments: (updatedTicket.comments || []).map((c) => ({
// //   //         id: c.id || 0,
// //   //         ticket: String(updatedTicket.id), // Must be string
// //   //         user: c.user || {
// //   //           id: c.userId || 0,
// //   //           email: c.user?.email || "string",
// //   //           name: c.user?.name || "string",
// //   //           role: c.user?.role || "string",
// //   //         },
// //   //         userId: c.user?.id || c.userId || 0,
// //   //         body: c.body,
// //   //         createdAt: c.createdAt || new Date().toISOString(),
// //   //       })),
// //   //       sla: updatedTicket.sla || null,
// //   //     };

// //   //     console.log("Sending update payload:", ticketToUpdate);

// //   //     await ticketAPI.updateTicket(ticketToUpdate);
// //   //     onTicketUpdated();
// //   //     setIsEditing(false);
// //   //   } catch (err) {
// //   //     console.error("Update error:", err);
// //   //     alert("Failed to update ticket. Please check the console for details.");
// //   //   } finally {
// //   //     setLoading(false);
// //   //   }
// //   // };

// //   const handleDelete = async () => {
// //     if (!window.confirm("Are you sure you want to delete this ticket?")) return;
// //     setLoading(true);
// //     try {
// //       await ticketAPI.deleteTicket(ticket.id);
// //       onTicketUpdated();
// //       onClose();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to delete ticket.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAddComment = async () => {
// //     if (!comment.trim()) return alert("Please enter a comment.");
// //     setLoading(true);
// //     try {
// //       const currentUser = {
// //         id: parseInt(Cookies.get("userId")),
// //         name: Cookies.get("userName"),
// //         email: Cookies.get("userEmail"),
// //         role: Cookies.get("userRole"),
// //       };

// //       const newComment = {
// //         userId: currentUser.id,
// //         userName: currentUser.name,
// //         userEmail: currentUser.email,
// //         userRole: currentUser.role,
// //         body: comment,
// //       };

// //       const addedComment = await ticketAPI.addComment(ticket.id, newComment);

// //       // Update local ticket comments
// //       setUpdatedTicket({
// //         ...updatedTicket,
// //         comments: [...(updatedTicket.comments || []), addedComment.data],
// //       });

// //       setComment("");
// //     } catch (err) {
// //       console.error(err);
// //        console.error("Error adding comment:", err);
// //       alert("Failed to add comment.check console.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="ticket-dialog-overlay" onClick={onClose}>
// //       <div className="ticket-dialog" onClick={(e) => e.stopPropagation()}>
// //         <div className="dialog-header">
// //           <h3>Ticket Details</h3>
// //           <button className="close-btn" onClick={onClose}>
// //             ✖
// //           </button>
// //         </div>

// //         <div className="dialog-content">
// //           {isEditing ? (
// //             <>
// //               <label>Subject:</label>
// //               <input
// //                 type="text"
// //                 name="subject"
// //                 value={updatedTicket.subject || ""}
// //                 onChange={handleInputChange}
// //               />

// //               <label>Status:</label>
// //               <select
// //                 name="status"
// //                 value={updatedTicket.status || "OPEN"}
// //                 onChange={handleInputChange}
// //               >
// //                 <option value="OPEN">Open</option>
// //                 <option value="IN_PROGRESS">IN_PROGRESS</option>
// //                 <option value="CLOSED">Closed</option>
// //               </select>

// //               <label>Priority:</label>
// //               <select
// //                 name="priority"
// //                 value={updatedTicket.priority || "MEDIUM"}
// //                 onChange={handleInputChange}
// //               >
// //                 <option value="LOW">Low</option>
// //                 <option value="MEDIUM">Medium</option>
// //                 <option value="HIGH">High</option>
// //               </select>

// //               <label>Assignee ID (optional):</label>
// //               <input
// //                 type="number"
// //                 name="assigneeId"
// //                 value={updatedTicket.assigneeId || ""}
// //                 onChange={handleInputChange}
// //                 placeholder="Enter assignee user ID or leave 0 for unassigned"
// //               />
// //             </>
// //           ) : (
// //             <>
// //               <p>
// //                 <strong>ID:</strong> {ticket.id}
// //               </p>
// //               <p>
// //                 <strong>Subject:</strong> {ticket.subject}
// //               </p>
// //               <p>
// //                 <strong>Status:</strong> {ticket.status}
// //               </p>
// //               <p>
// //                 <strong>Priority:</strong> {ticket.priority}
// //               </p>
// //               <p>
// //                 <strong>Requester:</strong> {ticket.requester?.name || "-"}
// //               </p>
// //               <p>
// //                 <strong>Assignee:</strong>{" "}
// //                 {ticket.assignee?.name || "Unassigned"}
// //               </p>
// //               <p>
// //                 <strong>Created At:</strong> {ticket.createdAt}
// //               </p>
// //               <p>
// //                 <strong>Updated At:</strong> {ticket.updatedAt}
// //               </p>

// //               <h4>Comments</h4>
// //               <ul>
// //                 {(updatedTicket.comments || []).map((c) => (
// //                   <li key={c.id}>
// //                     <strong>{c.user?.name || "Unknown"}:</strong> {c.body}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </>
// //           )}
// //         </div>

// //         <div className="dialog-footer">
// //           {isEditing ? (
// //             <>
// //               <button
// //                 className="save-btn"
// //                 onClick={handleUpdate}
// //                 disabled={loading}
// //               >
// //                 {loading ? "Saving..." : "Save"}
// //               </button>
// //               <button
// //                 className="cancel-btn"
// //                 onClick={() => setIsEditing(false)}
// //               >
// //                 Cancel
// //               </button>
// //             </>
// //           ) : (
// //             <>
// //               <button className="edit-btn" onClick={() => setIsEditing(true)}>
// //                 Edit
// //               </button>

// //             </>
// //           )}
// //         </div>

// //         <div className="comment-section">
// //           <h4>Add Comment</h4>
// //           <textarea
// //             value={comment}
// //             onChange={(e) => setComment(e.target.value)}
// //             placeholder="Write your comment..."
// //           />
// //           <button
// //             className="comment-btn"
// //             onClick={handleAddComment}
// //             disabled={loading}
// //           >
// //             {loading ? "Submitting..." : "Submit Comment"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const TicketDialog = (props) => {
// //   if (typeof document === "undefined") return null;
// //   return ReactDOM.createPortal(
// //     <TicketDialogContent {...props} />,
// //     document.body
// //   );
// // };

// // export default TicketDialog;




import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./TicketDialog2.css";
import ticketAPI from "../../services/api";
import Cookies from "js-cookie";

const TicketDialogContent = ({ ticket, onClose, onTicketUpdated }) => {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTicket, setUpdatedTicket] = useState(ticket || {});
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  useEffect(() => {
    setUpdatedTicket(ticket || {});
    console.log("TicketDialog mounted with ticket:", ticket);
    fetchAgents();
    return () => console.log("TicketDialog unmount");
  }, [ticket]);

  const fetchAgents = async () => {
    try {
      const res = await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL ||
          "https://team-env.eba-mghaptds.ap-south-1.elasticbeanstalk.com"
        }/api/usr/getAllSupportAgents`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwtToken")}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setAgents(data?.data || []); // assuming backend returns { data: [agents] }
      } else {
        console.error("Failed to fetch agents:", data.message);
      }
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTicket({ ...updatedTicket, [name]: value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const ticketToUpdate = {
        id: updatedTicket.id,
        requesterId: updatedTicket.requester?.id || updatedTicket.requesterId,
        assigneeId:
          updatedTicket.assignee?.id || updatedTicket.assigneeId || null,
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

  const handleAssignAgent = async () => {
    if (!selectedAgent) {
      alert("Please select an agent to assign the ticket.");
      return;
    }
    setLoading(true);
    try {
      const assignmentData = {
        id: updatedTicket.id,
        assigneeId: parseInt(selectedAgent),
      };

      console.log("Assigning ticket:", assignmentData);
      const result = await ticketAPI.assignTicket(assignmentData);
 console.log("Assign Ticket Response:", result);
    
 const updatedTicketData = {
      id: updatedTicket.id,
      requesterId: updatedTicket.requester?.id || updatedTicket.requesterId,
      assigneeId: parseInt(selectedAgent),
      subject: updatedTicket.subject,
      status: "IN_PROGRESS",
      priority: updatedTicket.priority.toUpperCase(),
    };

    console.log("Updating ticket status to IN_PROGRESS:", updatedTicketData);
    await ticketAPI.updateTicket(updatedTicketData);

    // 3️⃣ Update local state and notify parent
    setUpdatedTicket({
      ...updatedTicket,
      assigneeId: parseInt(selectedAgent),
      status: "IN_PROGRESS",
    });
 
 
 alert("✅ Ticket successfully assigned!");
      onTicketUpdated();
      setSelectedAgent("");
      setIsEditing(false);
    } catch (err) {
      console.error("Error assigning ticket:", err);
      alert("Failed to assign ticket. Check console for details.");
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
        body: comment,
      };

      const addedComment = await ticketAPI.addComment(ticket.id, newComment);
      setUpdatedTicket({
        ...updatedTicket,
        comments: [...(updatedTicket.comments || []), addedComment.data],
      });

      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment. Check console.");
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

              <label>Status:</label>
              <select
                name="status"
                value={updatedTicket.status || "OPEN"}
                onChange={handleInputChange}
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CLOSED">Closed</option>
              </select>

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

              {/* ✅ Input field for assigning agent by ID */}
              <label>Assign to Support Agent (Enter Agent ID):</label>
              <input
                type="number"
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                placeholder="Enter agent ID"
              />

              

              <button
                className="assign-btn"
                onClick={handleAssignAgent}
                disabled={loading}
                style={{ marginTop: "10px" }}
              >
                {loading ? "Assigning..." : "Assign Ticket"}
              </button>
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

              <h4>Comments</h4>
              <ul>
                {(updatedTicket.comments || []).map((c) => (
                  <li key={c.id}>
                    <strong>{c.user?.name || "Unknown"}:</strong> {c.body}
                  </li>
                ))}
              </ul>
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
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>

        <div className="comment-section">
          <h4>Add Comment</h4>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
          />
          <button
            className="comment-btn"
            onClick={handleAddComment}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Comment"}
          </button>
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