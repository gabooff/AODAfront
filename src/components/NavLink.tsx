import { Link, useLocation } from "react-router-dom"; // or your router library
import { Button } from "@/components/ui/button";

const NavLink = ({ item }) => {
  const Icon = item.icon;
  const location = useLocation();
  const isActive = location.pathname === item.href;
  return item.label === "Salir" ? (
    <Button
      onClick={item.onClick}
      variant="destructive"
      className="flex items-center space-x-2"
    >
      <Icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Button>
  ) : (
    <Link to={item.href}>
      <Button
        variant={isActive ? "default" : "ghost"}
        className="flex items-center space-x-2"
      >
        <Icon className="h-4 w-4" />
        <span>{item.label}</span>
      </Button>
    </Link>
  );
};

export default NavLink;
