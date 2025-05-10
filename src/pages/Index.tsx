
import React from 'react';
import Header from '@/components/layout/Header';
import DashboardCards from '@/components/dashboard/DashboardCards';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 9800, expenses: 2000 },
  { name: 'Apr', revenue: 3908, expenses: 2780 },
  { name: 'May', revenue: 4800, expenses: 1890 },
  { name: 'Jun', revenue: 3800, expenses: 2390 },
];

const Dashboard = () => {
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
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8B5CF6" name="Revenue" />
                  <Bar dataKey="expenses" fill="#E5E7EB" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
