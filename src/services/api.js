import Cookies from "js-cookie";

const API_BASE_URL =
  "http://team-env.eba-mghaptds.ap-south-1.elasticbeanstalk.com"; // Replace with your actual API URL

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
          pageSize: 10,
        
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

  // api.js
async updateTicket(ticketData) {
  try {
    // Send null for empty objects instead of default empty values
    const ticketToSend = {
      ...ticketData,
      requesterId: ticketData.requester?.id || ticketData.requesterId || null,
      assigneeId: ticketData.assignee?.id || ticketData.assigneeId || null,
      requester: ticketData.requester || null,
      assignee: ticketData.assignee || null,
      comments: ticketData.comments || [],
      sla: ticketData.sla || null
    };

    const response = await fetch(`${API_BASE_URL}/api/tckts/updt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`
      },
      body: JSON.stringify(ticketToSend),
    });

    if (!response.ok) throw new Error("Failed to update ticket");

    return await response.json(); // This will now return backend's { message, data } format
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
}


async addComment(ticketId, commentData) {
  try {
    // Construct full comment object expected by backend
    const commentToSend = {
      id: 0,
      ticket: ticketId.toString(),
      user: {
        id: commentData.userId,
        name: commentData.userName,
        email: commentData.userEmail,
        role: commentData.userRole,
      },
      userId: commentData.userId,
      body: commentData.body,
      createdAt: new Date().toISOString()
    };

    const response = await fetch(`${API_BASE_URL}/api/tckts/adcmnt/${ticketId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`
      },
      body: JSON.stringify(commentToSend)
    });

    if (!response.ok) throw new Error("Failed to add comment");

    return await response.json();
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

 

  async deleteTicket(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tckts/dlt/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
           Authorization: `Bearer ${Cookies.get("jwtToken")}`
      });

      if (!response.ok) throw new Error("Failed to delete ticket");

      return await response.json();
    } catch (error) {
      console.error("Error deleting ticket:", error);
      throw error;
    }
  }
}

export default new TicketAPI();
