export interface Player {
    player_id: string;
    nickname: string;
    avatar?: string;
    country?: string;
    games?: {
        cs2?: {
            skill_level?: number;
            faceit_elo?: number;
        };
    };
}

