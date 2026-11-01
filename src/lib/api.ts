import { Project, Service, FAQ, Testimonial, Enquiry, CompanySettings, AdminUser, GalleryItem } from '../types';

const API_BASE = '/api';

export function getAdminToken(): string | null {
  return localStorage.getItem('rg_admin_token');
}

export function setAdminToken(token: string): void {
  localStorage.setItem('rg_admin_token', token);
}

export function removeAdminToken(): void {
  localStorage.removeItem('rg_admin_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred while communicating with the server.');
  }

  return data;
}

export const api = {
  // Public
  getProjects: (category?: string) =>
    request<{ success: boolean; projects: Project[] }>(`/projects${category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''}`),
  
  getProject: (slugOrId: string) =>
    request<{ success: boolean; project: Project }>(`/projects/${slugOrId}`),

  getServices: () =>
    request<{ success: boolean; services: Service[] }>('/services'),

  getService: (slugOrId: string) =>
    request<{ success: boolean; service: Service }>(`/services/${slugOrId}`),

  getFaqs: () =>
    request<{ success: boolean; faqs: FAQ[] }>('/faqs'),

  getTestimonials: () =>
    request<{ success: boolean; testimonials: Testimonial[] }>('/testimonials'),

  getGallery: (category?: string, featured?: boolean) => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (featured) params.append('featured', '1');
    const qs = params.toString() ? `?${params.toString()}` : '';
    return request<{ success: boolean; gallery: GalleryItem[] }>(`/gallery${qs}`);
  },

  getCompanySettings: () =>
    request<{ success: boolean; settings: CompanySettings }>('/company'),

  submitEnquiry: (data: Partial<Enquiry>) =>
    request<{ success: boolean; message: string; refCode: string; enquiryId: number; whatsappNumber: string }>(
      '/enquiries',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    ),

  submitContactMessage: (data: { name: string; emailOrPhone: string; subject?: string; message: string }) =>
    request<{ success: boolean; message: string; refCode: string }>('/company/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Admin Auth
  adminLogin: (credentials: { username: string; password: string }) =>
    request<{ success: boolean; token: string; user: AdminUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  adminCheckAuth: () =>
    request<{ success: boolean; user: AdminUser }>('/auth/me'),

  // Admin Operations
  getDashboardStats: () =>
    request<{
      success: boolean;
      stats: {
        totalEnquiries: number;
        newEnquiries: number;
        inProgressEnquiries: number;
        completedEnquiries: number;
        totalProjects: number;
        totalServices: number;
        totalFaqs: number;
        totalGallery?: number;
      };
      statusBreakdown: { status: string; count: number }[];
      recentEnquiries: Enquiry[];
    }>('/admin/dashboard'),

  getEnquiries: (status?: string, search?: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return request<{ success: boolean; enquiries: Enquiry[]; totalCount: number }>(`/enquiries?${params.toString()}`);
  },

  updateEnquiryStatus: (id: number, status: string, adminNotes?: string) =>
    request<{ success: boolean; enquiry: Enquiry }>(`/enquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, adminNotes }),
    }),

  deleteEnquiry: (id: number) =>
    request<{ success: boolean; message: string }>(`/enquiries/${id}`, {
      method: 'DELETE',
    }),

  createProject: (data: any) =>
    request<{ success: boolean; project: Project }>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProject: (id: number, data: any) =>
    request<{ success: boolean; message: string }>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteProject: (id: number) =>
    request<{ success: boolean; message: string }>(`/projects/${id}`, {
      method: 'DELETE',
    }),

  updateService: (id: number, data: any) =>
    request<{ success: boolean; message: string }>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  createFaq: (data: any) =>
    request<{ success: boolean; id: number }>('/faqs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateFaq: (id: number, data: any) =>
    request<{ success: boolean; message: string }>(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteFaq: (id: number) =>
    request<{ success: boolean; message: string }>(`/faqs/${id}`, {
      method: 'DELETE',
    }),

  createTestimonial: (data: any) =>
    request<{ success: boolean; id: number }>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateTestimonial: (id: number, data: any) =>
    request<{ success: boolean; message: string }>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteTestimonial: (id: number) =>
    request<{ success: boolean; message: string }>(`/testimonials/${id}`, {
      method: 'DELETE',
    }),

  createGalleryItem: (data: Partial<GalleryItem>) =>
    request<{ success: boolean; item: GalleryItem }>('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateGalleryItem: (id: number, data: Partial<GalleryItem>) =>
    request<{ success: boolean; message: string; item: GalleryItem }>(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteGalleryItem: (id: number) =>
    request<{ success: boolean; message: string }>(`/gallery/${id}`, {
      method: 'DELETE',
    }),

  updateCompanySettings: (settings: Record<string, string>) =>
    request<{ success: boolean; message: string }>('/company', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),

  uploadImage: async (file: File): Promise<{ success: boolean; url: string }> => {
    const token = getAdminToken();
    const formData = new FormData();
    formData.append('image', file);

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Image upload failed');
    return data;
  },
};
