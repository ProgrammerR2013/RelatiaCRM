
import React, { useState, useEffect } from 'react';
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
import { getFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from '@/utils/localStorage';

interface Project {
  id: number;
  name: string;
  client: string;
  deadline: string;
  status: string;
  progress: number;
}

interface Client {
  id: number;
  name: string;
}

const ProjectsList = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  // Load projects and clients from local storage on initial render
  useEffect(() => {
    const savedProjects = getFromLocalStorage<Project[]>(STORAGE_KEYS.PROJECTS, []);
    const savedClients = getFromLocalStorage<Client[]>(STORAGE_KEYS.CLIENTS, []);
    setProjects(savedProjects);
    
    // Transform clients data to match the expected format for the dropdown
    const clientsForDropdown = savedClients.map(client => ({
      id: client.id,
      name: client.name
    }));
    setClients(clientsForDropdown);
  }, []);

  // Save projects to local storage when they change
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

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

  const handleProjectAdded = (newProject: Project) => {
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
