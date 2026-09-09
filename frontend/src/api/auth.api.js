import api from "./axios";

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
}

export const updateProfile = async (name) => {
  const response = await api.put("/auth/edit-profile", { newName: name });
  return response.data;
}

export const verifyOtp = async (otp) => {
  const response = await api.post("/auth/verify-otp", { otp });
  return response.data;
}

export const sendOtp = async (email) => {
  const response = await api.post("/auth/send-otp", { email });
  return response.data;
}

export const resetPassword = async ({ email, otp, newPassword }) => {
  const response = await api.post("/auth/reset-password", { email, otp, newPassword });
  return response.data;
}

export const sendPasswordResetOtp = async (email) => {
  const response = await api.post("/auth/send-password-reset-otp", { email });
  return response.data;
}