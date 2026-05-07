import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  title: string;
  roleColor: string;
  navItems: NavItem[];
  children: ReactNode;
}

const DashboardLayout = ({ title, roleColor, navItems, children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-border bg-card md:flex">
        <div className={`flex items-center gap-3 px-6 py-5 ${roleColor}`}>
          <button onClick={() => navigate("/role-select")} className="rounded-lg p-1 hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-bold">{title}</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 md:hidden ${roleColor}`}>
          <button onClick={() => navigate("/role-select")} className="rounded-lg p-1 hover:opacity-80">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="font-bold min-w-0 truncate">{title}</span>
        </header>

        {/* Mobile nav */}
        <div className="flex flex-wrap gap-2 overflow-x-auto border-b border-border px-2 py-2 md:hidden">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium min-w-[6rem] break-words ${
                  active ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
