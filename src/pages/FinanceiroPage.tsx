import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Filter, 
  Download,
  AlertCircle,
  Clock,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const FinanceiroPage = () => {
  const { transactions } = useApp();
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions.filter(t => filter === 'all' || t.type === filter);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black tracking-tighter uppercase whitespace-pre">Controle de <span className="neon-text">Caixa</span></h1>
          <p className="text-muted-foreground">Fluxo de entradas, saídas e previsibilidade financeira.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 rounded-xl border-white/10 hover:bg-white/5 h-11">
            <Download size={16} /> Exportar
          </Button>
          <Button className="gap-2 neon-glow h-11 px-6 font-bold tracking-tight">
            <Plus size={18} /> Nova Operação
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass group overflow-hidden border border-white/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Saldo Atual</span>
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 border border-primary/20">
                <DollarSign className="text-primary" size={18} />
              </div>
            </div>
            <div className="text-[32px] font-bold tracking-tight">R$ {balance.toLocaleString()}</div>
            <p className="text-[11px] text-muted-foreground mt-2 font-medium opacity-70">Disponível para reinvestimento</p>
          </CardContent>
        </Card>

        <Card className="glass group overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Entradas</span>
              <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20">
                <TrendingUp className="text-green-500" size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight">R$ {totalIncome.toLocaleString()}</div>
            <p className="text-xs text-green-500 mt-2 font-medium">+15% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card className="glass group overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Saídas</span>
              <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20">
                <TrendingDown className="text-red-500" size={20} />
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-red-500">R$ {totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-red-500 mt-2 font-medium">Inclui despesas fixas</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Extrato de Movimentações</CardTitle>
            <CardDescription>Lista completa de transações do período.</CardDescription>
          </div>
          <div className="flex items-center gap-2 bg-accent/50 p-1 rounded-xl border border-border/50">
            <Button 
              variant={filter === 'all' ? 'default' : 'ghost'} 
              size="sm" 
              className="text-xs" 
              onClick={() => setFilter('all')}
            >Todo</Button>
            <Button 
              variant={filter === 'income' ? 'default' : 'ghost'} 
              size="sm" 
              className="text-xs"
              onClick={() => setFilter('income')}
            >Entradas</Button>
            <Button 
              variant={filter === 'expense' ? 'default' : 'ghost'} 
              size="sm" 
              className="text-xs"
              onClick={() => setFilter('expense')}
            >Saídas</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-accent/30 border-y border-border/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">Descrição</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">Categoria</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">Data</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">Valor</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-accent/10 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                          t.type === 'income' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        )}>
                          {t.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                        </div>
                        <div className="text-sm font-bold">{t.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-accent/50 border-none text-[10px] uppercase tracking-tighter">{t.category}</Badge>
                    </td>
                    <td className="px-6 py-4 text-xs opacity-70">
                      {format(new Date(t.date), "dd 'de' MMM", { locale: ptBR })}
                    </td>
                    <td className={cn(
                      "px-6 py-4 font-bold text-sm",
                      t.type === 'income' ? "text-green-500" : "text-foreground"
                    )}>
                      {t.type === 'income' ? '+' : '-'} R$ {t.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {t.status === 'paid' ? (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
                          <CheckCircle2 size={12} /> Pago
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500 uppercase">
                          <Clock size={12} /> Pendente
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="glass bg-primary/5 border-dashed border-primary/30">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-primary/20 rounded-2xl">
              <AlertCircle className="text-primary" size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold italic font-heading">Previsibilidade Financeira</h3>
              <p className="text-sm text-muted-foreground">O sistema detectou que você terá R$ 4.500 em despesas fixas no próximo mês. Prepare seu fundo!</p>
            </div>
          </div>
          <Button size="lg" className="neon-glow rounded-xl px-8">Explorar Relatório IA</Button>
        </CardContent>
      </Card>
    </div>
  );
};
