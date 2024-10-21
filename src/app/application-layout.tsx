'use client'

import { Avatar } from 'src/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from 'src/components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from 'src/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from 'src/components/sidebar'
import { SidebarLayout } from 'src/components/sidebar-layout'
import {
  ArrowRightStartOnRectangleIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'
import { getEvents } from './data'
import { getAccount } from '@/lib/account'
import { ThirdwebAuthProvider, useAddress } from '@thirdweb-dev/react'
import Bio from './bio'
import WalletProvider from '@/providers/walletProvider'
import TreadingCircles from '@/components/trendingCircles'

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="/settings">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Disconnect Wallet</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({

  children,
}: {

  children: React.ReactNode
}) {
  let pathname = usePathname()



  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/soke.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/teams/logo.png" />
                <SidebarLabel>Circles</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="/profile">
                  <Cog8ToothIcon />
                  <DropdownLabel>Account</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/circles">
                  <Avatar slot="icon" src="/teams/logo.png" />
                  <DropdownLabel>Join a circle</DropdownLabel>
                </DropdownItem>
                {/* <DropdownItem href="#">
                  <BookOpenIcon />
                  <DropdownLabel>Docs</DropdownLabel>
                </DropdownItem> */}
                <DropdownDivider />
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/circles" current={pathname.startsWith('/circles')}>
                <Square2StackIcon />
                <SidebarLabel>Circles</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/create" current={pathname.startsWith('/create')}>
                <Cog6ToothIcon />
                <SidebarLabel>Create a Circle</SidebarLabel>
              </SidebarItem>
              {/* <SidebarItem href="/transactions" current={pathname.startsWith('/transactions')}>
                <TicketIcon />
                <SidebarLabel>Transaction History</SidebarLabel>
              </SidebarItem> */}
              <SidebarItem href="/profile" current={pathname.startsWith('/profile')}>
                <Cog6ToothIcon />
                <SidebarLabel>Profile</SidebarLabel>
              </SidebarItem>


            </SidebarSection>
            {/* <TreadingCircles/> */}


            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">

                <SidebarLabel>Join Telegram</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">

                <SidebarLabel>Follow us on X</SidebarLabel>
              </SidebarItem>
              {/* <SidebarItem href="#">
                <BookOpenIcon />
                <SidebarLabel>Docs</SidebarLabel>
              </SidebarItem> */}
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <WalletProvider>
                  <Bio />
                </WalletProvider>
                <ChevronUpIcon />
              </DropdownButton>
              <AccountDropdownMenu anchor="top start" />
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
