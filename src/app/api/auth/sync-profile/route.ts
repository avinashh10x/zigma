import { NextRequest, NextResponse } from 'next/server';
import { createProfileIfMissing } from '@/lib/auth';
import { supabaseServer } from '@/lib/db/server';

/**
 * API Route: Sync user profile after signup
 * Call this endpoint after a user signs up to ensure their profile exists
 */
export async function POST(request: NextRequest) {
  try {
    // Get the current authenticated user
    const { data: { user }, error: authError } = await supabaseServer.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create profile if missing
    await createProfileIfMissing(user.id, user.email!);

    return NextResponse.json({ 
      success: true,
      message: 'Profile synced successfully' 
    });
  } catch (error) {
    console.error('Profile sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync profile' },
      { status: 500 }
    );
  }
}
