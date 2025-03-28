
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart, 
  Home, 
  Upload, 
  Layers, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight,
  PieChart,
  FolderCog
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Upload", href: "/upload", icon: Upload },
    { name: "Transactions", href: "/transactions", icon: Layers },
    { name: "Insights", href: "/insights", icon: BarChart },
    { name: "Categories", href: "/categories", icon: FolderCog },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className={cn(
      "relative h-screen bg-card border-r border-border transition-all duration-300 ease-in-out",
      collapsed ? "w-[80px]" : "w-[250px]",
      className
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          {!collapsed && (
            <span className="text-xl font-semibold animate-fade-in">StateSense</span>
          )}
          {collapsed && <PieChart className="h-6 w-6 text-primary animate-fade-in" />}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-full hover:bg-secondary transition-colors"
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="mt-6 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2.5 rounded-md transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    collapsed ? "justify-center" : ""
                  )
                }
              >
                <item.icon className={cn("flex-shrink-0", collapsed ? "h-6 w-6" : "h-5 w-5 mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className={cn(
          "p-3 rounded-lg bg-secondary/80",
          collapsed ? "text-center" : ""
        )}>
          {!collapsed ? (
            <div className="animate-fade-in">
              <p className="text-xs text-muted-foreground">AI Accuracy</p>
              <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[75%] rounded-full" />
              </div>
              <p className="mt-1 text-xs text-right font-medium">75%</p>
            </div>
          ) : (
            <div className="flex justify-center animate-fade-in">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">75%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
