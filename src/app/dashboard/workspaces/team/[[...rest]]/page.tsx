import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TeamPage() {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>Team</CardTitle>
          <CardDescription>
            Team management will be handled by the Task Management API.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className='text-muted-foreground'>
            Team management is currently being migrated from Clerk.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
