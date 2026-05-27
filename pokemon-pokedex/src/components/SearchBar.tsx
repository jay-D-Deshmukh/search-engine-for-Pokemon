import { useState } from "react";
import type { FormEvent } from "react";

interface SearchBarProps {
  onSearch: (name: string) => Promise<void> | void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Pokemon (e.g. pikachu)"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="search-input"
        disabled={isLoading}
      />
      <button type="submit" className="search-button" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
