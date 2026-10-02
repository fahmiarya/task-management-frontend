'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { useState } from 'react';

type Organization = {
  id: string;
  name: string;
  imageUrl?: string;
  role: string;
};

const demoOrganizations: Organization[] = [
  {
    id: 'demo-org',
    name: 'Demo Organization',
    role: 'Owner'
  }
];

export function OrgSwitcher() {
  const { isMobile, state } = useSidebar();
  const router = useRouter();

  const [organizations] = useState<Organization[]>(demoOrganizations);
  const [activeOrganizationId, setActiveOrganizationId] = useState<string>(
    demoOrganizations[0]?.id ?? ''
  );

  const activeOrganization = organizations.find(
    (organization) => organization.id === activeOrganizationId
  );

  const handleOrganizationSwitch = (organizationId: string) => {
    setActiveOrganizationId(organizationId);

    // Nanti bisa digunakan untuk:
    // - menyimpan active organization/client
    // - update Zustand store
    // - request ke backend
  };

  if (organizations.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            onClick={() => router.push('/dashboard/workspaces')}
            className='data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground'
          >
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg'>
              <Icons.add className='size-4' />
            </div>

            <div
              className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                state === 'collapsed'
                  ? 'invisible max-w-0 overflow-hidden opacity-0'
                  : 'visible max-w-full opacity-100'
              }`}
            >
              <span className='truncate font-medium'>Create organization</span>

              <span className='text-muted-foreground truncate text-xs'>Get started</span>
            </div>

            <Icons.chevronsUpDown
              className={`ml-auto transition-all duration-200 ease-in-out ${
                state === 'collapsed'
                  ? 'invisible max-w-0 opacity-0'
                  : 'visible max-w-full opacity-100'
              }`}
            />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!activeOrganization) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size='lg'
                className='data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground'
              />
            }
          >
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg'>
              {activeOrganization.imageUrl ? (
                <Image
                  src={activeOrganization.imageUrl}
                  alt={activeOrganization.name}
                  width={32}
                  height={32}
                  className='size-full object-cover'
                />
              ) : (
                <Icons.galleryVerticalEnd className='size-4' />
              )}
            </div>

            <div
              className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                state === 'collapsed'
                  ? 'invisible max-w-0 overflow-hidden opacity-0'
                  : 'visible max-w-full opacity-100'
              }`}
            >
              <span className='truncate font-medium'>{activeOrganization.name}</span>

              <span className='text-muted-foreground truncate text-xs'>
                {activeOrganization.role}
              </span>
            </div>

            <Icons.chevronsUpDown
              className={`ml-auto transition-all duration-200 ease-in-out ${
                state === 'collapsed'
                  ? 'invisible max-w-0 opacity-0'
                  : 'visible max-w-full opacity-100'
              }`}
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-(--anchor-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className='text-muted-foreground text-xs'>
                Organizations
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              {organizations.map((organization, index) => {
                const isActive = organization.id === activeOrganizationId;

                return (
                  <DropdownMenuItem
                    key={organization.id}
                    onClick={() => handleOrganizationSwitch(organization.id)}
                    className='gap-2 p-2'
                  >
                    <div className='flex size-6 items-center justify-center overflow-hidden rounded-md border'>
                      {organization.imageUrl ? (
                        <Image
                          src={organization.imageUrl}
                          alt={organization.name}
                          width={24}
                          height={24}
                          className='size-full object-cover'
                        />
                      ) : (
                        <Icons.galleryVerticalEnd className='size-3.5 shrink-0' />
                      )}
                    </div>

                    {organization.name}

                    {isActive && <Icons.check className='ml-auto size-4' />}

                    {!isActive && <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem
                className='gap-2 p-2'
                onClick={() => {
                  router.push('/dashboard/workspaces');
                }}
              >
                <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
                  <Icons.add className='size-4' />
                </div>

                <div className='text-muted-foreground font-medium'>Add organization</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
