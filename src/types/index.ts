export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  suitableBusinesses: string[];
  previewImage: string;
  relevantFeatures: {
    title: string;
    description: string;
  }[];
}

export interface Template {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  style: string;
  description: string;
  previewImage: string;
  recommendedFor: string[];
  features: string[];
  demoBusinessName: string;
  tagline: string;
}

export interface RequestFormData {
  name: string;
  businessName: string;
  categorySlug: string;
  phoneWhatsapp: string;
  email: string;
  currentWebsite?: string;
  instagramSocial?: string;
  templateSlug?: string;
  serviceNeeds: string[];
  additionalDetails?: string;
}
