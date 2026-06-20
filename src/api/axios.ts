import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://calendiq-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'X-Tenant-Slug': 'lb-the-hair-studio',
  },
});
