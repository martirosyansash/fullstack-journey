import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
  
    function logout() {
        localStorage.removeItem("user");
        setUser(null);
    }
    function login(userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }

    return (
        <AuthContext.Provider value={{ user, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
}