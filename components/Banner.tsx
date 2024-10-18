import Image from 'next/image';
import SaleBanner from '@/components/SaleBanner';

const Banner = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <Image
        src="/images/banner.jpg"
        alt="E-commerce Banner"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />

    <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <SaleBanner />
      </div>
    </div>
  );
};

export default Banner;
