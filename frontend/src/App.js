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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') search();
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>FACEIT Stats Tracker</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter player nickname..."
          style={{
            padding: '10px',
            width: '70%',
            fontSize: '16px'
          }}
          disabled={loading}
        />
        <button
          onClick={search}
          disabled={loading || !nickname.trim()}
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px'
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          width: '510px',
          height: 'auto',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {player && (
        <div style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          width: '510px',
          height: 'auto',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {player.avatar && (
              <img
                src={player.avatar}
                alt={player.nickname}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%'
                }}
              />
            )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <h2 style={{ margin: '0 0 10px 0' }}>{player.nickname}</h2>
              <p style={{ margin: '5px 0' }}>
                <strong>Level:</strong> {player.games?.cs2?.skill_level || 'N/A'}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>ELO:</strong> {player.games?.cs2?.faceit_elo || 'N/A'}
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Country:</strong> {player.country.toUpperCase() || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;