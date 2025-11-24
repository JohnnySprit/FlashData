import { useState } from 'react';
import axios from 'axios';
import { Player } from './types/player';
import { SearchBar } from './components/SearchBar';
import { PlayerCard } from './components/PlayerCard';
import { ErrorDisplay } from './components/ErrorDisplay';

function App() {
  const [nickname, setNickname] = useState<string>('');
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      setError(axiosError.response?.data?.error || 'Player not found');
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

        <SearchBar
          nickname={nickname}
          onNicknameChange={setNickname}
          onSearch={search}
          loading={loading}
        />

        {error && <ErrorDisplay error={error} />}

        {player && <PlayerCard player={player} />}
      </div>
    </div>
  );
}

export default App;