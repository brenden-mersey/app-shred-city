import type { User } from "@supabase/supabase-js";

/**
 * Extract the first name from a user object
 * Works with any OAuth provider (Google, Apple, GitHub, etc.)
 * 
 * Priority order:
 * 1. user_metadata.full_name (Google, Apple)
 * 2. user_metadata.name (various providers)
 * 3. email username (fallback)
 * 
 * @param user - Supabase user object
 * @returns First name string or null if not available
 */
export function getUserFirstName(user: User | null): string | null {
  if (!user) return null;

  // Try full_name first (most common with Google/Apple OAuth)
  const fullName = user.user_metadata?.full_name;
  if (fullName) {
    // Extract first name from full name
    return fullName.split(" ")[0];
  }

  // Try name field (various providers)
  const name = user.user_metadata?.name;
  if (name) {
    return name.split(" ")[0];
  }

  // Fallback to email username
  if (user.email) {
    return user.email.split("@")[0].split(".")[0];
  }

  return null;
}

/**
 * Get a display name for a user (first name or email username)
 * 
 * @param user - Supabase user object
 * @param fallback - Fallback text if no name is available (default: "User")
 * @returns Display name string
 */
export function getUserDisplayName(
  user: User | null,
  fallback: string = "User"
): string {
  const firstName = getUserFirstName(user);
  return firstName || fallback;
}

/**
 * Get the full name from user metadata
 * 
 * @param user - Supabase user object
 * @returns Full name string or null if not available
 */
export function getUserFullName(user: User | null): string | null {
  if (!user) return null;

  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    null
  );
}

/**
 * Get the avatar URL from user metadata
 * 
 * @param user - Supabase user object
 * @returns Avatar URL string or null if not available
 */
export function getUserAvatarUrl(user: User | null): string | null {
  if (!user) return null;

  return (
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    null
  );
}

