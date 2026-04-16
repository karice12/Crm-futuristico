import { subDays, addDays, format, setHours, setMinutes } from 'date-fns';

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  promotionPrice?: number;
  category: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  commission: number; // percentage
  services: string[]; // service IDs
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit?: string;
  totalSpent: number;
}

export interface Appointment {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId: string;
  date: string;
  status: 'booked' | 'completed' | 'cancelled';
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
  status: 'paid' | 'pending';
}

export const mockServices: Service[] = [
  { id: '1', name: 'Corte Feminino', duration: 60, price: 120, category: 'Cabelo' },
  { id: '2', name: 'Coloração Global', duration: 120, price: 250, category: 'Cabelo' },
  { id: '3', name: 'Manicure', duration: 45, price: 45, category: 'Unhas' },
  { id: '4', name: 'Pedicure', duration: 45, price: 55, category: 'Unhas' },
  { id: '5', name: 'Combo Pé e Mão', duration: 90, price: 90, promotionPrice: 80, category: 'Combos' },
];

export const mockProfessionals: Professional[] = [
  { id: 'p1', name: 'Ana Silva', role: 'Hair Stylist', commission: 40, services: ['1', '2'], avatar: 'https://picsum.photos/seed/ana/100/100' },
  { id: 'p2', name: 'Beatriz Costa', role: 'Manicure & Pedicure', commission: 50, services: ['3', '4', '5'], avatar: 'https://picsum.photos/seed/beatriz/100/100' },
];

export const mockClients: Client[] = [
  { id: 'c1', name: 'Mariana Oliveira', email: 'mariana@example.com', phone: '(11) 98888-7777', lastVisit: subDays(new Date(), 5).toISOString(), totalSpent: 450 },
  { id: 'c2', name: 'Juliana Santos', email: 'juliana@example.com', phone: '(11) 97777-6666', lastVisit: subDays(new Date(), 10).toISOString(), totalSpent: 890 },
];

const today = new Date();
export const mockAppointments: Appointment[] = [
  { 
    id: 'a1', 
    clientId: 'c1', 
    professionalId: 'p1', 
    serviceId: '1', 
    date: setMinutes(setHours(today, 10), 0).toISOString(), 
    status: 'booked' 
  },
  { 
    id: 'a2', 
    clientId: 'c2', 
    professionalId: 'p2', 
    serviceId: '3', 
    date: setMinutes(setHours(today, 14), 30).toISOString(), 
    status: 'booked' 
  },
];

export const mockTransactions: Transaction[] = [
  { id: 't1', type: 'income', category: 'Serviço', amount: 120, date: subDays(today, 1).toISOString(), description: 'Corte Feminino - Mariana', status: 'paid' },
  { id: 't2', type: 'expense', category: 'Aluguel', amount: 2500, date: today.toISOString(), description: 'Aluguel Sala', status: 'pending' },
  { id: 't3', type: 'expense', category: 'Produtos', amount: 450, date: subDays(today, 2).toISOString(), description: 'Shampoos e Condicionadores', status: 'paid' },
];
