
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCertification } from "@/contexts/CertificationContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { isCertified } = useCertification();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", requiresAuth: true },
    { label: "Certification", href: "/certification", requiresAuth: true },
    { label: "Pro Mode", href: "/pro", requiresAuth: true, requiresCertification: true },
    { label: "Glossary", href: "/glossary", requiresAuth: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 sticky top-0 z-50 shadow-apple">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap gradient-text">Copy Tuner</span>
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {navLinks.map((link, index) => {
              if (link.requiresAuth && !isAuthenticated) return null;
              if (link.requiresCertification && !isCertified) return null;
              
              return (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className={`block py-2 pr-4 pl-3 rounded md:p-0 ${
                      isActive(link.href)
                        ? "text-primary font-semibold"
                        : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && <span className="block h-0.5 bg-primary mt-0.5"></span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Menu / Auth Buttons */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                    {user?.name ? user.name[0] : user?.email[0].toUpperCase()}
                  </div>
                  <span className="hidden md:block">{user?.name || user?.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full">Dashboard</Link>
                </DropdownMenuItem>
                {isCertified && (
                  <DropdownMenuItem>
                    <Link to="/pro" className="w-full">Pro Mode</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button asChild variant="ghost">
                <Link to="/auth">Login</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:hidden`}
          id="navbar-mobile"
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100">
            {navLinks.map((link, index) => {
              if (link.requiresAuth && !isAuthenticated) return null;
              if (link.requiresCertification && !isCertified) return null;
              
              return (
                <li key={index} className="mb-2 last:mb-0">
                  <Link
                    to={link.href}
                    className={`block py-2 pr-4 pl-3 rounded ${
                      isActive(link.href)
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
