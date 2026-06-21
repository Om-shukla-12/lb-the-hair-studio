import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Tenant-Slug': process.env.NEXT_PUBLIC_TENANT_SLUG || '',
  },
});
