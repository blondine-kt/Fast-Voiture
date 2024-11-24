
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserLocation {
  latitude: number;
  longitude: number;
}
interface User {
  name: string;
  password: string;
    
}
interface UserData{
  driver_license: string;
  email: string;
  id: number;
  license_plate: string;
  nom: string;
  password: string;
  phone: string;
  userName: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  signOut: () => void
  userLocation: UserLocation | null;
  setUserLocation :(userLocation: UserLocation) => void;
  userdata : UserData|null;
  setUserData:(userdata: UserData|null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signOut = () => {
    setUser(null);
  };

  const [userLocation, setUserLocation] = useState<UserLocation |null>(null);
  const [userdata, setUserData] = useState<UserData|null>(null);



  return (
    <UserContext.Provider value={{ user, setUser,signOut, userLocation, setUserLocation, userdata,setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
