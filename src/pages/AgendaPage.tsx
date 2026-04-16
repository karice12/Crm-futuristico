import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Plus, 
  Settings2, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Search,
  MoreVertical
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useApp } from '../context/AppContext';
import { format, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../lib/utils';

export const AgendaPage = () => {
  const { professionals, appointments, updateAppointment, services, clients } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const professionalId = destination.droppableId;
    
    // In a real app, you'd calculate the new time based on the index position in the slot list
    // For this POC/MVP, we'll just update the professional affiliation
    updateAppointment(draggableId, { professionalId });
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 08:00 to 19:00

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Agenda */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass p-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="flex bg-accent/50 rounded-xl border border-border/50">
            <Button variant="ghost" size="icon" onClick={() => setSelectedDate(subDays(selectedDate, 1))}>
              <ChevronLeft size={18} />
            </Button>
            <div className="flex flex-col items-center justify-center px-4 border-l border-r border-border/50 min-w-[150px]">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {format(selectedDate, 'MMMM', { locale: ptBR })}
              </span>
              <span className="text-lg font-black tracking-tighter">
                {format(selectedDate, 'dd, EEEE', { locale: ptBR })}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
              <ChevronRight size={18} />
            </Button>
          </div>
          <Button variant="outline" className="hidden sm:flex" onClick={() => setSelectedDate(new Date())}>Hoje</Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="bg-accent/30 border border-border/50 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-all w-[200px]"
            />
          </div>
          <Button variant="outline" size="icon"><Settings2 size={18} /></Button>
          <Button className="gap-2 neon-glow">
            <Plus size={18} /> 
            <span className="hidden sm:inline">Novo Agendamento</span>
          </Button>
        </div>
      </div>

      {/* Grid Professionals */}
      <div className="flex-1 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="inline-flex gap-6 min-w-full pb-6">
            {/* Timeline Column */}
            <div className="w-16 sticky left-0 z-10 bg-background/50 backdrop-blur-md">
              <div className="h-16 mb-4 flex items-center justify-center opacity-0">.</div>
              {hours.map(hour => (
                <div key={hour} className="h-24 flex flex-col items-center justify-start text-[10px] text-muted-foreground font-bold pt-2">
                  <span>{hour}:00</span>
                  <div className="w-full border-t border-border/30 mt-1" />
                </div>
              ))}
            </div>

            {/* Professionals Columns */}
            {professionals.map((prof) => (
              <div key={prof.id} className="min-w-[280px] flex-1">
                {/* Column Header */}
                <div className="h-16 mb-4 flex items-center gap-3 px-4 glass rounded-xl border-b-2 border-primary mb-6">
                  <Avatar className="w-10 h-10 border-2 border-primary/30">
                    <AvatarImage src={prof.avatar} />
                    <AvatarFallback>{prof.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm tracking-tight">{prof.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">{prof.role}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-auto opacity-50 hover:opacity-100">
                    <MoreVertical size={16} />
                  </Button>
                </div>

                {/* Droppable Surface */}
                <Droppable droppableId={prof.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-[800px] rounded-2xl transition-colors duration-200 ${
                        snapshot.isDraggingOver ? 'bg-primary/5 border-2 border-dashed border-primary/20' : 'bg-accent/10 border border-border/30'
                      }`}
                    >
                      <div className="relative h-full w-full">
                        {/* Hour Guides */}
                        {hours.map(hour => (
                          <div key={hour} className="absolute w-full border-t border-border/10" style={{ top: `${(hour - 8) * 96}px` }} />
                        ))}

                        {/* Appointments */}
                        {appointments
                          .filter(app => app.professionalId === prof.id)
                          .map((app, index) => {
                            const startTime = new Date(app.date);
                            const topOffset = (startTime.getHours() - 8) * 96 + (startTime.getMinutes() / 60) * 96;
                            const client = clients.find(c => c.id === app.clientId);
                            const service = services.find(s => s.id === app.serviceId);

                            return (
                              <React.Fragment key={app.id}>
                                <Draggable draggableId={app.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                        top: `${topOffset}px`,
                                        position: 'absolute'
                                      }}
                                      className={`w-full p-1 z-10 transition-transform ${snapshot.isDragging ? 'z-50' : ''}`}
                                    >
                                      <div className={`
                                        p-3 rounded-xl border-l-[3px] shadow-lg transition-all
                                        ${app.status === 'completed' 
                                          ? 'bg-green-500/10 border-green-500/50' 
                                          : 'bg-[rgba(168,85,247,0.15)] border-[rgba(168,85,247,0.4)]'
                                        }
                                        ${snapshot.isDragging ? 'rotate-2 scale-[1.02] neon-glow bg-[rgba(168,85,247,0.25)]' : ''}
                                      `}>
                                        <div className="flex flex-col h-full justify-between gap-1">
                                          <div className="flex justify-between items-start">
                                            <div className="text-[12px] font-bold tracking-tight truncate pr-2">
                                              {client?.name || 'Cliente'}
                                            </div>
                                            <div className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] font-bold text-primary tracking-tighter uppercase">
                                              {format(startTime, 'HH:mm')}
                                            </div>
                                          </div>
                                          <div className="text-[11px] text-muted-foreground font-medium truncate opacity-80">
                                            {service?.name || 'Serviço'}
                                          </div>
                                          <div className="flex items-center gap-1 mt-1 opacity-60">
                                            <Clock size={10} className="text-muted-foreground" />
                                            <span className="text-[9px] text-muted-foreground font-bold tracking-wider uppercase">60 MIN</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              </React.Fragment>
                            );
                          })}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};
