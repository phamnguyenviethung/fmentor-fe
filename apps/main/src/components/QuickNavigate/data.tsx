import { Role } from '@libs';
import {
  AccountBalanceWallet,
  Add,
  Assignment,
  AttachMoney,
  CalendarMonth,
  EventAvailable,
  HandshakeOutlined,
  History,
  MeetingRoom,
  Notifications,
  Person,
  School,
  Settings,
  SupportAgent,
} from '@mui/icons-material';
import React from 'react';

export interface SubNavItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  path: string;
  roles?: Role[] | string[];
  badge?: {
    text: string;
    color: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  };
}

export interface NavItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  roles?: Role[] | string[];
  highlighted?: boolean;
  badge?: {
    text: string;
    color: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  };
  children?: SubNavItem[];
}

const navigationItems: NavItem[] = [
  {
    id: 'projects',
    title: 'Projects',
    description: 'Manage all your projects and collaborations',
    icon: <Assignment fontSize="large" />,
    path: '/project/create',
    children: [],
  },

  {
    id: 'finance',
    title: 'Finance',
    description: 'Manage your account balance and transactions',
    icon: <AccountBalanceWallet fontSize="large" />,
    path: '/my-transaction',
    roles: [Role.STUDENT, Role.MENTOR],

    badge: {
      text: 'New',
      color: 'primary',
    },
    children: [
      {
        id: 'my-transactions',
        title: 'Transaction History',
        description: 'View your past transactions',
        icon: <History />,
        path: '/me/transaction',
      },
      {
        id: 'deposit',
        title: 'Deposit Funds',
        description: 'Add money to your account',
        icon: <AttachMoney />,
        path: '/deposit',

        badge: {
          text: 'NEW',
          color: 'success',
        },
      },
    ],
  },

  {
    id: 'availability',
    title: 'Schedule',
    description: 'Manage your schedule and available time slots',
    icon: <CalendarMonth fontSize="large" />,
    path: '/availability',
    children: [
      {
        id: 'manage-schedule',
        title: 'Manage Schedule',
        description: 'Set your weekly availability slots',
        icon: <EventAvailable />,
        path: '/availability',
        roles: [Role.MENTOR],
      },
      {
        id: 'upcoming-appoinments',
        title: 'Upcoming Appoinments',
        description: 'View your scheduled appointments',
        icon: <EventAvailable />,
        path: '/me/appointment',
        roles: [Role.MENTOR, Role.STUDENT],
        badge: {
          text: '3',
          color: 'info',
        },
      },
    ],
  },

  {
    id: 'requests',
    title: 'Requests',
    description: 'Manage all types of service requests',
    icon: <HandshakeOutlined fontSize="large" />,
    path: '/request',
    roles: [Role.LECTURER, Role.MENTOR],
    children: [
      {
        id: 'appointment-requests',
        title: 'Appointments',
        description: 'Schedule and manage meetings',
        icon: <MeetingRoom />,
        path: '/request/appointment',
        roles: [Role.MENTOR],
      },
      {
        id: 'mentoring-requests',
        title: 'Mentoring',
        description: 'Request or manage mentoring sessions',
        icon: <SupportAgent />,
        path: '/request/mentoring',
        roles: [Role.MENTOR],

        badge: {
          text: '2',
          color: 'warning',
        },
      },
      {
        id: 'lecturing-requests',
        title: 'Lecturing',
        description: 'Request or provide lecturing services',
        icon: <School />,
        path: '/request/lecturing',
        roles: [Role.LECTURER],
      },
    ],
  },

  {
    id: 'profile',
    title: 'My Profile',
    description: 'Manage your personal information and settings',
    icon: <Person fontSize="large" />,
    path: '/me/profile',

    children: [],
  },
];

export default navigationItems;
