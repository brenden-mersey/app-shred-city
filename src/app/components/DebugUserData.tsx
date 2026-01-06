"use client";

import { useAuth } from "@/app/contexts/AuthContext";

/**
 * Debug component to see the full user object structure
 * Remove this in production!
 */
export default function DebugUserData() {
  const { user } = useAuth();

  if (!user) {
    return <div>Not logged in</div>;
  }

  // Extract first name examples
  const firstNameFromFullName =
    user.user_metadata?.full_name?.split(" ")[0] || null;
  const firstNameFromName = user.user_metadata?.name?.split(" ")[0] || null;
  const firstNameFromEmail = user.email?.split("@")[0].split(".")[0] || null;

  return (
    <div style={{ padding: "2rem", background: "#f5f5f5", margin: "2rem" }}>
      <h2>User Object Structure</h2>
      <pre style={{ background: "#fff", padding: "1rem", overflow: "auto" }}>
        {JSON.stringify(user, null, 2)}
      </pre>

      <h3>First Name Extraction Examples:</h3>
      <ul>
        <li>
          From <code>user_metadata.full_name</code>:{" "}
          <strong>{firstNameFromFullName || "Not available"}</strong>
        </li>
        <li>
          From <code>user_metadata.name</code>:{" "}
          <strong>{firstNameFromName || "Not available"}</strong>
        </li>
        <li>
          From <code>email</code> (fallback):{" "}
          <strong>{firstNameFromEmail || "Not available"}</strong>
        </li>
      </ul>

      <h3>Quick Access:</h3>
      <ul>
        <li>
          <code>user.id</code>: {user.id}
        </li>
        <li>
          <code>user.email</code>: {user.email}
        </li>
        <li>
          <code>user.user_metadata.full_name</code>:{" "}
          {user.user_metadata?.full_name || "Not available"}
        </li>
        <li>
          <code>user.user_metadata.avatar_url</code>:{" "}
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Avatar"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          ) : (
            "Not available"
          )}
        </li>
        <li>
          <code>user.app_metadata.provider</code>:{" "}
          {user.app_metadata?.provider || "Not available"}
        </li>
      </ul>
    </div>
  );
}

