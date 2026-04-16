import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Rocket, 
  PieChart, 
  Smartphone,
  CalendarDays
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <Card className="glass p-8 group hover:border-primary/50 transition-all duration-300">
    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-primary" size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </Card>
);

const PricingCard = ({ title, price, features, highlighted = false }: { title: string, price: string, features: string[], highlighted?: boolean }) => (
  <Card className={cn(
    "p-8 relative flex flex-col gap-6",
    highlighted ? "glass border-primary border-2 scale-105 z-10 neon-glow" : "glass opacity-80"
  )}>
    {highlighted && (
      <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
        POPULAR
      </div>
    )}
    <div>
      <h3 className="text-xl font-bold text-muted-foreground uppercase tracking-widest">{title}</h3>
      <div className="flex items-baseline gap-1 mt-4">
        <span className="text-4xl font-bold">R$ {price}</span>
        <span className="text-muted-foreground">/mês</span>
      </div>
    </div>
    <div className="flex flex-col gap-4 flex-1">
      {features.map((feature, i) => (
        <div key={i} className="flex items-start gap-3">
          <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
          <span className="text-sm opacity-90">{feature}</span>
        </div>
      ))}
    </div>
    <Button className={highlighted ? "w-full py-6 text-lg" : "w-full"} variant={highlighted ? "default" : "outline"}>
      Começar Agora
    </Button>
  </Card>
);

import { cn } from '../lib/utils';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-foreground selection:bg-primary selection:text-white relative overflow-hidden">
      <div className="glow-bg" />
      
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="text-primary" size={32} />
            <span className="font-heading text-xl font-bold tracking-tighter neon-text">GLOW MANAGER</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Funcionalidades</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Preços</a>
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/dashboard">
              <Button className="neon-glow">Demo Grátis</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              O CRM mais moderno do Brasil 🇧🇷
            </span>
            <h1 className="text-5xl md:text-8xl font-heading font-black tracking-tighter mb-8 leading-[0.9]">
              ELEVE O NÍVEL DO <br /> SEU <span className="neon-text">SALÃO.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl mb-12 leading-relaxed">
              Gestão inteligente, agenda com drag-and-drop e controle financeiro premium. Tudo o que você precisa para brilhar no mercado da beleza.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="px-12 py-8 text-xl h-auto rounded-2xl neon-glow">
                  Começar MVP Grátis <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-12 py-8 text-xl h-auto rounded-2xl border-2">
                Ver Demonstração
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 italic font-heading">Features Cyberpunk</h2>
            <p className="text-muted-foreground">Construído para a próxima geração de profissionais da beleza.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap} 
              title="Velocidade Absurda" 
              description="Nossa interface foi otimizada para ser 4x mais rápida que CRMs convencionais. Agende um cliente em menos de 5 segundos."
            />
            <FeatureCard 
              icon={CalendarDays} 
              title="Agenda Inteligente" 
              description="Visualize seu dia com clareza. Mude horários apenas arrastando cards. Seus profissionais e clientes conectados em tempo real."
            />
            <FeatureCard 
              icon={PieChart} 
              title="Financeiro de Sobrevivência" 
              description="Monitoramento constante do seu fundo de emergência. Saiba exatamente quanto você tem e quanto precisa para o próximo mês."
            />
            <FeatureCard 
              icon={Smartphone} 
              title="WhatsApp Automático" 
              description="Envie lembretes e extratos de serviço diretamente para o WhatsApp dos seus clientes com um único clique."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Segurança Máxima" 
              description="Seus dados protegidos por criptografia de ponta a ponta com a tecnologia do Supabase e Google Cloud."
            />
            <FeatureCard 
              icon={Rocket} 
              title="Escalabilidade" 
              description="Comece como profissional solo e cresça para uma rede de franquias. O Glow Manager acompanha sua evolução."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">Planos de Potência</h2>
            <p className="text-muted-foreground">Escolha o plano ideal para o momento do seu negócio.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <PricingCard 
              title="Solo Star" 
              price="49" 
              features={[
                "Agendamento Ilimitado",
                "Gestão de 1 Profissional",
                "Controle de Caixa Básico",
                "Suporte via Email"
              ]}
            />
            <PricingCard 
              title="Studio Pro" 
              price="99" 
              highlighted={true}
              features={[
                "Até 5 Profissionais",
                "Financeiro Completo",
                "Extrato de Cliente via WhatsApp",
                "Fundo de Emergência Automático",
                "Suporte Prioritário"
              ]}
            />
            <PricingCard 
              title="Empire" 
              price="199" 
              features={[
                "Profissionais Ilimitados",
                "Múltiplas Unidades",
                "White-label Premium",
                "Customização de Relatórios",
                "Gerente de Sucesso Dedicado"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
             <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-primary" size={32} />
              <span className="font-heading text-xl font-bold tracking-tighter">GLOW MANAGER</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              O CRM mais elegante do mercado, desenvolvido para salões que buscam sofisticação e eficiência.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Produto</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Apoio</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground">
          © 2026 Glow Manager Pro. Todos os direitos reservados. Design Futurista by Glow Labs.
        </div>
      </footer>
    </div>
  );
};
