
import React from 'react';
import { Users, Briefcase, FileText, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardCards = () => {
  const cards = [
    {
      title: 'Total Clients',
      value: '12',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Projects',
      value: '7',
      icon: Briefcase,
      color: 'text-green-500',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Pending Invoices',
      value: '$5,240',
      icon: FileText,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100',
    },
    {
      title: 'Hours Tracked',
      value: '164h',
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
