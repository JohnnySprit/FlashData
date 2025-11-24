import { Player } from '../types/player';

interface PlayerCardProps {
    player: Player;
}

export function PlayerCard({ player }: PlayerCardProps) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
                <div className="flex items-center gap-4">
                    {player.avatar && (
                        <img
                            src={player.avatar}
                            alt={player.nickname}
                            className="w-20 h-20 rounded-full"
                        />
                    )}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {player.nickname}
                        </h2>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <span className="text-gray-600">Level:</span>
                                <span className="ml-2 font-semibold">
                                    {player.games?.cs2?.skill_level || 'N/A'}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600">ELO:</span>
                                <span className="ml-2 font-semibold">
                                    {player.games?.cs2?.faceit_elo || 'N/A'}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-600">Country:</span>
                                <span className="ml-2 font-semibold">
                                    {player.country ? player.country.toUpperCase() : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

