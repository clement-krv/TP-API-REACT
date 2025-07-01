import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte
const UserContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans un UserProvider');
  }
  return context;
};

// Provider du contexte utilisateur
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulation d'un utilisateur connecté (peut être remplacé par une vraie logique d'auth)
  useEffect(() => {
    // Simuler le chargement d'un utilisateur (démarrage sans utilisateur connecté)
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
