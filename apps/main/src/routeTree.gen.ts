/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthLayoutImport } from './routes/_authLayout'
import { Route as IndexImport } from './routes/index'
import { Route as JoinIndexImport } from './routes/join/index'
import { Route as AuthLayoutDepositIndexImport } from './routes/_authLayout/deposit/index'
import { Route as AuthLayoutAvailabilityIndexImport } from './routes/_authLayout/availability/index'
import { Route as ProfileMentorIdImport } from './routes/profile/mentor.$id'
import { Route as AuthLayoutRequestMentoringImport } from './routes/_authLayout/request/mentoring'
import { Route as AuthLayoutRequestLecturingImport } from './routes/_authLayout/request/lecturing'
import { Route as AuthLayoutRequestAppointmentImport } from './routes/_authLayout/request/appointment'
import { Route as AuthLayoutProjectCreateImport } from './routes/_authLayout/project/create'
import { Route as AuthLayoutAuthLoginImport } from './routes/_authLayout/auth/login'
import { Route as AuthLayoutProjectDetailIdImport } from './routes/_authLayout/project/detail/$id'
import { Route as AuthLayoutAuthGoogleCallbackImport } from './routes/_authLayout/auth/google.callback'

// Create/Update Routes

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_authLayout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const JoinIndexRoute = JoinIndexImport.update({
  id: '/join/',
  path: '/join/',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutDepositIndexRoute = AuthLayoutDepositIndexImport.update({
  id: '/deposit/',
  path: '/deposit/',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutAvailabilityIndexRoute =
  AuthLayoutAvailabilityIndexImport.update({
    id: '/availability/',
    path: '/availability/',
    getParentRoute: () => AuthLayoutRoute,
  } as any)

const ProfileMentorIdRoute = ProfileMentorIdImport.update({
  id: '/profile/mentor/$id',
  path: '/profile/mentor/$id',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRequestMentoringRoute = AuthLayoutRequestMentoringImport.update(
  {
    id: '/request/mentoring',
    path: '/request/mentoring',
    getParentRoute: () => AuthLayoutRoute,
  } as any,
)

const AuthLayoutRequestLecturingRoute = AuthLayoutRequestLecturingImport.update(
  {
    id: '/request/lecturing',
    path: '/request/lecturing',
    getParentRoute: () => AuthLayoutRoute,
  } as any,
)

const AuthLayoutRequestAppointmentRoute =
  AuthLayoutRequestAppointmentImport.update({
    id: '/request/appointment',
    path: '/request/appointment',
    getParentRoute: () => AuthLayoutRoute,
  } as any)

const AuthLayoutProjectCreateRoute = AuthLayoutProjectCreateImport.update({
  id: '/project/create',
  path: '/project/create',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutAuthLoginRoute = AuthLayoutAuthLoginImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutProjectDetailIdRoute = AuthLayoutProjectDetailIdImport.update({
  id: '/project/detail/$id',
  path: '/project/detail/$id',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutAuthGoogleCallbackRoute =
  AuthLayoutAuthGoogleCallbackImport.update({
    id: '/auth/google/callback',
    path: '/auth/google/callback',
    getParentRoute: () => AuthLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authLayout': {
      id: '/_authLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/join/': {
      id: '/join/'
      path: '/join'
      fullPath: '/join'
      preLoaderRoute: typeof JoinIndexImport
      parentRoute: typeof rootRoute
    }
    '/_authLayout/auth/login': {
      id: '/_authLayout/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLayoutAuthLoginImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_authLayout/project/create': {
      id: '/_authLayout/project/create'
      path: '/project/create'
      fullPath: '/project/create'
      preLoaderRoute: typeof AuthLayoutProjectCreateImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_authLayout/request/appointment': {
      id: '/_authLayout/request/appointment'
      path: '/request/appointment'
      fullPath: '/request/appointment'
      preLoaderRoute: typeof AuthLayoutRequestAppointmentImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_authLayout/request/lecturing': {
      id: '/_authLayout/request/lecturing'
      path: '/request/lecturing'
      fullPath: '/request/lecturing'
      preLoaderRoute: typeof AuthLayoutRequestLecturingImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_authLayout/request/mentoring': {
      id: '/_authLayout/request/mentoring'
      path: '/request/mentoring'
      fullPath: '/request/mentoring'
      preLoaderRoute: typeof AuthLayoutRequestMentoringImport
      parentRoute: typeof AuthLayoutImport
    }
    '/profile/mentor/$id': {
      id: '/profile/mentor/$id'
      path: '/profile/mentor/$id'
      fullPath: '/profile/mentor/$id'
      preLoaderRoute: typeof ProfileMentorIdImport
      parentRoute: typeof rootRoute
    }
    '/_authLayout/availability/': {
      id: '/_authLayout/availability/'
      path: '/availability'
      fullPath: '/availability'
      preLoaderRoute: typeof AuthLayoutAvailabilityIndexImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_authLayout/deposit/': {
      id: '/_authLayout/deposit/'
      path: '/deposit'
      fullPath: '/deposit'
      preLoaderRoute: typeof AuthLayoutDepositIndexImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_authLayout/auth/google/callback': {
      id: '/_authLayout/auth/google/callback'
      path: '/auth/google/callback'
      fullPath: '/auth/google/callback'
      preLoaderRoute: typeof AuthLayoutAuthGoogleCallbackImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_authLayout/project/detail/$id': {
      id: '/_authLayout/project/detail/$id'
      path: '/project/detail/$id'
      fullPath: '/project/detail/$id'
      preLoaderRoute: typeof AuthLayoutProjectDetailIdImport
      parentRoute: typeof AuthLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutRouteChildren {
  AuthLayoutAuthLoginRoute: typeof AuthLayoutAuthLoginRoute
  AuthLayoutProjectCreateRoute: typeof AuthLayoutProjectCreateRoute
  AuthLayoutRequestAppointmentRoute: typeof AuthLayoutRequestAppointmentRoute
  AuthLayoutRequestLecturingRoute: typeof AuthLayoutRequestLecturingRoute
  AuthLayoutRequestMentoringRoute: typeof AuthLayoutRequestMentoringRoute
  AuthLayoutAvailabilityIndexRoute: typeof AuthLayoutAvailabilityIndexRoute
  AuthLayoutDepositIndexRoute: typeof AuthLayoutDepositIndexRoute
  AuthLayoutAuthGoogleCallbackRoute: typeof AuthLayoutAuthGoogleCallbackRoute
  AuthLayoutProjectDetailIdRoute: typeof AuthLayoutProjectDetailIdRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthLayoutAuthLoginRoute: AuthLayoutAuthLoginRoute,
  AuthLayoutProjectCreateRoute: AuthLayoutProjectCreateRoute,
  AuthLayoutRequestAppointmentRoute: AuthLayoutRequestAppointmentRoute,
  AuthLayoutRequestLecturingRoute: AuthLayoutRequestLecturingRoute,
  AuthLayoutRequestMentoringRoute: AuthLayoutRequestMentoringRoute,
  AuthLayoutAvailabilityIndexRoute: AuthLayoutAvailabilityIndexRoute,
  AuthLayoutDepositIndexRoute: AuthLayoutDepositIndexRoute,
  AuthLayoutAuthGoogleCallbackRoute: AuthLayoutAuthGoogleCallbackRoute,
  AuthLayoutProjectDetailIdRoute: AuthLayoutProjectDetailIdRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthLayoutRouteWithChildren
  '/join': typeof JoinIndexRoute
  '/auth/login': typeof AuthLayoutAuthLoginRoute
  '/project/create': typeof AuthLayoutProjectCreateRoute
  '/request/appointment': typeof AuthLayoutRequestAppointmentRoute
  '/request/lecturing': typeof AuthLayoutRequestLecturingRoute
  '/request/mentoring': typeof AuthLayoutRequestMentoringRoute
  '/profile/mentor/$id': typeof ProfileMentorIdRoute
  '/availability': typeof AuthLayoutAvailabilityIndexRoute
  '/deposit': typeof AuthLayoutDepositIndexRoute
  '/auth/google/callback': typeof AuthLayoutAuthGoogleCallbackRoute
  '/project/detail/$id': typeof AuthLayoutProjectDetailIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthLayoutRouteWithChildren
  '/join': typeof JoinIndexRoute
  '/auth/login': typeof AuthLayoutAuthLoginRoute
  '/project/create': typeof AuthLayoutProjectCreateRoute
  '/request/appointment': typeof AuthLayoutRequestAppointmentRoute
  '/request/lecturing': typeof AuthLayoutRequestLecturingRoute
  '/request/mentoring': typeof AuthLayoutRequestMentoringRoute
  '/profile/mentor/$id': typeof ProfileMentorIdRoute
  '/availability': typeof AuthLayoutAvailabilityIndexRoute
  '/deposit': typeof AuthLayoutDepositIndexRoute
  '/auth/google/callback': typeof AuthLayoutAuthGoogleCallbackRoute
  '/project/detail/$id': typeof AuthLayoutProjectDetailIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authLayout': typeof AuthLayoutRouteWithChildren
  '/join/': typeof JoinIndexRoute
  '/_authLayout/auth/login': typeof AuthLayoutAuthLoginRoute
  '/_authLayout/project/create': typeof AuthLayoutProjectCreateRoute
  '/_authLayout/request/appointment': typeof AuthLayoutRequestAppointmentRoute
  '/_authLayout/request/lecturing': typeof AuthLayoutRequestLecturingRoute
  '/_authLayout/request/mentoring': typeof AuthLayoutRequestMentoringRoute
  '/profile/mentor/$id': typeof ProfileMentorIdRoute
  '/_authLayout/availability/': typeof AuthLayoutAvailabilityIndexRoute
  '/_authLayout/deposit/': typeof AuthLayoutDepositIndexRoute
  '/_authLayout/auth/google/callback': typeof AuthLayoutAuthGoogleCallbackRoute
  '/_authLayout/project/detail/$id': typeof AuthLayoutProjectDetailIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/join'
    | '/auth/login'
    | '/project/create'
    | '/request/appointment'
    | '/request/lecturing'
    | '/request/mentoring'
    | '/profile/mentor/$id'
    | '/availability'
    | '/deposit'
    | '/auth/google/callback'
    | '/project/detail/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/join'
    | '/auth/login'
    | '/project/create'
    | '/request/appointment'
    | '/request/lecturing'
    | '/request/mentoring'
    | '/profile/mentor/$id'
    | '/availability'
    | '/deposit'
    | '/auth/google/callback'
    | '/project/detail/$id'
  id:
    | '__root__'
    | '/'
    | '/_authLayout'
    | '/join/'
    | '/_authLayout/auth/login'
    | '/_authLayout/project/create'
    | '/_authLayout/request/appointment'
    | '/_authLayout/request/lecturing'
    | '/_authLayout/request/mentoring'
    | '/profile/mentor/$id'
    | '/_authLayout/availability/'
    | '/_authLayout/deposit/'
    | '/_authLayout/auth/google/callback'
    | '/_authLayout/project/detail/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
  JoinIndexRoute: typeof JoinIndexRoute
  ProfileMentorIdRoute: typeof ProfileMentorIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
  JoinIndexRoute: JoinIndexRoute,
  ProfileMentorIdRoute: ProfileMentorIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authLayout",
        "/join/",
        "/profile/mentor/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authLayout": {
      "filePath": "_authLayout.tsx",
      "children": [
        "/_authLayout/auth/login",
        "/_authLayout/project/create",
        "/_authLayout/request/appointment",
        "/_authLayout/request/lecturing",
        "/_authLayout/request/mentoring",
        "/_authLayout/availability/",
        "/_authLayout/deposit/",
        "/_authLayout/auth/google/callback",
        "/_authLayout/project/detail/$id"
      ]
    },
    "/join/": {
      "filePath": "join/index.tsx"
    },
    "/_authLayout/auth/login": {
      "filePath": "_authLayout/auth/login.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/project/create": {
      "filePath": "_authLayout/project/create.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/request/appointment": {
      "filePath": "_authLayout/request/appointment.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/request/lecturing": {
      "filePath": "_authLayout/request/lecturing.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/request/mentoring": {
      "filePath": "_authLayout/request/mentoring.tsx",
      "parent": "/_authLayout"
    },
    "/profile/mentor/$id": {
      "filePath": "profile/mentor.$id.tsx"
    },
    "/_authLayout/availability/": {
      "filePath": "_authLayout/availability/index.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/deposit/": {
      "filePath": "_authLayout/deposit/index.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/auth/google/callback": {
      "filePath": "_authLayout/auth/google.callback.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/project/detail/$id": {
      "filePath": "_authLayout/project/detail/$id.tsx",
      "parent": "/_authLayout"
    }
  }
}
ROUTE_MANIFEST_END */
