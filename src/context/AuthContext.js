import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const logoutTimer = useRef(null);

  useEffect(() => {
    // Persistência simples
    const storedUser = localStorage.getItem("googleUser");
    const storedToken = localStorage.getItem("googleToken");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("googleUser", JSON.stringify(userData));
    localStorage.setItem("googleToken", token);
  };

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("googleUser");
    localStorage.removeItem("googleToken");
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
  }, []);

  const startInactivityTimer = useCallback(() => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(
      () => {
        logout();
        alert("Sessão terminada por inatividade.");
      },
      30 * 60 * 1000
    ); // 30 minutos FIXME:5 * 1000 5 segundos teste
  }, [logout]);

  const resetTimer = useCallback(() => {
    startInactivityTimer();
  }, [startInactivityTimer]);

  useEffect(() => {
    if (!user) {
      // Limpa o timer se não houver utilizador autenticado
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      return;
    }
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    startInactivityTimer();
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [user, resetTimer, startInactivityTimer]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
