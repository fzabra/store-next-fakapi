import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import CategoryMenu from '@/components/CategoryMenu';
import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CategoryMenu />
    
    <Banner />
    <div className="container mx-auto p-4"> 
        <h1 className="text-4xl font-bold mb-6 text-center capitalize">{category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
                <Image
                    className="h-40 w-full object-cover mb-4"
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                />
                <h2 className="text-lg font-semibold">{product.title.length > 18
                  ? `${product.title.substring(0, 18)}...`
                  : product.title}</h2>
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
  const res = await fetch('https://fakestoreapi.com/products/categories');
  const categories = await res.json();

  const paths = categories.map((category: string) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params?.category as string;
  const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  const products = await res.json();

  return {
    props: {
      category,
      products,
    },
    revalidate: 60,
  };
};

export default CategoryPage;
