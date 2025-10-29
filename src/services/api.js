import Cookies from "js-cookie";


const API_BASE_URL =
  "https://d1k8v9mokmxhao.cloudfront.net"; 

class TicketAPI {
   async getTickets() {
    console.log(Cookies.get("jwtToken"));
    try {
      const response = await fetch(`${API_BASE_URL}/api/tckts/get-tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
        body: JSON.stringify({
          pageNumber: 0,
          pageSize:50,
        
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  }

  async getTicketById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tckts/gtckt/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ticket");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching ticket:", error);
      throw error;
    }
  }

  async raiseTicket(ticketData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tckts/rstckt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${Cookies.get("jwtToken")}`
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  }



// async updateTicket(ticketData) {
//   try {
//     // Simplify to match backend DTO - backend will handle the nested objects
//     const ticketToSend = {
//       id: ticketData.id,
//       requesterId: ticketData.requesterId || ticketData.requester?.id || null,
//       assigneeId: ticketData.assigneeId || ticketData.assignee?.id || null,
//       subject: ticketData.subject,
//       status: ticketData.status.toUpperCase(),
//       priority: ticketData.priority.toUpperCase(),
//       // Don't send nested objects unless backend DTO expects them
//       // Backend will fetch requester/assignee by IDs
//     };

//     console.log("API: Sending update request:", JSON.stringify(ticketToSend, null, 2));
    
//     const response = await fetch(`${API_BASE_URL}/api/tckts/updt`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${Cookies.get("jwtToken")}`
//       },
//       body: JSON.stringify(ticketToSend),
//     });

//     // Handle non-JSON responses (like HTML error pages)
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       console.error("Received non-JSON response:", await response.text());
//       throw new Error("Server returned an error. Please check if you're logged in.");
//     }

//     const responseData = await response.json();
   
//     if (!response.ok) {
//       console.error("Update failed:", responseData);
//       throw new Error(responseData.message || "Failed to update ticket");
//     }
    
//     console.log("Update successful:", responseData);
//     return responseData;
    
//   } catch (error) {
//     console.error("Error updating ticket:", error);
//     throw error;
//   }
// }


async updateTicket(ticketData) {
  try {
    // Include IDs to satisfy backend DTO mapping
    const ticketToSend = {
      id: ticketData.id,
      requesterId: ticketData.requesterId || ticketData.requester?.id || null,
      assigneeId: ticketData.assigneeId || ticketData.assignee?.id || null,
      subject: ticketData.subject,
      status: ticketData.status?.toUpperCase(),
      priority: ticketData.priority?.toUpperCase(),
      createdAt: ticketData.createdAt || null,
      updatedAt: new Date().toISOString(), // optional, backend can override
    };

    console.log("API: Sending update request:", JSON.stringify(ticketToSend, null, 2));

    const response = await fetch(`${API_BASE_URL}/api/tckts/updt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify(ticketToSend),
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Received non-JSON response:", await response.text());
      throw new Error("Server returned an error. Please check if you're logged in.");
    }

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Update failed:", responseData);
      throw new Error(responseData.message || "Failed to update ticket");
    }

    console.log("Update successful:", responseData);
    return responseData;

  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
}





async addComment(ticketId, commentData) {
  try {
    const commentToSend = {
      id: 0,
      ticket: { id: ticketId }, // minimal TicketDto
      user: {
        id: commentData.userId,
        name: commentData.userName,
        email: commentData.userEmail,
        role: commentData.userRole,
      },
      userId: commentData.userId,
      body: commentData.body,
      createdAt: new Date().toISOString(),
    };

    console.log("API: Sending comment:", JSON.stringify(commentToSend, null, 2));

    const response = await fetch(`${API_BASE_URL}/api/tckts/adcmnt/${ticketId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify(commentToSend),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Add comment failed:", responseData);
      throw new Error(responseData.message || "Failed to add comment");
    }

    console.log("Comment added successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}



  async assignTicket(assignmentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tckts/asgntckt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
             Authorization: `Bearer ${Cookies.get("jwtToken")}`
        },
        body: JSON.stringify(assignmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to assign ticket");
      }

      return await response.json();
    } catch (error) {
      console.error("Error assigning ticket:", error);
      throw error;
    }
  }


   async getBreachedTickets(pageNumber = 0, pageSize = 10) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/tckts/breached?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwtToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch breached tickets");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching breached tickets:", error);
      throw error;
    }
  }
 

  
}

export default new TicketAPI();