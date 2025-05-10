
import React, { useEffect, useState } from 'react';
import { Users, Briefcase, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getFromLocalStorage, STORAGE_KEYS } from '@/utils/localStorage';

const DashboardCards = () => {
  const [totals, setTotals] = useState({
    clients: 0,
    projects: 0,
    invoices: { count: 0, value: 0 },
    hours: 0,
  });

  useEffect(() => {
    const clients = getFromLocalStorage(STORAGE_KEYS.CLIENTS, []);
    const projects = getFromLocalStorage(STORAGE_KEYS.PROJECTS, []);
    const invoices = getFromLocalStorage(STORAGE_KEYS.INVOICES, []);
    const events = getFromLocalStorage(STORAGE_KEYS.EVENTS, []);

    // Calculate total pending invoice value
    const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
    const pendingValue = pendingInvoices.reduce((total, inv) => {
      const amountStr = inv.amount.replace('$', '').replace(/,/g, '');
      return total + parseFloat(amountStr || '0');
    }, 0);

    // Placeholder for hours tracked (in a real app, this would come from time tracking data)
    const hoursTracked = projects.reduce((total, project) => total + (project.hoursLogged || 0), 0);

    setTotals({
      clients: clients.length,
      projects: projects.filter(p => p.status === 'in-progress').length,
      invoices: { 
        count: pendingInvoices.length,
        value: pendingValue
      },
      hours: hoursTracked || 164, // Default to 164 if no hours logged
    });
  }, []);

  const cards = [
    {
      title: 'Total Clients',
      value: totals.clients.toString(),
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Projects',
      value: totals.projects.toString(),
      icon: Briefcase,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Pending Invoices',
      value: `$${totals.invoices.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: FileText,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100',
    },
    {
      title: 'Hours Tracked',
      value: `${totals.hours}h`,
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`${card.bgColor} p-2 rounded-md`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
