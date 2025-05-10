
import React from 'react';
import Header from '@/components/layout/Header';
import { Search, Plus, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Invoices = () => {
  const invoices = [
    {
      id: 'INV-001',
      client: 'ABC Corporation',
      amount: '$2,400',
      status: 'paid',
      date: '2025-05-01',
      dueDate: '2025-05-15',
    },
    {
      id: 'INV-002',
      client: 'XYZ Technologies',
      amount: '$1,800',
      status: 'pending',
      date: '2025-05-05',
      dueDate: '2025-05-20',
    },
    {
      id: 'INV-003',
      client: 'Acme Inc.',
      amount: '$3,200',
      status: 'overdue',
      date: '2025-04-15',
      dueDate: '2025-04-30',
    },
    {
      id: 'INV-004',
      client: 'Global Solutions',
      amount: '$950',
      status: 'draft',
      date: '2025-05-10',
      dueDate: '-',
    },
    {
      id: 'INV-005',
      client: 'Tech Innovators',
      amount: '$4,500',
      status: 'paid',
      date: '2025-04-28',
      dueDate: '2025-05-12',
    },
  ];

  const formatDate = (dateString: string) => {
    if (dateString === '-') return '-';
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid': return 'completed';
      case 'pending': return 'in-progress';
      case 'overdue': return 'overdue';
      case 'draft': return 'not-started';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Invoices" />
      <main className="flex-1 p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Invoices</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  className="w-[200px] pl-8"
                />
              </div>
              <Button size="sm">
                <Plus className="mr-1 h-4 w-4" />
                Create Invoice
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{invoice.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                    <TableCell>
                      <span className={`status-badge ${getStatusClass(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Invoices;
