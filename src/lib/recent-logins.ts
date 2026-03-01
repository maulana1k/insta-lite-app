const RECENT_LOGINS_KEY = "recentLogins";

export interface RecentLogin {
  username: string;
  display_name: string;
  avatar_url: string;
  email: string;
}

export function getRecentLogins(): RecentLogin[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_LOGINS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveRecentLogin(login: RecentLogin): void {
  const existing = getRecentLogins().filter((l) => l.username !== login.username);
  localStorage.setItem(
    RECENT_LOGINS_KEY,
    JSON.stringify([login, ...existing].slice(0, 3)),
  );
}

export function removeRecentLogin(username: string): void {
  const updated = getRecentLogins().filter((l) => l.username !== username);
  localStorage.setItem(RECENT_LOGINS_KEY, JSON.stringify(updated));
}
