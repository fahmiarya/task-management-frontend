'use client';

import { useAuthStore } from '@/stores/auth-store';

export default function ProfileViewPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className='flex w-full flex-col p-4'>
      <div className='rounded-lg border bg-card p-6'>
        <div className='mb-6'>
          <h2 className='text-xl font-semibold'>Profile</h2>
          <p className='text-sm text-muted-foreground'>Manage your account information.</p>
        </div>

        {user ? (
          <div className='space-y-4'>
            <div>
              <p className='text-sm font-medium text-muted-foreground'>Name</p>
              <p className='text-sm'>{user.name}</p>
            </div>

            <div>
              <p className='text-sm font-medium text-muted-foreground'>Email</p>
              <p className='text-sm'>{user.email}</p>
            </div>

            <div>
              <p className='text-sm font-medium text-muted-foreground'>Role</p>
              <p className='text-sm'>{user.role}</p>
            </div>

            {user.clientId && (
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Client ID</p>
                <p className='text-sm'>{user.clientId}</p>
              </div>
            )}
          </div>
        ) : (
          <p className='text-sm text-muted-foreground'>No user information available.</p>
        )}
      </div>
    </div>
  );
}
