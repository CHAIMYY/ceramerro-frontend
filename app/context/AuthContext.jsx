"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = "http://localhost:3001/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/user/register`, userData);
      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      return { success: true, user };
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/user/login`, credentials);
      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      return { success: true, user };
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/artisan/updateProfile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update stored user data
      const updatedUser = { ...user, ...response.data.user };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true, user: updatedUser };
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed");
      return {
        success: false,
        error: err.response?.data?.message || "Profile update failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const isSeller = () => {
    return user?.role === "seller" || user?.role === "artisan";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated,
        isAdmin,
        isSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// "use client"

// import { createContext, useContext, useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import axios from "axios"

// const API_URL = "http://localhost:3001/api"

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const router = useRouter()

//   useEffect(() => {
//     // Check if user is logged in on mount
//     const token = localStorage.getItem("token")
//     if (token) {
//       const userData = JSON.parse(localStorage.getItem("user") || "{}")
//       setUser(userData)
//     }
//     setLoading(false)
//   }, [])

//   const register = async (userData) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await axios.post(`${API_URL}/user/register`, userData)
//       const { token, user } = response.data

//       // Store token and user data
//       localStorage.setItem("token", token)
//       localStorage.setItem("user", JSON.stringify(user))

//       setUser(user)
//       return { success: true, user }
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed")
//       return { success: false, error: err.response?.data?.message || "Registration failed" }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const login = async (credentials) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const response = await axios.post(`${API_URL}/user/login`, credentials)
//       const { token, user } = response.data

//       // Store token and user data
//       localStorage.setItem("token", token)
//       localStorage.setItem("user", JSON.stringify(user))

//       setUser(user)
//       return { success: true, user }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed")
//       return { success: false, error: err.response?.data?.message || "Login failed" }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem("token")
//     localStorage.removeItem("user")
//     setUser(null)
//     router.push("/")
//   }

//   const updateProfile = async (profileData) => {
//     setLoading(true)
//     setError(null)
//     try {
//       const token = localStorage.getItem("token")
//       const response = await axios.put(`${API_URL}/artisan/updateProfile`, profileData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       // Update stored user data
//       const updatedUser = { ...user, ...response.data.user }
//       localStorage.setItem("user", JSON.stringify(updatedUser))
//       setUser(updatedUser)

//       return { success: true, user: updatedUser }
//     } catch (err) {
//       setError(err.response?.data?.message || "Profile update failed")
//       return { success: false, error: err.response?.data?.message || "Profile update failed" }
//     } finally {
//       setLoading(false)
//     }
//   }

//   const isAuthenticated = () => {
//     return !!user
//   }

//   const isAdmin = () => {
//     return user?.role === "admin"
//   }

//   const isSeller = () => {
//     return user?.role === "seller" || user?.role === "artisan"
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         error,
//         register,
//         login,
//         logout,
//         updateProfile,
//         isAuthenticated,
//         isAdmin,
//         isSeller,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
