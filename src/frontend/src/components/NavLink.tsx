import { Link, useLocation } from "@tanstack/react-router";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
  onNavigate?: () => void;
}

export function NavLink({ to, children, mobile, onNavigate }: NavLinkProps) {
  const location = useLocation();
  const isActive =
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  const ocid = `nav-link-${to.replace(/^\//, "").replace(/\//g, "-")}`;

  if (mobile) {
    return (
      <Link
        to={to}
        onClick={onNavigate}
        className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 min-h-[44px] active:opacity-80 ${
          isActive
            ? "text-white bg-white/15"
            : "text-white/75 hover:text-white hover:bg-white/10"
        }`}
        data-ocid={ocid}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
        {isActive && (
          <span
            className="ml-auto w-2 h-2 rounded-full bg-accent shrink-0"
            aria-hidden="true"
          />
        )}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className={`relative px-1 py-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
        isActive ? "text-white" : "text-white/60 hover:text-white"
      }`}
      data-ocid={ocid}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
      {isActive && (
        <span
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
