import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  FileText, 
  MoreVertical,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "../components/ui/dialog";
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const ClientesPage = () => {
  const { clients, transactions, appointments, services, companyInfo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const getClientHistory = (clientId: string) => {
    // Relaciona agendamentos concluídos
    return appointments
      .filter(app => app.clientId === clientId && app.status === 'completed')
      .map(app => {
        const service = services.find(s => s.id === app.serviceId);
        return {
          id: app.id,
          date: app.date,
          service: service?.name || 'Serviço',
          price: service?.price || 0
        };
      });
  };

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black tracking-tighter uppercase whitespace-pre">Clientes & <span className="neon-text">Fidelização</span></h1>
          <p className="text-muted-foreground">Gerencie sua base de clientes e emita extratos.</p>
        </div>
        <Button className="gap-2 neon-glow">
          <Plus size={18} /> Novo Cliente
        </Button>
      </div>

      <Card className="glass">
        <CardContent className="p-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Buscar por nome, e-mail ou telefone..." 
              className="pl-10 h-12 rounded-xl bg-background/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-12 px-6 rounded-xl">Filtrar</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="glass group hover:border-primary/50 transition-all overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users size={60} />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  {client.name.charAt(0)}
                </div>
                <Button variant="ghost" size="icon" className="opacity-50 hover:opacity-100">
                  <MoreVertical size={20} />
                </Button>
              </div>
              <CardTitle className="mt-4">{client.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-widest">Premium</Badge>
                <span className="text-xs">Desde {new Date().getFullYear()}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={14} className="text-primary" /> {client.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={14} className="text-primary" /> {client.phone}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-4">
                <div className="p-3 bg-accent/30 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Total Gasto</div>
                  <div className="text-lg font-bold text-primary">R$ {client.totalSpent}</div>
                </div>
                <div className="p-3 bg-accent/30 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Visitas</div>
                  <div className="text-lg font-bold text-primary">12</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 gap-2 rounded-xl" onClick={() => handleWhatsApp(client.phone)}>
                  <MessageSquare size={16} /> WhatsApp
                </Button>
                
                {/* Modal Extrato de Serviço */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="flex-1 gap-2 rounded-xl bg-accent text-accent-foreground hover:bg-accent/80" onClick={() => setSelectedClient(client)}>
                      <FileText size={16} /> Extrato
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] glass p-0 overflow-hidden border-primary/20">
                    <div className="p-6 bg-primary/10 border-b border-white/10">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-heading font-black flex items-center gap-2">
                          <FileText className="text-primary" /> EXTRATO DE SERVIÇO
                        </DialogTitle>
                        <DialogDescription className="text-foreground/70">Relatório financeiro detalhado do cliente</DialogDescription>
                      </DialogHeader>
                    </div>
                    
                    <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                      <div className="flex justify-between items-start border-b border-border/50 pb-6">
                        <div>
                          <h4 className="font-bold text-lg">{client.name}</h4>
                          <p className="text-xs text-muted-foreground">{client.email}</p>
                          <p className="text-xs text-muted-foreground">{client.phone}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-heading font-bold text-sm text-primary uppercase">{companyInfo.name}</div>
                          <p className="text-[10px] text-muted-foreground lowercase">{companyInfo.address}</p>
                          <p className="text-[10px] text-muted-foreground">{companyInfo.cnpj}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-[10px] uppercase font-black tracking-widest text-primary">Histórico de Serviços</h5>
                        <div className="space-y-3">
                          {getClientHistory(client.id).length > 0 ? getClientHistory(client.id).map((h) => (
                            <div key={h.id} className="flex justify-between items-center p-3 glass rounded-xl">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                  <Calendar size={14} className="text-primary" />
                                </div>
                                <div>
                                  <div className="text-sm font-bold">{h.service}</div>
                                  <div className="text-[10px] text-muted-foreground">{format(new Date(h.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</div>
                                </div>
                              </div>
                              <div className="font-bold text-sm leading-none">R$ {h.price}</div>
                            </div>
                          )) : (
                            <div className="text-center py-8 opacity-50 italic text-sm">Nenhum serviço concluído recentemente.</div>
                          )}
                        </div>
                      </div>

                      <div className="p-6 bg-primary/20 rounded-2xl border border-primary/30 flex justify-between items-center">
                         <div>
                          <div className="text-[10px] uppercase font-black tracking-widest opacity-70">Total Acumulado</div>
                          <div className="text-3xl font-black tracking-tighter">R$ {client.totalSpent}</div>
                         </div>
                         <DollarSign className="text-primary opacity-20" size={48} />
                      </div>
                    </div>

                    <div className="p-6 bg-accent/20 border-t border-white/10 flex gap-4">
                      <Button variant="outline" className="flex-1 rounded-xl">Imprimir PDF</Button>
                      <Button className="flex-1 rounded-xl neon-glow" onClick={() => handleWhatsApp(client.phone)}>Enviar p/ WhatsApp</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Users = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
