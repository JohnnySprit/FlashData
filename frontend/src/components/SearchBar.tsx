import { KeyboardEvent } from 'react';

interface SearchBarProps {
  nickname: string;
  onNicknameChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export function SearchBar({ nickname, onNicknameChange, onSearch, loading }: SearchBarProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex gap-2">
        <input
          value={nickname}
          onChange={(e) => onNicknameChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter player nickname..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={onSearch}
          disabled={loading || !nickname.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </div>
  );
}

