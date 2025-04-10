export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const APP_CONFIG = {
  title: 'Internal Tools',
  description: 'Internal tools for managing company resources',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0',
} as const;

export const ROUTES = {
  HOME: '/',
  OFFER_LETTER: '/offer-letter',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
} as const; 