import { Shield, BarChart3, FileCheck, Home, User, LogOut } from "lucide-react";
import { useIsAuthenticated, useLogout } from "@/hooks/useAuth";
import NavLink from "./NavLink";

const Navigation = () => {
  const isAuthenticated = useIsAuthenticated();
  const logOut = useLogout();
  const navItems = isAuthenticated
    ? [
        { href: "/derivacion", label: "Nueva Derivación", icon: FileCheck },
        { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
        { href: "/logout", label: "Salir", icon: LogOut, onClick: logOut },
      ]
    : [
        { href: "/", label: "Inicio", icon: Home },
        { href: "/login", label: "Login", icon: User },
      ];

  return (
    <nav className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={"aoda-logo.jpeg"}
                className="h-8 w-8 text-health-primary"
              />
              <div>
                <h1 className="text-lg font-bold text-foreground">AODA</h1>
                <p className="text-xs text-muted-foreground">
                  Agente de Orientación y Derivación Asistida
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-1">
            {navItems.map((item) => (
              <NavLink item={item} key={item.label} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
