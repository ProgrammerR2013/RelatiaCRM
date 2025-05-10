
import React from 'react';
import Header from '@/components/layout/Header';
import ClientsList from '@/components/clients/ClientsList';

const Clients = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Clients" />
      <main className="flex-1 p-6">
        <ClientsList />
      </main>
    </div>
  );
};

export default Clients;
