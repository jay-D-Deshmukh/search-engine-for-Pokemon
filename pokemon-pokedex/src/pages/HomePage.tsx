import { usePokemonSearch } from "../hooks/usePokemonSearch";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSkeleton from "../components/LoadingSkeleton";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const { pokemon, isLoading, error, searchPokemon } = usePokemonSearch();

  return (
    <main className="app-shell">
      <section className="hero-section">
        <p className="hero-tag">Pokemon Search Engine</p>
        <h1>Pokemon Pokedex</h1>
        <p className="hero-description">
          Search any Pokemon and explore its profile, types, abilities, and
          battle stats.
        </p>
      </section>

      <SearchBar onSearch={searchPokemon} isLoading={isLoading} />

      <section className="results-section">
        {isLoading && <LoadingSkeleton />}
        {!isLoading && error && <ErrorMessage message={error} />}
        {!isLoading && pokemon && <PokemonCard pokemon={pokemon} />}
        {!isLoading && !pokemon && !error && (
          <p className="empty-state">
            Start by searching for a Pokemon like <strong>charizard</strong> or{" "}
            <strong>lucario</strong>.
          </p>
        )}
      </section>
    </main>
  );
};

export default HomePage;
