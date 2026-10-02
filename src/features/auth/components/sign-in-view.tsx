'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InteractiveGridPattern } from './interactive-grid';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

type SignInFormValues = z.infer<typeof signInSchema>;

const demoUsers = [
  {
    id: 'user-pm',
    name: 'Project Manager',
    email: 'pm@example.com',
    role: 'PM' as const
  },
  {
    id: 'user-uiux',
    name: 'UI/UX Designer',
    email: 'uiux@example.com',
    role: 'UI_UX' as const
  },
  {
    id: 'user-frontend',
    name: 'Frontend Engineer',
    email: 'frontend@example.com',
    role: 'FRONTEND' as const
  },
  {
    id: 'user-backend',
    name: 'Backend Engineer',
    email: 'backend@example.com',
    role: 'BACKEND' as const
  },
  {
    id: 'user-client',
    name: 'Client User',
    email: 'client@example.com',
    role: 'CLIENT' as const,
    clientId: 'client-1'
  }
];

export default function SignInViewPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: SignInFormValues) => {
    setError('');

    /*
     * TEMPORARY:
     * This simulates authentication while we remove Clerk.
     *
     * Later this section will become:
     *
     * const response = await api.post('/auth/login', values);
     * setAuth(response.user, response.organizationId, response.permissions);
     */

    const demoUser = demoUsers.find((user) => user.email === values.email);

    if (!demoUser) {
      setError('User not found. Use one of the demo accounts.');
      return;
    }

    if (!values.password) {
      setError('Password is required.');
      return;
    }

    setAuth(
      {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
        clientId: demoUser.clientId
      },
      'demo-org',
      []
    );

    router.push('/dashboard/overview');
  };

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <Link
        href='/dashboard/overview'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 hidden md:top-8 md:right-8'
        )}
      >
        Dashboard
      </Link>

      <div className='relative hidden h-full flex-col p-10 lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-sidebar' />

        <div className='text-sidebar-foreground relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          Task Management
        </div>

        <InteractiveGridPattern
          className={cn(
            'mask-[radial-gradient(400px_circle_at_center,white,transparent)]',
            'inset-x-0 inset-y-[0%] h-full skew-y-12'
          )}
        />

        <div className='text-sidebar-foreground relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;Manage projects, tasks, dependencies and team workflows in one place.&rdquo;
            </p>

            <footer className='text-sidebar-foreground/70 text-sm'>Task Management App</footer>
          </blockquote>
        </div>
      </div>

      <div className='flex h-full items-center justify-center p-4 lg:p-8'>
        <div className='flex w-full max-w-md flex-col items-center justify-center space-y-6'>
          <div className='w-full space-y-2'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign in</h1>

            <p className='text-sm text-muted-foreground'>
              Enter your email and password to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium'>
                Email
              </label>

              <input
                id='email'
                type='email'
                placeholder='you@example.com'
                autoComplete='email'
                {...register('email')}
                className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
              />

              {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
            </div>

            <div className='space-y-2'>
              <label htmlFor='password' className='text-sm font-medium'>
                Password
              </label>

              <input
                id='password'
                type='password'
                placeholder='••••••••'
                autoComplete='current-password'
                {...register('password')}
                className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
              />

              {errors.password && (
                <p className='text-sm text-destructive'>{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className='rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive'>
                {error}
              </div>
            )}

            <button
              type='submit'
              disabled={isSubmitting}
              className={cn(buttonVariants(), 'w-full')}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className='w-full rounded-md border bg-muted/50 p-4'>
            <p className='mb-2 text-sm font-medium'>Demo accounts</p>

            <div className='space-y-1 text-xs text-muted-foreground'>
              <p>PM: pm@example.com</p>
              <p>UI/UX: uiux@example.com</p>
              <p>Frontend: frontend@example.com</p>
              <p>Backend: backend@example.com</p>
              <p>Client: client@example.com</p>
              <p className='pt-1'>Password: any value</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
