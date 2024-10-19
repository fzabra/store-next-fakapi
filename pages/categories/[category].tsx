import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import CategoryMenu from '@/components/CategoryMenu';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import PriceFilter from '@/components/PriceFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { fetchCategories, fetchProductsByCategory } from '@/api/products';
import { useFilter } from '@/context/FilterContext'; 
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CategoryPageProps {
  category: string;
  products: Product[];
}

const CategoryPage = ({ category, products }: CategoryPageProps) => {
  const router = useRouter();
  const { searchTerm, priceRange} = useFilter();

  const filteredProducts = Array.isArray(products) ? products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesPrice;
  }) : [];

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  if (!products || products.length === 0) {
    return <div className="container mx-auto p-4">Nenhum produto encontrado nesta categoria.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CategoryMenu />
      <Banner />
      <div className="container mx-auto p-4">

        <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-4xl font-bold mb-6 text-center capitalize">{category}</h1>
          <PriceFilter />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
              <Image
                className="h-40 w-full object-cover mb-4"
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
              />
              <h2 className="text-lg font-semibold">
                {product.title.length > 18
                  ? `${product.title.substring(0, 18)}...`
                  : product.title}
              </h2>
              <p className="text-gray-700 mt-2">${product.price}</p>
              <Link href={`/product/${product.id}`}>
                <span className="inline-block mt-4 text-grey  hover:text-blue-500 transition">
                  Ver detalhes
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};


export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories = await fetchCategories();
    const paths = categories.map((category: string) => ({
      params: { category },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Error fetching categories in getStaticPaths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params?.category as string;
  try {
    const products = await fetchProductsByCategory(category) || [];
    return {
      props: {
        category,
        products,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(`Error fetching products for category ${category} in getStaticProps:`, error);
    return {
      props: {
        category,
        products: [],
      },
      revalidate: 60,
    };
  }
};

export default CategoryPage;
