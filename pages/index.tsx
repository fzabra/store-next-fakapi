import { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { fetchProducts, Product } from '@/api/products';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import PriceFilter from '@/components/PriceFilter';

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Produtos</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <li key={product.id} className="bg-white rounded-lg shadow-lg p-4">
            <Image
              className="h-40 w-full object-cover mb-4"
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-lg font-bold text-gray-700">Preço: ${product.price}</p>
            
            <Link href={`/product/${product.id}`} passHref>
              <span className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Ver detalhes
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const products = await fetchProducts();
    return {
      props: {
        products,
      },
      revalidate: 60,
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
};

export default Home;


