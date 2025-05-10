import React, { useState } from 'react';
import { Search, Plus, Calendar } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import AddProjectModal from '../modals/AddProjectModal';

const ProjectsList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Redesign',
      client: 'ABC Corporation',
      deadline: '2025-06-15',
      status: 'in-progress',
      progress: 65,
    },
    {
      id: 2,
      name: 'Mobile App Development',
      client: 'XYZ Technologies',
      deadline: '2025-07-30',
      status: 'not-started',
      progress: 10,
    },
    {
      id: 3,
      name: 'E-commerce Integration',
      client: 'Acme Inc.',
      deadline: '2025-05-20',
      status: 'overdue',
      progress: 80,
    },
    {
      id: 4,
      name: 'Brand Identity Design',
      client: 'Global Solutions',
      deadline: '2025-08-10',
      status: 'not-started',
      progress: 0,
    },
    {
      id: 5,
      name: 'SEO Optimization',
      client: 'Tech Innovators',
      deadline: '2025-05-05',
      status: 'completed',
      progress: 100,
    },
  ]);

  // Extract client names for the dropdown in the Add Project modal
  const clients = projects.map(project => ({ 
    id: project.id, 
    name: project.client 
  })).filter((client, index, self) => 
    index === self.findIndex((c) => c.name === client.name)
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to determine status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'not-started': return 'Not Started';
      case 'overdue': return 'Overdue';
      default: return status;
    }
  };

  const handleAddProject = () => {
    setIsAddModalOpen(true);
  };

  const handleProjectAdded = (newProject: any) => {
    setProjects([newProject, ...projects]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Projects</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="w-[200px] pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button size="sm" onClick={handleAddProject}>
              <Plus className="mr-1 h-4 w-4" />
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <span className="font-medium">{project.name}</span>
                    </TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {formatDate(project.deadline)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`status-badge ${project.status}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={project.progress} className="h-2 w-24" />
                        <span className="text-xs text-muted-foreground">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">No projects found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AddProjectModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onProjectAdded={handleProjectAdded}
        clients={clients}
      />
    </>
  );
};

export default ProjectsList;
