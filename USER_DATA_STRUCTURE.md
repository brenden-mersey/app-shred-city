# Supabase User Object Structure

The `user` object from Supabase Auth has the following structure:

## Basic User Object

```typescript
{
  id: string;                    // Unique user ID (UUID)
  email?: string;                // User's email address
  phone?: string;                // User's phone number (if provided)
  created_at: string;            // ISO timestamp of account creation
  confirmed_at?: string;          // ISO timestamp when email was confirmed
  last_sign_in_at?: string;      // ISO timestamp of last sign-in
  app_metadata: {                // Metadata managed by Supabase (not editable by user)
    provider: string;             // e.g., "google", "email", etc.
    providers: string[];          // Array of all providers used
  };
  user_metadata: {               // Custom metadata (can include OAuth provider data)
    // For Google OAuth, typically includes:
    full_name?: string;           // Full name from Google
    avatar_url?: string;          // Profile picture URL
    email?: string;               // Email (may be duplicated here)
    name?: string;                // Display name
    // ... other provider-specific fields
  };
  identities: Array<{            // Array of identity providers
    id: string;
    user_id: string;
    identity_data: {
      email?: string;
      sub: string;                // Provider's user ID
      // ... other provider data
    };
    provider: string;             // e.g., "google"
    created_at: string;
    updated_at: string;
  }>;
  aud: string;                    // Audience (usually "authenticated")
  role: string;                   // User role (usually "authenticated")
}
```

## Accessing First Name

The first name is **not directly available** in the user object. You have a few options:

### Option 1: Extract from `user_metadata.full_name` (Google OAuth)

```typescript
const { user } = useAuth();

// Get full name from Google
const fullName = user?.user_metadata?.full_name || "";
const firstName = fullName.split(" ")[0] || "";
```

### Option 2: Extract from `user_metadata.name`

```typescript
const name = user?.user_metadata?.name || "";
const firstName = name.split(" ")[0] || "";
```

### Option 3: Extract from email (fallback)

```typescript
const email = user?.email || "";
const firstName = email.split("@")[0].split(".")[0] || "";
```

### Option 4: Store in a user profile table (Recommended for production)

For a more robust solution, create a `profiles` table in Supabase and store the first name there:

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Then fetch it:
```typescript
const { data: profile } = await supabase
  .from('profiles')
  .select('first_name')
  .eq('id', user.id)
  .single();

const firstName = profile?.first_name || "";
```

## Example: Complete User Object (Google OAuth)

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "john.doe@gmail.com",
  "created_at": "2024-01-15T10:30:00Z",
  "confirmed_at": "2024-01-15T10:30:00Z",
  "last_sign_in_at": "2024-01-20T14:22:00Z",
  "app_metadata": {
    "provider": "google",
    "providers": ["google"]
  },
  "user_metadata": {
    "full_name": "John Doe",
    "avatar_url": "https://lh3.googleusercontent.com/...",
    "email": "john.doe@gmail.com",
    "name": "John Doe",
    "iss": "https://accounts.google.com",
    "sub": "123456789012345678901",
    "picture": "https://lh3.googleusercontent.com/...",
    "aud": "your-google-client-id",
    "iat": 1705752000,
    "exp": 1705755600
  },
  "identities": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "identity_data": {
        "email": "john.doe@gmail.com",
        "sub": "123456789012345678901",
        "email_verified": true
      },
      "provider": "google",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "aud": "authenticated",
  "role": "authenticated"
}
```

## Quick Access Examples

```typescript
const { user } = useAuth();

// Email
const email = user?.email;

// Full name (Google)
const fullName = user?.user_metadata?.full_name;

// First name (extracted)
const firstName = user?.user_metadata?.full_name?.split(" ")[0];

// Avatar URL
const avatarUrl = user?.user_metadata?.avatar_url;

// User ID
const userId = user?.id;
```

