import { supabase } from '@/lib/supabase/client';
import { DBDesign, Design } from '@/types/design';

export async function getDesign(slug: string): Promise<Design | null> {
  try {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .eq('slug', slug)
      .eq('is_public', true)
      .single();

    if (error || !data) {
      console.error('Error fetching design:', error);
      return null;
    }

    // Transform DB design to frontend format
    const dbDesign = data as DBDesign;
    const payload = JSON.parse(dbDesign.encoded_payload);

    return {
      id: dbDesign.id,
      slug: dbDesign.slug,
      title: dbDesign.title,
      description: dbDesign.description || undefined,
      author: payload.author,
      thumbnail: payload.thumbnail,
      category: payload.category,
      tags: payload.tags,
      price: payload.price,
      featured: payload.featured,
      created_at: dbDesign.created_at,
    };
  } catch (error) {
    console.error('Failed to get design:', error);
    return null;
  }
}

export async function getDesigns() {
  // Implementation for fetching all designs
  return [];
}

