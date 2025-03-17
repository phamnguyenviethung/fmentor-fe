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
import { Route as AuthLayoutProjectCreateImport } from './routes/_authLayout/project/create'
import { Route as AuthLayoutAuthLoginImport } from './routes/_authLayout/auth/login'
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
    '/_authLayout/auth/google/callback': {
      id: '/_authLayout/auth/google/callback'
      path: '/auth/google/callback'
      fullPath: '/auth/google/callback'
      preLoaderRoute: typeof AuthLayoutAuthGoogleCallbackImport
      parentRoute: typeof AuthLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutRouteChildren {
  AuthLayoutAuthLoginRoute: typeof AuthLayoutAuthLoginRoute
  AuthLayoutProjectCreateRoute: typeof AuthLayoutProjectCreateRoute
  AuthLayoutAuthGoogleCallbackRoute: typeof AuthLayoutAuthGoogleCallbackRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthLayoutAuthLoginRoute: AuthLayoutAuthLoginRoute,
  AuthLayoutProjectCreateRoute: AuthLayoutProjectCreateRoute,
  AuthLayoutAuthGoogleCallbackRoute: AuthLayoutAuthGoogleCallbackRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthLayoutRouteWithChildren
  '/auth/login': typeof AuthLayoutAuthLoginRoute
  '/project/create': typeof AuthLayoutProjectCreateRoute
  '/auth/google/callback': typeof AuthLayoutAuthGoogleCallbackRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthLayoutRouteWithChildren
  '/auth/login': typeof AuthLayoutAuthLoginRoute
  '/project/create': typeof AuthLayoutProjectCreateRoute
  '/auth/google/callback': typeof AuthLayoutAuthGoogleCallbackRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authLayout': typeof AuthLayoutRouteWithChildren
  '/_authLayout/auth/login': typeof AuthLayoutAuthLoginRoute
  '/_authLayout/project/create': typeof AuthLayoutProjectCreateRoute
  '/_authLayout/auth/google/callback': typeof AuthLayoutAuthGoogleCallbackRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/auth/login'
    | '/project/create'
    | '/auth/google/callback'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/auth/login' | '/project/create' | '/auth/google/callback'
  id:
    | '__root__'
    | '/'
    | '/_authLayout'
    | '/_authLayout/auth/login'
    | '/_authLayout/project/create'
    | '/_authLayout/auth/google/callback'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
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
        "/_authLayout"
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
        "/_authLayout/auth/google/callback"
      ]
    },
    "/_authLayout/auth/login": {
      "filePath": "_authLayout/auth/login.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/project/create": {
      "filePath": "_authLayout/project/create.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/auth/google/callback": {
      "filePath": "_authLayout/auth/google.callback.tsx",
      "parent": "/_authLayout"
    }
  }
}
ROUTE_MANIFEST_END */
