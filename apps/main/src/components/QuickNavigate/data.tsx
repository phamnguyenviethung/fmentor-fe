import { Role } from '@libs';
import {
  AccountBalanceWallet,
  Add,
  Assignment,
  AttachMoney,
  Book,
  CalendarMonth,
  Dashboard,
  EventAvailable,
  Feedback,
  Forum,
  Group,
  HandshakeOutlined,
  History,
  MeetingRoom,
  MenuBook,
  Notifications,
  Person,
  PersonSearch,
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
    path: '/project',
    children: [
      {
        id: 'create-project',
        title: 'Create Project',
        description: 'Start a new project or initiative',
        icon: <Add />,
        path: '/project/create',
      },
    ],
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
    title: 'Availability',
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
    id: 'community',
    title: 'Community',
    description: 'Connect with peers and mentors',
    icon: <Group fontSize="large" />,
    path: '/community',

    children: [
      {
        id: 'forums',
        title: 'Discussion Forums',
        description: 'Participate in community discussions',
        icon: <Forum />,
        path: '/community/forums',
      },
      {
        id: 'find-mentors',
        title: 'Find Mentors',
        description: 'Browse and connect with mentors',
        icon: <PersonSearch />,
        path: '/community/mentors',
      },
      {
        id: 'feedback',
        title: 'Submit Feedback',
        description: 'Share your thoughts and suggestions',
        icon: <Feedback />,
        path: '/community/feedback',
      },
    ],
  },

  {
    id: 'profile',
    title: 'My Profile',
    description: 'Manage your personal information and settings',
    icon: <Person fontSize="large" />,
    path: '/profile',

    children: [
      {
        id: 'edit-profile',
        title: 'Edit Profile',
        description: 'Update your personal information',
        icon: <Person />,
        path: '/profile/edit',
      },
      {
        id: 'notifications',
        title: 'Notifications',
        description: 'Manage your notification preferences',
        icon: <Notifications />,
        path: '/profile/notifications',

        badge: {
          text: '5',
          color: 'error',
        },
      },
      {
        id: 'settings',
        title: 'Account Settings',
        description: 'Manage your account preferences',
        icon: <Settings />,
        path: '/profile/settings',
      },
    ],
  },

  {
    id: 'resources',
    title: 'Resources',
    description: 'Access learning materials and documentation',
    icon: <MenuBook fontSize="large" />,
    path: '/resources',

    children: [
      {
        id: 'guides',
        title: 'User Guides',
        description: 'Documentation and how-to guides',
        icon: <Book />,
        path: '/resources/guides',
      },
      {
        id: 'learning-path',
        title: 'Learning Paths',
        description: 'Structured learning courses and materials',
        icon: <School />,
        path: '/resources/learning-paths',

        badge: {
          text: 'New',
          color: 'success',
        },
      },
    ],
  },
];

export default navigationItems;
