import { useFilter } from '@/context/FilterContext';

const PriceFilter = () => {
  const { priceRange, setPriceRange } = useFilter();

  return (
    <div className="flex items-center w-[300px]">
      <span className="mr-2 w-[120px]">Preço: {priceRange[0]} - {priceRange[1]}</span>
      <input
        type="range"
        min="0"
        max="1000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        className="ml-4 w-[100px]"
      />
    </div>
  );
};

export default PriceFilter;
