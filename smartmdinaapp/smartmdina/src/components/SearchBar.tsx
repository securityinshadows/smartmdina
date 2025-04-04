import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={value}
        onChange={onChange}
      />
      <button className="icon-button">
        <img src="./search-icon.png" alt="Search" />
      </button>
    </div>
  );
};

export default SearchBar;