import { GetStaticProps } from 'next';
import Link from 'next/link';
import { fetchProducts, Product } from '@/api/products';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import CategoryMenu from '@/components/CategoryMenu';
import PriceFilter from '@/components/PriceFilter';
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import { useFilter } from '@/context/FilterContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps) => {
  const { searchTerm, selectedCategory, priceRange } = useFilter();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <div className="flex flex-col min-h-screen">
      <CategoryMenu />
      <Banner />

      <div className="container mx-auto p-4">  
        <div className="mb-6 flex justify-between items-center">
          <SearchBar />
          <div className="mb-6 flex justify-between gap-5">
            <CategoryFilter categories={categories} />
            <PriceFilter />
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <li key={product.id} className="bg-white rounded-lg border-gray-200 border p-4">
              <Image
                className="h-40 w-full object-cover mb-4"
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
              />
              <h2 className="text-xl font-semibold">{product.title.length > 18
                  ? `${product.title.substring(0, 18)}...`
                  : product.title}</h2>
              <p className="text-md font-normal text-gray-700">Preço: ${product.price}</p>
              
              <Link href={`/product/${product.id}`}>
                <span className="inline-block mt-4 text-grey  hover:text-blue-500 transition">
                  Ver detalhes
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
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
  } catch (error) {
    console.error('Error fetching products in getStaticProps:', error);
    return {
      props: {
        products: [],
      },
    };
  }
};


export default Home;
