/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toaster } from './components/ui/sonner';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AgendaPage } from './pages/AgendaPage';
import { ClientesPage } from './pages/ClientesPage';
import { FinanceiroPage } from './pages/FinanceiroPage';
import { ProfissionaisPage } from './pages/ProfissionaisPage';
import { ServicosPage } from './pages/ServicosPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes (Mocked Auth) */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/financeiro" element={<FinanceiroPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/profissionais" element={<ProfissionaisPage />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" theme="dark" />
      </BrowserRouter>
    </AppProvider>
  );
}

