import { supabase } from '@/lib/supabase/client';
import { CreateDesignInput } from '@/types/design';

export async function createDesign(input: CreateDesignInput, encodedCode: string, creatorId?: string) {
  try {
    // Generate slug from title
    const slug = input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();

    // Encode payload (store design metadata as JSON string)
    const payload = {
      thumbnail: input.thumbnail,
      category: input.category,
      tags: input.tags || [],
      author: input.author,
      price: input.price || 0,
      featured: input.featured || false,
      encoded_code: encodedCode, // Store the Figma code here
    };

    const { data, error } = await supabase
      .from('designs')
      .insert({
        slug,
        title: input.title,
        description: input.description || null,
        encoded_payload: JSON.stringify(payload),
        payload_version: 1,
        creator_id: creatorId || null, // Use null for testing without auth
        is_public: true,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating design:', error);
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to create design:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

