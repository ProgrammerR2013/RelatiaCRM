
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import DashboardCards from '@/components/dashboard/DashboardCards';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getFromLocalStorage, STORAGE_KEYS } from '@/utils/localStorage';

interface RevenueData {
  name: string;
  revenue: number;
  expenses: number;
}

const Dashboard = () => {
  const [chartData, setChartData] = useState<RevenueData[]>([]);

  useEffect(() => {
    // Get invoices from localStorage
    const invoices = getFromLocalStorage(STORAGE_KEYS.INVOICES, []);
    
    // Create empty data structure for last 6 months
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push({
        date: new Date(d.getFullYear(), d.getMonth(), 1),
        name: d.toLocaleString('default', { month: 'short' }),
        revenue: 0,
        expenses: Math.floor(Math.random() * 2000 + 1000) // Random expenses as placeholder
      });
    }
    
    // Calculate revenue from invoices
    invoices.forEach(invoice => {
      if (invoice.status === 'paid') {
        const invoiceDate = new Date(invoice.date);
        const amount = parseFloat(invoice.amount.replace('$', '').replace(/,/g, ''));
        
        // Find the month this invoice belongs to
        const monthIndex = months.findIndex(m => 
          m.date.getMonth() === invoiceDate.getMonth() && 
          m.date.getFullYear() === invoiceDate.getFullYear()
        );
        
        if (monthIndex !== -1) {
          months[monthIndex].revenue += amount;
        }
      }
    });
    
    setChartData(months);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Dashboard" />
      <main className="flex-1 p-6 space-y-6">
        <DashboardCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UpcomingTasks />
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#8B5CF6" name="Revenue" />
                    <Bar dataKey="expenses" fill="#E5E7EB" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No revenue data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
