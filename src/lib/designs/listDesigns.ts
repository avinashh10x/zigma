import { supabase } from '@/lib/supabase/client';
import { DBDesign, Design } from '@/types/design';

// Dummy data for marketplace (fallback/demo)
const DUMMY_DESIGNS: Design[] = [
  {
    id: 'dummy-1',
    slug: 'dashboard-analytics',
    title: 'Dashboard Analytics',
    author: 'Sarah Chen',
    price: 49,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    category: 'Dashboard',
    featured: true,
    description: 'Modern analytics dashboard with charts and metrics',
    tags: ['analytics', 'charts', 'dashboard']
  },
  {
    id: 'dummy-2',
    slug: 'ecommerce-checkout',
    title: 'E-commerce Checkout',
    author: 'Mike Johnson',
    price: 39,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    category: 'E-commerce',
    description: 'Streamlined checkout flow with payment integration',
    tags: ['checkout', 'payment', 'e-commerce']
  },
  {
    id: 'dummy-3',
    slug: 'social-media-feed',
    title: 'Social Media Feed',
    author: 'Emma Davis',
    price: 29,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop',
    category: 'Social',
    description: 'Engaging social media feed with stories and posts',
    tags: ['social', 'feed', 'mobile']
  },
  {
    id: 'dummy-4',
    slug: 'task-management',
    title: 'Task Management',
    author: 'Alex Kim',
    price: 45,
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop',
    category: 'Productivity',
    featured: true,
    description: 'Kanban-style task management interface',
    tags: ['productivity', 'tasks', 'kanban']
  },
  {
    id: 'dummy-5',
    slug: 'login-signup',
    title: 'Login & Signup',
    author: 'Chris Lee',
    price: 19,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
    category: 'Authentication',
    description: 'Clean authentication screens with social login',
    tags: ['auth', 'login', 'forms']
  },
  {
    id: 'dummy-6',
    slug: 'music-player',
    title: 'Music Player',
    author: 'Jordan Taylor',
    price: 35,
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop',
    category: 'Media',
    description: 'Beautiful music player with playlist management',
    tags: ['music', 'player', 'media']
  },
  {
    id: 'dummy-7',
    slug: 'profile-settings',
    title: 'Profile Settings',
    author: 'Sam Wilson',
    price: 25,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop',
    category: 'Settings',
    description: 'Comprehensive user profile and settings page',
    tags: ['profile', 'settings', 'user']
  },
  {
    id: 'dummy-8',
    slug: 'calendar-events',
    title: 'Calendar & Events',
    author: 'Riley Brown',
    price: 42,
    thumbnail: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop',
    category: 'Productivity',
    featured: true,
    description: 'Interactive calendar with event scheduling',
    tags: ['calendar', 'events', 'scheduling']
  },
];

export async function listDesigns(): Promise<Design[]> {
  try {
    // Fetch real designs from Supabase
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching designs:', error);
      // Return only dummy data if DB fetch fails
      return DUMMY_DESIGNS;
    }

    // Transform DB designs to frontend format
    const realDesigns: Design[] = (data as DBDesign[]).map((dbDesign) => {
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
        encoded_code: payload.encoded_code, // Include encoded code
      };
    });

    // Merge: Real designs first, then dummy designs
    return [...realDesigns, ...DUMMY_DESIGNS];
  } catch (error) {
    console.error('Failed to list designs:', error);
    // Return dummy data as fallback
    return DUMMY_DESIGNS;
  }
}

