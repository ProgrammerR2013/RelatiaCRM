
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/ui/mode-toggle';

const NavigationMenu = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Clients',
      href: '/clients',
      icon: Users,
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: Briefcase,
    },
    {
      name: 'Invoices',
      href: '/invoices',
      icon: FileText,
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: Calendar,
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-2">
        {navItems.map((item) => (
          <Button 
            key={item.name}
            variant={location.pathname === item.href ? "default" : "ghost"}
            className="flex items-center gap-2"
            asChild
          >
            <Link to={item.href}>
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </Button>
        ))}
      </div>
      
      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Button 
                key={item.name}
                variant={location.pathname === item.href ? "default" : "ghost"}
                className="justify-start"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link to={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavigationMenu;
