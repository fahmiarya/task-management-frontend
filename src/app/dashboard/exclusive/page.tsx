'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';

export default function ExclusivePage() {
  const isLoaded = true; // Replace with actual loading state

  return (
    <PageContainer isLoading={!isLoaded}>
      <div className='space-y-6'>
        <div>
          <h1 className='flex items-center gap-2 text-3xl font-bold tracking-tight'>
            <Icons.badgeCheck className='h-7 w-7 text-green-600' />
            Exclusive Area
          </h1>
          <p className='text-muted-foreground'>
            Welcome, <span className='font-semibold'>{}</span>! This page contains exclusive
            features for Pro plan organizations.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Thank You for Checking Out the Exclusive Page</CardTitle>
            <CardDescription>
              This means you belong to an organization subscribed to the Pro plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-lg'>Have a wonderful day!</div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
