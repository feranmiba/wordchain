export interface SignupRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  matric_no: string;
  referral_code?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  first_name: string;
  refresh_token?: string;
}

export interface User {
  id?: string;
  email?: string;
  first_name: string;
  last_name?: string;
  matric_no?: string;
  level?: string;
  rank?: string;
}

export interface ApiError {
  message: string;
  status: number;
}


export interface DashboardResponse {
  level: number;
  current_xp: number;
  xp_to_next_level: number;
  total_xp: number;
  current_win_streak: number;
  best_win_streak: number;
  words_mastered: number;
  global_rank: number;
  rank_percentile: string;
  total_players: number
}

export interface PersonalData {
    user_id: string,
    total_games: number,
    games_won: number,
    games_lost: number,
    win_rate: number,
    total_moves: number,
    average_moves_per_game: number,
    total_hints_used: number,
    total_xp: number,
    current_streak: number,
    best_streak: number,
    error_breakdown: {
        not_in_dictionary: number,
        not_one_letter: number,
        same_word: number,
        wrong_length: number,
        already_used: number
    },
    sam_scores: {
        evaluation_score: number,
        design_score: number,
        develop_score: number
    },
    time_metrics: {
        average_thinking_time_ms: number,
        total_session_time_seconds: number
    },
    recent_games: [
        {
            session_id: string,
            date: string,
            start_word: string,
            target_word: string,
            moves: number,
            is_won: boolean,
            score: number
        },
        {
            session_id: string,
            date: string,
            start_word: string,
            target_word: string,
            moves: number,
            is_won: boolean,
            score: number
        },
        {
            session_id: string,
            date: string,
            start_word: string,
            target_word: string,
            moves: number,
            is_won: boolean,
            score: number
        }
    ]
}

export interface MyPosition {
  rank: number,
  total_players: number,
  display_name: string,
  total_xp: number,
  tier: string,
  tier_badge: string,
  games_won: number,
  total_games: number,
  win_rate: number,
  xp_to_next_tier: number,
  next_tier: string,
  percentile: number
}

export interface UserFullData {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  matric_no: string | null;
  role: string;
  current_xp: number;
  total_xp_converted: number;
  wallet_balance_kobo: number;
  total_withdrawn_kobo: number;
  referral_code: string;
  referrals_count: number;
  referral_xp_earned: number;
  avatar_url: string | null;
  preferred_difficulty: string;
  created_at: string;
  games_played: number;
  games_won: number;
  total_moves: number;
  average_moves_per_game: number;
  win_rate: number;
  display_name: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  max_progress: number;
  reward: {
    type: string;
    amount: number;
  };
  completed: boolean;
}

export interface DailyMissionsResponse {
  missions: Mission[];
  completed_count: number;
  total_count: number;
  reset_time: string;
}