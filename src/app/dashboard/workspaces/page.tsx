'use client';

import PageContainer from '@/components/layout/page-container';
import { workspacesInfoContent } from '@/config/infoconfig';

const projects = [
  {
    id: 'project-1',
    name: 'Website Redesign',
    description: 'Redesign company website',
    status: 'In Progress',
    tasks: 12
  },
  {
    id: 'project-2',
    name: 'Mobile Application',
    description: 'Development of mobile application',
    status: 'Planning',
    tasks: 8
  },
  {
    id: 'project-3',
    name: 'Internal Dashboard',
    description: 'Internal management dashboard',
    status: 'In Progress',
    tasks: 15
  }
];

export default function WorkspacesPage() {
  return (
    <PageContainer
      pageTitle='Projects'
      pageDescription='Manage and switch between your projects'
      infoContent={workspacesInfoContent}
    >
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <div
            key={project.id}
            className='rounded-lg border bg-card p-5 transition-colors hover:bg-accent'
          >
            <div className='space-y-3'>
              <div>
                <h3 className='text-lg font-semibold'>{project.name}</h3>

                <p className='text-sm text-muted-foreground'>{project.description}</p>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm text-muted-foreground'>{project.tasks} tasks</span>

                <span className='rounded-md bg-muted px-2 py-1 text-xs'>{project.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
