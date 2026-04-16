import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  mockServices, 
  mockProfessionals, 
  mockClients, 
  mockAppointments, 
  mockTransactions,
  Service,
  Professional,
  Client,
  Appointment,
  Transaction 
} from '../lib/mockData';

interface AppContextType {
  services: Service[];
  professionals: Professional[];
  clients: Client[];
  appointments: Appointment[];
  transactions: Transaction[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  addTransaction: (transaction: Transaction) => void;
  companyInfo: any;
  updateCompanyInfo: (info: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [professionals, setProfessionals] = useState<Professional[]>(mockProfessionals);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Glow Manager Pro',
    cnpj: '00.000.000/0001-00',
    address: 'Av. Cyberpunk, 2077 - Neon City',
    phone: '(11) 99999-9999',
    logo: null
  });

  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(appointments.map(app => app.id === id ? { ...app, ...updates } : app));
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const updateCompanyInfo = (info: any) => {
    setCompanyInfo({ ...companyInfo, ...info });
  };

  return (
    <AppContext.Provider value={{ 
      services, 
      professionals, 
      clients, 
      appointments, 
      transactions,
      addAppointment,
      updateAppointment,
      addTransaction,
      companyInfo,
      updateCompanyInfo
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
