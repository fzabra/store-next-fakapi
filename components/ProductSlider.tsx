import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { fetchProducts, Product } from '@/api/products'; // Reutilizando a mesma função de fetch

const ProductSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar os produtos', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="product-slider flex justify-center mt-10">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        navigation
        loop={true}
        modules={[Navigation]}
        className="w-full max-w-5xl"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <Image
                src={product.image}
                alt={product.title}
                width={300} // Ajustando para tamanhos consistentes
                height={300}
                className="object-cover h-52"
              />
              <h3 className="text-lg font-semibold mt-4">
                {product.title.length > 18
                  ? `${product.title.substring(0, 18)}...`
                  : product.title}
              </h3>
              <p className="text-gray-700 mt-2">${product.price}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
