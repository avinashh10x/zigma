# Auth Utilities

## Profile Sync

When a user signs up, you **must** create a profile row in the database.

### Usage

#### Option 1: After Signup (Recommended)

Call the API endpoint after successful signup:

```typescript
// In your signup handler
const response = await fetch('/api/auth/sync-profile', {
  method: 'POST',
});
```

#### Option 2: On First Dashboard Load

Check and create profile on first dashboard access:

```typescript
import { createProfileIfMissing, requireAuth } from '@/lib/auth';

// In your dashboard page or layout
const user = await requireAuth();
if (user) {
  await createProfileIfMissing(user.id, user.email!);
}
```

#### Option 3: Server Action

```typescript
'use server'
import { createProfileIfMissing } from '@/lib/auth';

export async function syncProfile(userId: string, email: string) {
  await createProfileIfMissing(userId, email);
}
```

## Functions

### `createProfileIfMissing(userId, email)`

Creates a profile row for a user if it doesn't exist. Uses `upsert` so it's safe to call multiple times.

- **userId**: User's UUID from Supabase auth
- **email**: User's email address (username will be extracted from email)

### `requireAuth()`

Checks if user is authenticated and returns the user object or null.

## When to Call

✅ **After signup** - Most reliable
✅ **On first dashboard load** - Fallback safety net
❌ **On every page load** - Unnecessary (upsert is safe but wasteful)
