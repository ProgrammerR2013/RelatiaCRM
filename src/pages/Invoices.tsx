
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Search, Plus, FileText } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import AddInvoiceModal from '@/components/modals/AddInvoiceModal';
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '@/utils/localStorage';

interface Invoice {
  id: string;
  client: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  date: string;
  dueDate: string;
}

interface Client {
  id: number;
  name: string;
}

const Invoices = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  // Load invoices and clients from local storage on initial render
  useEffect(() => {
    const savedInvoices = getFromLocalStorage<Invoice[]>(STORAGE_KEYS.INVOICES, []);
    const savedClients = getFromLocalStorage<Client[]>(STORAGE_KEYS.CLIENTS, []);
    setInvoices(savedInvoices);
    
    // Transform clients data to match the expected format for the dropdown
    const clientsForDropdown = savedClients.map(client => ({
      id: client.id,
      name: client.name
    }));
    setClients(clientsForDropdown);
  }, []);

  // Save invoices to local storage when they change
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.INVOICES, invoices);
  }, [invoices]);

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

  const handleCreateInvoice = () => {
    setIsAddModalOpen(true);
  };

  const handleInvoiceAdded = (newInvoice: Invoice) => {
    setInvoices([newInvoice, ...invoices]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
    invoice.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the last invoice ID to generate the next one
  const getLastInvoiceId = () => {
    if (invoices.length === 0) return "INV-000";
    const invoiceIds = invoices.map(inv => {
      const numPart = inv.id.split('-')[1];
      return parseInt(numPart, 10);
    });
    const highestNum = Math.max(...invoiceIds);
    return `INV-${highestNum.toString().padStart(3, '0')}`;
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
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <Button size="sm" onClick={handleCreateInvoice}>
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
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">No invoices found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <AddInvoiceModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onInvoiceAdded={handleInvoiceAdded}
          clients={clients}
          lastInvoiceId={getLastInvoiceId()}
        />
      </main>
    </div>
  );
};

export default Invoices;
