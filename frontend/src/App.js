import { useState } from 'react';
import axios from 'axios';

function App() {
  const [nickname, setNickname] = useState('');
  const [player, setPlayer] = useState(null);

  const search = async () => {
    const { data } = await axios.get(`http://localhost:3001/api/player/${nickname}`);
    setPlayer(data);
  };

  return (
    <div>
      <h1>FACEIT Stats</h1>
      <input value={nickname} onChange={e => setNickname(e.target.value)} />
      <button onClick={search}>Search</button>
      {player && (
        <div>
          <h2>{player.nickname}</h2>
          <p>Current Rating: {player.games?.cs2?.faceit_elo}</p>
        </div>
      )}
    </div>
  );
}

export default App;