import React from 'react';
import { 
  Plus, 
  MoreVertical, 
  Award, 
  Percent, 
  Calendar,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';

export const ProfissionaisPage = () => {
  const { professionals, services } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black tracking-tighter uppercase whitespace-pre">Equipe & <span className="neon-text">Comissões</span></h1>
          <p className="text-muted-foreground">Gerencie seus talentos e defina regras de comissionamento.</p>
        </div>
        <Button className="gap-2 neon-glow">
          <Plus size={18} /> Novo Profissional
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionals.map((prof) => (
          <Card key={prof.id} className="glass group overflow-hidden border-b-4 border-b-primary/50">
            <CardHeader className="relative h-32 flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 -z-10" />
              <div className="absolute top-4 right-4 h-full">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><MoreVertical size={18} /></Button>
              </div>
              <Avatar className="w-24 h-24 border-4 border-background -mb-16 shadow-2xl transition-transform group-hover:scale-105">
                <AvatarImage src={prof.avatar} />
                <AvatarFallback>{prof.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="pt-16 text-center space-y-4">
              <div>
                <CardTitle className="text-xl font-bold">{prof.name}</CardTitle>
                <CardDescription className="text-xs font-bold text-primary uppercase tracking-widest">{prof.role}</CardDescription>
              </div>
              
              <div className="flex justify-center gap-2">
                <Badge variant="outline" className="bg-accent/30 gap-1 border-none"><Percent size={12} className="text-primary" /> {prof.commission}% Comiss.</Badge>
                <Badge variant="outline" className="bg-accent/30 gap-1 border-none"><Award size={12} className="text-primary" /> Senior</Badge>
              </div>

              <div className="space-y-2 text-left pt-4">
                <h4 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground px-1">Serviços Habilitados</h4>
                <div className="flex flex-wrap gap-1">
                  {prof.services.map(sId => {
                    const service = services.find(s => s.id === sId);
                    return <Badge key={sId} className="bg-primary/10 text-primary border-none text-[10px]">{service?.name}</Badge>;
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                 <div className="p-3 bg-accent/20 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest leading-tight">Ganhos Mês</div>
                  <div className="text-lg font-black text-primary">R$ 3.450</div>
                </div>
                 <div className="p-3 bg-accent/20 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest leading-tight">Avaliação</div>
                  <div className="text-lg font-black text-primary">4.9/5</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-accent/10 border-t border-border/30 p-2 grid grid-cols-2 gap-2">
              <Button variant="ghost" className="text-xs h-10 gap-2"><Calendar size={14} /> Agenda</Button>
              <Button variant="ghost" className="text-xs h-10 gap-2"><MessageCircle size={14} /> Mensagem</Button>
            </CardFooter>
          </Card>
        ))}

        {/* Card Add Novo */}
        <button className="h-[450px] rounded-2xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all group opacity-60 hover:opacity-100">
           <div className="w-16 h-16 rounded-full bg-accent/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Plus size={32} className="text-muted-foreground group-hover:text-primary" />
           </div>
           <div className="text-center">
             <div className="font-bold">Adicionar Profissional</div>
             <p className="text-xs text-muted-foreground">Expanda sua equipe</p>
           </div>
        </button>
      </div>
    </div>
  );
};
