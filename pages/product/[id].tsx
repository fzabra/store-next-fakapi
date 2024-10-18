import { GetServerSideProps } from 'next';
import { Product, fetchProductById } from '@/api/products';
import ProductSlider from '@/components/ProductSlider'
import CategoryMenu from '@/components/CategoryMenu';
import Footer from '@/components/Footer'
import Image from 'next/image';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="flex flex-col min-h-screen">
    <CategoryMenu />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0">
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              Preço: ${product.price}
            </p>
            <p className="text-md font-semibold text-gray-600">
              Categoria: {product.category}
            </p>
          </div>
        </div>
      </div>
      <ProductSlider />
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  const product = await fetchProductById(id);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductDetails;