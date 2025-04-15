/**
 * API client for communicating with the Express backend
 */

// Type definitions for API requests and responses
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  reviews?: Review[];
}

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment?: string;
  user?: {
    id: string;
    name?: string;
    image?: string;
  };
}

interface User {
  id: string;
  name?: string;
  email: string;
  role?: string;
  createdAt?: string;
}

interface WelcomeFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  faculty: string;
}

interface WelcomeFormResponse {
  message: string;
  submission?: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    faculty: string;
    createdAt: string;
    updatedAt: string;
  };
  note?: string;
}

// Get the API URL from environment variables or use a default for local development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Generic fetch function with error handling
 */
async function fetchAPI<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred while fetching data');
  }

  return data as T;
}

/**
 * Products API
 */
export const productsAPI = {
  getAll: () => fetchAPI<Product[]>('/api/products'),
  getById: (id: string) => fetchAPI<Product>(`/api/products/${id}`),
  create: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => fetchAPI<Product>('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) => fetchAPI<Product>(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchAPI<{ message: string }>(`/api/products/${id}`, {
    method: 'DELETE',
  }),
};

/**
 * Users API
 */
export const usersAPI = {
  getAll: () => fetchAPI<User[]>('/api/users'),
  create: (data: { name: string; email: string; password: string; role?: string }) => fetchAPI<User>('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

/**
 * Welcome Form API
 */
export const welcomeFormAPI = {
  submit: (data: WelcomeFormData) => fetchAPI<WelcomeFormResponse>('/api/welcome-form', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

const apiClient = {
  products: productsAPI,
  users: usersAPI,
  welcomeForm: welcomeFormAPI,
};

export default apiClient;
