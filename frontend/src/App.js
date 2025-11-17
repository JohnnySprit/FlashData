import { useState } from 'react';
import axios from 'axios';

function App() {
  const [nickname, setNickname] = useState('');
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async () => {
    if (!nickname.trim()) return;

    setLoading(true);
    setError(null);
    setPlayer(null);

    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/player/${nickname}`
      );
      setPlayer(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Player not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          FACEIT Stats Tracker
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex gap-2">
            <input
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && search()}
              placeholder="Enter player nickname..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={search}
              disabled={loading || !nickname.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {player && (
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
                        {player.country.toUpperCase() || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;