import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BillingPage() {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Billing management is not part of the Task Management assessment.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className='text-muted-foreground'>Billing functionality is currently unavailable.</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
