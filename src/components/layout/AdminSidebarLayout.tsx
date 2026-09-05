import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Settings, LogOut, Code, Eye } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";

export const AdminSidebarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { title: "Beranda", url: "/admin", icon: LayoutDashboard },
    { title: "Daftar Tamu", url: "/admin/guests", icon: Users },
    { title: "Pengaturan Acara", url: "/admin/settings", icon: Settings },
  ];

  return (
    <SidebarProvider>
      <div className="dark flex min-h-screen w-full bg-background font-sans text-foreground">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="py-4 px-2">
            <div className="flex items-center gap-2 px-2 pb-2 border-b border-sidebar-border">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Code className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-sm tracking-wide text-foreground truncate group-data-[collapsible=icon]:opacity-0 transition-opacity">Digital Invite</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Administrator Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.url || (item.url !== "/admin" && location.pathname.startsWith(item.url))}
                        tooltip={item.title}
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Preview Undangan" className="hover:bg-primary/10 hover:text-primary">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <Eye className="text-slate-400" />
                    <span>Preview Undangan</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => { logout(); navigate("/login"); }}
                  tooltip="Logout" 
                  className="text-rose-400 hover:bg-rose-500/10 hover:text-rose-400"
                >
                  <LogOut />
                  <span>Keluar Akun</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-slate-950 flex-1 overflow-x-hidden pt-2">
          {/* Header Mobile / Collapse Trigger */}
          <header className="flex h-12 md:h-0 items-center justify-between gap-2 px-4 shrink-0 transition-[height]">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
