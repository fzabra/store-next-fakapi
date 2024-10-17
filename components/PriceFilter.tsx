import { Dispatch, SetStateAction } from 'react';

interface PriceFilterProps {
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
}

const PriceFilter = ({ priceRange, setPriceRange }: PriceFilterProps) => {
  return (
    <div className="flex items-center">
      <span className="mr-2">Preço: {priceRange[0]} - {priceRange[1]}</span>
      <input
        type="range"
        min="0"
        max="1000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        className="ml-4"
      />
    </div>
  );
};

export default PriceFilter;
