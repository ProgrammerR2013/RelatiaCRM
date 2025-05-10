
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Calendar,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NavigationMenu = () => {
  const location = useLocation();
  
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
    <div className="hidden md:flex items-center space-x-2">
      <Menubar className="border-none">
        {navItems.map((item) => (
          <MenubarMenu key={item.name}>
            <MenubarTrigger asChild>
              <Button 
                variant={location.pathname === item.href ? "default" : "ghost"}
                className="flex items-center gap-2"
                asChild
              >
                <Link to={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" className="relative">
          <Menu />
        </Button>
      </div>
    </div>
  );
};

export default NavigationMenu;
