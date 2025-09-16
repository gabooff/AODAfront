import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Shield, BarChart3, FileCheck, Home } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/derivacion", label: "Nueva Derivación", icon: FileCheck },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ];

  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-health-primary" />
              <div>
                <h1 className="text-lg font-bold text-foreground">AODA</h1>
                <p className="text-xs text-muted-foreground">Agente de Orientación y Derivación Asistida</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "default" : "ghost"}
                  asChild
                  className="flex items-center space-x-2"
                >
                  <Link to={item.href}>
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;