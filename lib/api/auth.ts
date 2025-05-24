export interface LoginCredentials {
  email: string;
  password: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginUser = async (credentials: LoginCredentials) => {
  const res = await fetch(`${baseUrl}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");
  console.log(refresh);
  const res = await fetch(`${baseUrl}/login/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to refresh token");
  }
  const result = await res.json();
  localStorage.setItem("accessToken", result?.access);
  localStorage.setItem("refreshToken", result?.refresh);
};
