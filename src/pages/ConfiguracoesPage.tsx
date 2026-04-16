import React from 'react';
import { 
  Building2, 
  CreditCard, 
  Lock, 
  Bell, 
  Shield, 
  CreditCard as StripeIcon,
  ExternalLink,
  CheckCircle2,
  Upload,
  Save
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

export const ConfiguracoesPage = () => {
  const { companyInfo, updateCompanyInfo } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-heading font-black tracking-tighter uppercase">Configurações & <span className="neon-text">Upgrade</span></h1>
        <p className="text-muted-foreground">Personalize sua experiência e gerencie sua assinatura.</p>
      </div>

      <Tabs defaultValue="empresa" className="space-y-6">
        <TabsList className="glass p-1 h-auto grid grid-cols-3 max-w-md">
          <TabsTrigger value="empresa" className="rounded-lg py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Empresa</TabsTrigger>
          <TabsTrigger value="assinatura" className="rounded-lg py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Assinatura</TabsTrigger>
          <TabsTrigger value="seguranca" className="rounded-lg py-2 data-[state=active]:bg-primary data-[state=active]:text-white">Segurança</TabsTrigger>
        </TabsList>

        {/* Empresa (White-label) */}
        <TabsContent value="empresa">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="text-primary" size={20} /> Perfil da Empresa
                </CardTitle>
                <CardDescription>Estes dados serão exibidos nos recibos e extratos dos clientes.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Razão Social / Nome Fantasia</Label>
                    <Input id="name" defaultValue={companyInfo.name} className="bg-background/50 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input id="cnpj" defaultValue={companyInfo.cnpj} className="bg-background/50 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone de Contato</Label>
                    <Input id="phone" defaultValue={companyInfo.phone} className="bg-background/50 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail Corporativo</Label>
                    <Input id="email" defaultValue="contato@glowpro.com" className="bg-background/50 rounded-xl" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input id="address" defaultValue={companyInfo.address} className="bg-background/50 rounded-xl" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/50 pt-6">
                <Button className="ml-auto gap-2 neon-glow">
                  <Save size={18} /> Salvar Alterações
                </Button>
              </CardFooter>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Logomarca</CardTitle>
                <CardDescription>Aparece no dashboard e extratos.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-8 gap-6 text-center">
                <div className="w-40 h-40 rounded-3xl bg-accent/30 border-2 border-dashed border-border flex items-center justify-center group hover:border-primary transition-all cursor-pointer">
                  {companyInfo.logo ? (
                    <img src={companyInfo.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                      <Upload size={32} />
                      <span className="text-xs font-bold uppercase tracking-widest">Fazer Upload</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Recomendado: 512x512px. Formato PNG com fundo transparente.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Assinatura (Stripe Integration Placeholder) */}
        <TabsContent value="assinatura">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 glass border-primary/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Rocket size={80} />
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2 bg-primary/20 text-primary border-primary/30 uppercase tracking-widest">Plano Ativo</Badge>
                <CardTitle className="text-2xl font-black italic">STUDIO PRO</CardTitle>
                <CardDescription>R$ 99,00/mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary" /> Próxima cobrança: 12/05/2026
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary" /> Cartão: **** **** **** 4242
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button className="w-full gap-2 bg-white text-black hover:bg-white/90">
                  <StripeIcon size={18} /> Abrir Portal Stripe <ExternalLink size={14} />
                </Button>
                <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">Cancelar Assinatura</Button>
              </CardFooter>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Histórico de Cobranças</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-accent/30 border-y border-border/50">
                        <tr>
                          <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">Referência</th>
                          <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">Data</th>
                          <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">Valor</th>
                          <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground">Status</th>
                          <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-muted-foreground text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30">
                        <tr className="hover:bg-accent/10 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold">Assinatura Studio Pro</td>
                          <td className="px-6 py-4 text-sm font-medium opacity-70">12 Abr 2026</td>
                          <td className="px-6 py-4 text-sm font-bold">R$ 99,00</td>
                          <td className="px-6 py-4"><Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Pago</Badge></td>
                          <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="text-xs text-primary">Recibo</Button></td>
                        </tr>
                        <tr className="hover:bg-accent/10 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold">Assinatura Studio Pro</td>
                          <td className="px-6 py-4 text-sm font-medium opacity-70">12 Mar 2026</td>
                          <td className="px-6 py-4 text-sm font-bold">R$ 99,00</td>
                          <td className="px-6 py-4"><Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Pago</Badge></td>
                          <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" className="text-xs text-primary">Recibo</Button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seguranca">
          <Card className="glass max-w-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="text-primary" size={20} /> Segurança da Conta
                </CardTitle>
                <CardDescription>Gerencie suas credenciais e acesso.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-accent/20 rounded-xl border border-border/50">
                    <div>
                      <h4 className="font-bold text-sm">Altenticação em Duas Etapas (2FA)</h4>
                      <p className="text-xs text-muted-foreground">Proteja sua conta com um nível extra de segurança.</p>
                    </div>
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 uppercase tracking-widest text-[9px]">Desativado</Badge>
                  </div>
                   <div className="flex items-center justify-between p-4 bg-accent/20 rounded-xl border border-border/50">
                    <div>
                      <h4 className="font-bold text-sm">Backup Automático do Supabase</h4>
                      <p className="text-xs text-muted-foreground">Seus dados integrados e guardados em nuvem.</p>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 uppercase tracking-widest text-[9px]">Ativo</Badge>
                  </div>
                 </div>

                 <Separator className="bg-border/30" />

                 <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="curr_pass">Senha Atual</Label>
                      <Input id="curr_pass" type="password" px-4 h-12 className="bg-background/50 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                        <Label htmlFor="new_pass">Nova Senha</Label>
                        <Input id="new_pass" type="password" h-12 className="bg-background/50 rounded-xl" />
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="conf_pass">Confirmar Nova Senha</Label>
                        <Input id="conf_pass" type="password" h-12 className="bg-background/50 rounded-xl" />
                      </div>
                    </div>
                 </div>
              </CardContent>
              <CardFooter className="pt-6 border-t border-border/50">
                <Button className="ml-auto neon-glow">Atualizar Senha</Button>
              </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Rocket = ({ size, className }: { size?: number, className?: string }) => (
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
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.71-2.13.09-3.05a3.91 3.91 0 0 0-3.09 0Z" /><path d="M11.5 12.5 7 17" /><path d="M2 22 7 17" /><path d="M12 12c.92.62 2.21.62 3.05-.09 1.5-1.26 2-5 2-5s-3.74.5-5 2c-.71.84-.71 2.13-.09 3.05Z" /><path d="M18 10c.92.62 2.21.62 3.05-.09 1.5-1.26 2-5 2-5s-3.74.5-5 2c-.71.84-.71 2.13-.09 3.05Z" /><path d="m11 20 1-1" /><path d="m15 23 1-1" /><path d="M9 14l1-1" />
  </svg>
);
