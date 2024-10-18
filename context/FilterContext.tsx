import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchCategories } from '@/api/products';

interface FilterContextProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  categories: string[];
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    };

    loadCategories();
  }, []);

  return (
    <FilterContext.Provider
      value={{ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, priceRange, setPriceRange, categories }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
