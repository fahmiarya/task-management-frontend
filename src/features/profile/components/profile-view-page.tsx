'use client';

import { useAuthStore } from '@/stores/auth-store';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfileViewPage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>You are not signed in.</CardDescription>
          </CardHeader>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account information.</CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div>
            <p className='text-sm font-medium'>Name</p>
            <p className='text-muted-foreground text-sm'>{user.name}</p>
          </div>

          <div>
            <p className='text-sm font-medium'>Email</p>
            <p className='text-muted-foreground text-sm'>{user.email}</p>
          </div>

          <div>
            <p className='text-sm font-medium'>Role</p>
            <p className='text-muted-foreground text-sm'>{user.role}</p>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
