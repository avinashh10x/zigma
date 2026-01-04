import { supabaseServer } from '@/lib/db/server';

/**
 * Sync Auth → Profile
 * Creates a profile row for a user if it doesn't exist.
 * Call this after signup or on first dashboard load.
 * 
 * @param userId - The user's UUID from Supabase auth
 * @param email - The user's email address
 */
export async function createProfileIfMissing(userId: string, email: string) {
  const username = email.split('@')[0];
  
  const { error } = await supabaseServer
    .from('profiles')
    .upsert({ 
      id: userId, 
      username,
      role: 'creator'
    }, {
      onConflict: 'id'
    });

  if (error) {
    console.error('Failed to create profile:', error);
    throw error;
  }
}

/**
 * Check if user is authenticated
 * Returns the user object if authenticated, null otherwise
 */
export async function requireAuth() {
  const { data: { user }, error } = await supabaseServer.auth.getUser();
  
  if (error || !user) {
    return null;
  }
  
  return user;
}
