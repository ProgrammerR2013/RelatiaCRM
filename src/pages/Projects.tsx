
import React from 'react';
import Header from '@/components/layout/Header';
import ProjectsList from '@/components/projects/ProjectsList';

const Projects = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Projects" />
      <main className="flex-1 p-6">
        <ProjectsList />
      </main>
    </div>
  );
};

export default Projects;
