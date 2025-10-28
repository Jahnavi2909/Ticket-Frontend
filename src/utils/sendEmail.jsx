// src/utils/sendEmail.js
import emailjs from "emailjs-com";

export const sendTicketEmail = async (recipient, ticket, isAgent) => {
  const serviceID = "service_qhxq57m";  // from EmailJS dashboard
const templateID = isAgent ? "agent_template" : "user_template";
  const publicKey = "tEH-1mCfa_CPHlHzj";

  const templateParams = {
    recipient: recipient.name,               
    ticket_id: ticket.id,                         
    subject: ticket.subject,
    status: ticket.status,
    priority: ticket.priority,
    created_on: new Date(ticket.createdAt).toLocaleString(),
  };

  try {
    const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);
    console.log(`✅ Email sent to ${recipient.email}:`, result.status);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};
