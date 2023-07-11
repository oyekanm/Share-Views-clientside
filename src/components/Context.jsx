import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

function AppProvider({ children }) {
  const [session, setSession] = useState();
  const [profile, setProfile] = useState(true);
  console.log(session);

  useEffect(() => {
    const storage = localStorage.getItem("access-Token");
    // console.log(storage);
    if (storage){
      axios
        .get(`${import.meta.env.VITE_PORT}/api/auth`, {
          headers: {
            accessToken: storage,
          },
        })
        .then((res) => { 
          if (res.data) {
            // console.log(res.data);
            axios
              .get(`${import.meta.env.VITE_PORT}/api/auth/${res.data.id}`)
              .then((res) => {
                // console.log(res);
  
                const authenticate = { username: res?.data.username, id: res?.data.id };
                setSession(authenticate);
              });
          }
          // console.log(res);
        })
        .catch((err) => {
          console.log("access not granted");
          setSession(null);
        });

    }

  }, []);

  const logout = ()=>{
    setSession(null)
    localStorage.removeItem("access-Token")
  }

  return (
    <AppContext.Provider value={{ setSession, session,profile,setProfile,logout }}>
      {children}
    </AppContext.Provider>
  );
}
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
