import Cookies from "js-cookie";

const API_BASE_URL = "https://d1k8v9mokmxhao.cloudfront.net"; // 🔹 Replace with your backend URL


//  Register new user
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/ath/sgnp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jwtToken")}`
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};

// Login user (for your Login.jsx)
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/ath/lgn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jwtToken")}`
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  // localStorage.setItem("token", data.token); // Save JWT
  return data;
};

//  Change Password
export const changePassword = async (email, oldPassword, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ath/chngpswrd`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, oldPassword, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to change password");
    }

    return await response.json();
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
