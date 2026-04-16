import React from 'react';
import { 
  Plus, 
  Clock, 
  DollarSign, 
  Tags, 
  ChevronRight, 
  Zap,
  MoreVertical,
  Layers
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

export const ServicosPage = () => {
  const { services } = useApp();

  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black tracking-tighter uppercase whitespace-pre">Catálogo & <span className="neon-text">Combos</span></h1>
          <p className="text-muted-foreground">Estruture sua oferta de serviços e crie promoções exclusivas.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 rounded-xl">
            <Layers size={18} /> Novo Combo
          </Button>
          <Button className="gap-2 neon-glow">
            <Plus size={18} /> Novo Serviço
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Categorias */}
        <div className="lg:col-span-1 space-y-4">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground ml-2">Categorias</h3>
           <div className="flex flex-wrap lg:flex-col gap-2">
             <Button variant="default" className="justify-start gap-4 rounded-xl shadow-lg shadow-primary/20">Todos os Serviços</Button>
             {categories.map(cat => (
               <Button key={cat} variant="ghost" className="justify-start gap-4 rounded-xl text-muted-foreground hover:text-foreground">{cat}</Button>
             ))}
           </div>

           <Card className="glass mt-8 bg-primary/10 overflow-hidden border-primary/30">
             <div className="p-6 space-y-4">
               <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                 <Zap className="text-primary" size={20} />
               </div>
               <h4 className="font-bold italic">Promoções Ativas</h4>
               <p className="text-xs text-muted-foreground">Você tem 2 promoções rodando este mês. Aumentou o fluxo em 18%.</p>
               <Button variant="link" className="p-0 text-primary text-xs font-bold uppercase tracking-widest gap-2">Gerenciar <ChevronRight size={14} /></Button>
             </div>
           </Card>
        </div>

        {/* Lista de Serviços */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="glass group hover:border-primary/50 transition-all cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <div className="p-2 bg-accent/50 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Tags size={20} />
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical size={16} /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-primary/30 text-primary mb-2">{service.category}</Badge>
                    <CardTitle className="text-lg font-bold">{service.name}</CardTitle>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} className="text-primary/70" />
                      <span className="text-sm font-medium">{service.duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-primary" />
                      <div className="flex items-baseline gap-1">
                        {service.promotionPrice ? (
                          <>
                            <span className="text-lg font-black tracking-tight italic">R$ {service.promotionPrice}</span>
                            <span className="text-xs text-muted-foreground line-through opacity-50">R$ {service.price}</span>
                          </>
                        ) : (
                          <span className="text-lg font-black tracking-tight italic">R$ {service.price}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="w-full h-1 bg-accent/50 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/20 w-[60%]" />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-widest">Popularidade: 60%</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="glass border-dashed flex flex-col items-center justify-center p-8 opacity-60 hover:opacity-100 hover:bg-primary/5 transition-all cursor-pointer group">
              <Plus className="text-muted-foreground group-hover:text-primary mb-2" size={32} />
              <div className="font-bold text-sm">Criar Novo</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
