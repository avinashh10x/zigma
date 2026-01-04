// Database Design type (matches Supabase schema)
export interface DBDesign {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  encoded_payload: string;
  payload_version: number;
  creator_id: string;
  is_public: boolean;
  copy_count: number;
  created_at: string;
}

// Frontend Design type (for display)
export interface Design {
  id: string;
  slug: string;
  title: string;
  author: string;
  price?: number;
  thumbnail: string;
  category: string;
  featured?: boolean;
  description?: string;
  tags?: string[];
  created_at?: string;
  encoded_code?: string; // Figma embed code
}

// Form input for creating designs
export interface CreateDesignInput {
  title: string;
  description?: string;
  thumbnail: string;
  category: string;
  tags?: string[];
  author: string;
  price?: number;
  featured?: boolean;
}

export type GridSize = 'small' | 'medium' | 'large';

export interface DesignCardProps {
  design: Design;
  size?: GridSize;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  tags?: string[];
  searchQuery?: string;
}
