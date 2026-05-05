import apiRequest from "./apiClient";

function saveAuthData(response) {
  if (response?.token) {
    localStorage.setItem("iles_token", response.token);
  }

  if (response?.user) {
    localStorage.setItem("iles_user", JSON.stringify(response.user));
  }

  return response;
}

function clearAuthData() {
  localStorage.removeItem("iles_token");
  localStorage.removeItem("iles_user");
}

export async function loginUser(data) {
  const response = await apiRequest("/users/auth/login/", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return saveAuthData(response);
}

export async function registerUser(data) {
  const response = await apiRequest("/users/auth/register/", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return saveAuthData(response);
}

export async function logoutUser() {
  try {
    const response = await apiRequest("/users/auth/logout/", {
      method: "POST",
    });

    clearAuthData();

    return response;
  } catch (error) {
    clearAuthData();
    throw error;
  }
}

export function getCurrentUser() {
  return apiRequest("/users/auth/me/");
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("iles_user"));
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return localStorage.getItem("iles_token");
}

export const login = loginUser;
export const register = registerUser;
export const logout = logoutUser;
export const getCurrent = getCurrentUser;