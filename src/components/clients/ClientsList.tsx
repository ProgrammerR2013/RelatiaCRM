
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import AddClientModal from '../modals/AddClientModal';

const ClientsList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'ABC Corporation',
      contact: 'John Smith',
      email: 'john@abccorp.com',
      phone: '(123) 456-7890',
      projects: 3,
      status: 'active',
    },
    {
      id: 2,
      name: 'XYZ Technologies',
      contact: 'Sarah Johnson',
      email: 'sarah@xyztech.com',
      phone: '(234) 567-8901',
      projects: 2,
      status: 'active',
    },
    {
      id: 3,
      name: 'Acme Inc.',
      contact: 'David Miller',
      email: 'david@acmeinc.com',
      phone: '(345) 678-9012',
      projects: 1,
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Global Solutions',
      contact: 'Emily Davis',
      email: 'emily@globalsolutions.com',
      phone: '(456) 789-0123',
      projects: 0,
      status: 'active',
    },
    {
      id: 5,
      name: 'Tech Innovators',
      contact: 'Michael Wilson',
      email: 'michael@techinnovators.com',
      phone: '(567) 890-1234',
      projects: 2,
      status: 'active',
    },
  ]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleAddClient = () => {
    setIsAddModalOpen(true);
  };

  const handleClientAdded = (newClient: any) => {
    setClients([newClient, ...clients]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Clients</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients..."
                className="w-[200px] pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button size="sm" onClick={handleAddClient}>
              <Plus className="mr-1 h-4 w-4" />
              Add Client
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt={client.name} />
                          <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{client.contact}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.projects}</TableCell>
                    <TableCell>
                      <span className={`status-badge ${client.status === 'active' ? 'completed' : 'not-started'}`}>
                        {client.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No clients found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AddClientModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onClientAdded={handleClientAdded}
      />
    </>
  );
};

export default ClientsList;
