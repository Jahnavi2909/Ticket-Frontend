import Cookies from "js-cookie";

const API_BASE_URL =
  "https://d36lctvjywsudi.cloudfront.net";

const KnowledgeAPI = {

  async getAllArticles(pagination = { pageNumber: 0, pageSize:  15}) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/kb/gtallkb`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwtToken")}`,
      },
      body: JSON.stringify(pagination),
    });

    if (!response.ok) throw new Error("Failed to fetch articles");
    const result = await response.json();
    return result.data?.articles || []; 
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
},


  // 🔹 Add new KB Article
  async addArticle(article) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/kb/adkb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add article");
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error adding article:", error);
      throw error;
    }
  },

  // 🔹 Update KB Article
  async updateArticle(article) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/kb/updkb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update article");
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  },

  // 🔹 Delete KB Article by ID
  async deleteArticle(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/kb/delkb/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete article");
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  },

  // 🔹 Get KB Article by ID
  async getArticleById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/kb/gtkbid/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwtToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch article by ID");
      }

      const result = await response.json();
      return result.data; // backend returns { message, data }
    } catch (error) {
      console.error("Error fetching article by ID:", error);
      throw error;
    }
  },
};

export default KnowledgeAPI;