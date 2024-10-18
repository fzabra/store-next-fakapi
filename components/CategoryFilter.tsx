import { useFilter } from '@/context/FilterContext';

interface CategoryFilterProps {
  categories: string[];
}

const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const { selectedCategory, setSelectedCategory } = useFilter();

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="p-2 border border-gray-300 rounded-md"
    >
      <option value="">Todas as Categorias</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
