import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="glow-bg" />

      <Card className="w-full max-w-md glass border-primary/20 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500 bg-[#18181b]/40">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border border-primary/30 rotate-12 neon-glow transition-transform hover:rotate-0 duration-500">
            <Sparkles className="text-primary" size={32} />
          </div>
          <div>
            <CardTitle className="text-3xl font-heading font-black tracking-tighter">GLOW <span className="neon-text">LOGIN</span></CardTitle>
            <CardDescription className="text-muted-foreground uppercase tracking-[0.2em] text-[10px] font-black mt-2">Acesso ao Dashboard Pro</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase font-black tracking-widest opacity-70">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input id="email" type="email" placeholder="admin@glowpro.com" className="pl-10 h-12 bg-background/50 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between items-center px-1">
                 <Label htmlFor="pass" className="text-xs uppercase font-black tracking-widest opacity-70">Senha</Label>
                 <a href="#" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-widest">Esqueceu?</a>
               </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input id="pass" type="password" placeholder="••••••••" className="pl-10 h-12 bg-background/50 rounded-xl" />
              </div>
            </div>
          </div>

          <Link to="/dashboard" className="block w-full">
            <Button className="w-full h-14 text-lg font-bold rounded-2xl neon-glow">
              Entrar no Império <ArrowRight className="ml-2" />
            </Button>
          </Link>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-bold tracking-widest">Ou</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-12 rounded-xl group overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Login com Google
            </span>
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Ainda não tem conta? <a href="#" className="font-bold text-primary hover:underline">Assine Agora.</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
