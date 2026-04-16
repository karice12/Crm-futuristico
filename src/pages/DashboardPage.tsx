import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar as CalendarIcon, 
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import { useApp } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';

const StatCard = ({ title, value, subValue, icon: Icon, trend }: { title: string, value: string, subValue?: string, icon: any, trend?: 'up' | 'down' }) => (
  <Card className="glass relative overflow-hidden group">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-[12px] font-bold text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors border border-primary/20">
        <Icon className="text-primary" size={18} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-[28px] font-bold tracking-tight">{value}</div>
      {subValue && (
        <p className={cn(
          "text-[11px] mt-1 font-medium",
          trend === 'up' ? "text-green-500" : trend === 'down' ? "text-red-500" : "text-muted-foreground"
        )}>
          {subValue}
        </p>
      )}
    </CardContent>
  </Card>
);

export const DashboardPage = () => {
  const { appointments, transactions } = useApp();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const pendingExpenses = transactions.filter(t => t.type === 'expense' && t.status === 'pending').reduce((acc, t) => acc + t.amount, 0);
  
  // Fundo de emergência sugerido: 3x os gastos fixos (aproximado por expenses pending + fixed factor)
  const emergencyFundGoal = totalExpenses * 3 || 5000;
  const currentReserve = totalIncome - totalExpenses;

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Fev', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Abr', value: totalIncome },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-heading font-black tracking-tighter uppercase">Bem-vinda, <span className="neon-text">Luana</span></h1>
          <p className="text-muted-foreground text-sm">Resumo estratégico do seu negócio hoje.</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-accent/20 px-4 py-2 rounded-xl border border-primary/20 backdrop-blur-sm">
          <CalendarIcon size={14} className="text-primary" />
          <span className="font-bold uppercase tracking-wider text-primary">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Faturamento do Mês" value={`R$ ${totalIncome.toLocaleString()}`} subValue="+12% vs mês anterior" trend="up" icon={TrendingUp} />
        <StatCard title="Contas a Pagar" value={`R$ ${totalExpenses.toLocaleString()}`} subValue="Vencimento em 2 dias" trend="down" icon={TrendingDown} />
        <StatCard title="Agendamentos Hoje" value={`${appointments.length}`} subValue="4 novos hoje" trend="up" icon={CalendarIcon} />
        <StatCard title="Módulo Survival" value={`R$ ${emergencyFundGoal.toLocaleString()}`} subValue="Meta de Emergência" icon={ShieldCheck} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fundo de Sobrevivência */}
        <Card className="lg:col-span-1 glass border-l-4 border-l-primary relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <ShieldCheck size={80} />
          </div>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="text-primary" size={18} />
              Módulo de Sobrevivência
            </CardTitle>
            <CardDescription className="text-xs">Segurança estratégica para o estúdio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
               <div className="text-[24px] font-bold">R$ {emergencyFundGoal.toLocaleString()}</div>
               <div className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">Meta Sugerida de Reserva</div>
            </div>

            <div className="space-y-3">
              <div className="h-[6px] w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary shadow-[0_0_10px_#a855f7] transition-all duration-1000" 
                  style={{ width: `${Math.min((currentReserve / emergencyFundGoal) * 100, 100)}%` }} 
                />
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-medium text-muted-foreground tracking-wide">PROGRESSO DA META</span>
                <span className="font-bold text-primary">{Math.round((currentReserve / emergencyFundGoal) * 100)}%</span>
              </div>
            </div>

            <Button className="w-full gap-2 text-xs h-10 neon-glow">
              Otimizar Reserva <ArrowUpRight size={14} />
            </Button>
          </CardContent>
        </Card>

        {/* Gráfico de Evolução */}
        <Card className="lg:col-span-2 glass">
          <CardHeader>
            <CardTitle className="text-lg">Fluxo de Caixa (Mensal)</CardTitle>
            <CardDescription>Evolução financeira baseada em entradas e saídas</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(139, 92, 246, 0.5)', borderRadius: '12px' }}
                  itemStyle={{ color: '#8b5cf6' }}
                />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Próximos Agendamentos */}
        <Card className="glass">
           <CardHeader>
            <CardTitle className="text-lg">Próximas Clientes</CardTitle>
            <CardDescription>O que te espera nas próximas horas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments.map((app) => (
              <div key={app.id} className="flex items-center gap-4 p-3 rounded-xl bg-accent/30 border border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
                <div className="text-center min-w-[60px]">
                  <div className="text-sm font-bold text-primary">{new Date(app.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">{new Date(app.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</div>
                </div>
                <div className="flex-1">
                  <div className="font-bold flex items-center gap-2">
                    Juliana Santos <div className="w-1 h-1 bg-muted-foreground rounded-full" /> 
                    <span className="text-xs text-muted-foreground font-normal">Corte & Designer</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Profissional: Ana Silva</div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Operations */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Últimas Movimentações</CardTitle>
            <CardDescription>Histórico recente de caixa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             {transactions.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 border-b border-border/30 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    t.type === 'income' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {t.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.description}</div>
                    <div className="text-[10px] text-muted-foreground">{new Date(t.date).toLocaleDateString('pt-BR')} • {t.category}</div>
                  </div>
                </div>
                <div className={cn(
                  "font-bold",
                  t.type === 'income' ? "text-green-500" : "text-foreground"
                )}>
                  {t.type === 'income' ? '+' : '-'} R$ {t.amount}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
