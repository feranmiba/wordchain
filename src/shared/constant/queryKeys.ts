export const QueryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  user: {
    profile: ['user', 'profile'] as const,
    monetization: ['user', 'monetization'] as const,
  },
  game: {
    active: ['game', 'active'] as const,
    history: (page?: number) => ['game', 'history', page] as const,
    categories: ['game', 'categories'] as const,
    category: (name: string) => ['game', 'category', name] as const,
    word: (word: string) => ['game', 'word', word] as const,
  },
  leaderboard: {
    full: (page?: number) => ['leaderboard', page] as const,
    top: ['leaderboard', 'top'] as const,
    me: ['leaderboard', 'me'] as const,
    nearby: ['leaderboard', 'nearby'] as const,
    tiers: ['leaderboard', 'tiers'] as const,
  },
  dashboard: {
    stats: ['dashboard', 'stats'] as const,
  },
  missions: {
    daily: ['missions', 'daily'] as const,
  },
  stats: {
    personal: ['stats', 'personal'] as const,
  },
} as const;