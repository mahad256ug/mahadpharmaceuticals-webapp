export interface drugType {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  view_price: boolean;
  featured: boolean;
  thumbnail: string | null; // nullable in case no image is uploaded
  status: "draft" | "public";
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface PaginatedResponseType<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
