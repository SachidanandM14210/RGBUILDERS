export interface Project {
  id: number;
  slug: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Villas' | 'Renovation' | 'Architectural Design' | 'Turnkey Construction' | string;
  location: string;
  client?: string;
  completionYear?: string;
  area: string;
  status: string;
  summary: string;
  description: string;
  designConcept?: string;
  scope?: string;
  materials?: string;
  coverImage: string;
  galleryImages?: string; // JSON string
  featured?: number;
  createdAt?: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  features?: string; // JSON string
  processSteps?: string; // JSON string
  createdAt?: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
}

export interface Testimonial {
  id: number;
  clientName: string;
  projectType: string;
  feedback: string;
  rating: number;
  location?: string;
  isVerified: number;
  displayOrder: number;
  createdAt?: string;
}

export interface Enquiry {
  id: number;
  refCode: string;
  fullName: string;
  phone: string;
  email: string;
  projectLocation: string;
  projectType: string;
  plotArea?: string;
  budget?: string;
  expectedStartDate?: string;
  projectDescription: string;
  preferredContactMethod: string;
  status: 'New' | 'Contacted' | 'Consultation Scheduled' | 'Quotation Sent' | 'In Progress' | 'Completed' | 'Closed';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanySettings {
  companyName: string;
  tagline: string;
  secondaryTagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  businessHours: string;
  socialInstagram?: string;
  socialLinkedIn?: string;
  socialFacebook?: string;
  rateStandardSqFt?: string;
  ratePremiumSqFt?: string;
  rateLuxurySqFt?: string;
}

export interface AdminUser {
  id: number;
  username: string;
  name: string;
  role: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: 'Office' | 'Clients' | 'Projects' | string;
  description?: string;
  imageUrl: string;
  displayOrder?: number;
  featured?: number;
  createdAt?: string;
}
