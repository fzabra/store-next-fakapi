import { GetStaticProps } from 'next';
import { fetchProducts, Product } from './api/products';
import Image from 'next/image'
interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Produtos</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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

