import { useFilter } from '@/context/FilterContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useFilter();

  return (
    <input
      type="text"
      placeholder="Buscar produtos"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 border border-gray-500 rounded-md"
    />
  );
};

export default SearchBar;

