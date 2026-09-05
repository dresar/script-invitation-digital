import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import { AuthProvider, ProtectedRoute } from "@/components/AuthProvider";
import { AdminSettingsProvider } from "@/contexts/AdminSettingsContext";

// Baru: Layout & Admin Pages
import { AdminSidebarLayout } from "@/components/layout/AdminSidebarLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import GuestsPage from "@/pages/admin/GuestsPage";
import SettingsPage from "@/pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AdminSettingsProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/:slug" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminSidebarLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardPage />} />
                <Route path="guests" element={<GuestsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminSettingsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
