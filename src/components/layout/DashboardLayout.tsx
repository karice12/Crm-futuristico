import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Wallet, 
  Users, 
  UserCircle, 
  Scissors, 
  Settings, 
  LogOut,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { useApp } from '../../context/AppContext';

const SidebarItem = ({ to, icon: Icon, label, onClick }: { to: string, icon: any, label: string, onClick?: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border border-transparent",
      isActive 
        ? "bg-primary/10 text-primary border-primary/20 shadow-lg shadow-primary/5" 
        : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
    )}
  >
    <Icon size={20} className="group-hover:scale-110 transition-transform" />
    <span className="font-medium">{label}</span>
  </NavLink>
);

export const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { companyInfo } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#09090b] text-foreground overflow-hidden relative">
      <div className="glow-bg" />
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0a0a0c]/95 border-r border-border p-6 gap-8 z-10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
            <Sparkles className="text-primary" size={24} />
          </div>
          <h1 className="font-heading text-lg font-bold tracking-tighter neon-text uppercase">
            GLOW MANAGER
          </h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem to="/agenda" icon={Calendar} label="Agenda" />
          <SidebarItem to="/financeiro" icon={Wallet} label="Financeiro" />
          <SidebarItem to="/clientes" icon={Users} label="Clientes" />
          <SidebarItem to="/profissionais" icon={UserCircle} label="Profissionais" />
          <SidebarItem to="/servicos" icon={Scissors} label="Serviços" />
          <div className="mt-auto pt-4 border-t border-border/50">
            <SidebarItem to="/configuracoes" icon={Settings} label="Configurações" />
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-muted-foreground hover:text-destructive transition-colors mt-2"
            >
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden z-10">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 glass border-b border-border z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary" size={24} />
            <span className="font-heading font-bold text-sm tracking-tighter neon-text">GLOW PRO</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <Outlet />
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="w-64 h-full glass border-r border-border p-6 flex flex-col gap-8 animate-in slide-in-from-left duration-300">
             <div className="flex items-center gap-3">
              <Sparkles className="text-primary" size={24} />
              <h1 className="font-heading text-lg font-bold tracking-tighter">GLOW MANAGER</h1>
            </div>
            <nav className="flex flex-col gap-2">
              <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/agenda" icon={Calendar} label="Agenda" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/financeiro" icon={Wallet} label="Financeiro" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/clientes" icon={Users} label="Clientes" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/profissionais" icon={UserCircle} label="Profissionais" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/servicos" icon={Scissors} label="Serviços" onClick={() => setIsMobileMenuOpen(false)} />
              <SidebarItem to="/configuracoes" icon={Settings} label="Configurações" onClick={() => setIsMobileMenuOpen(false)} />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
