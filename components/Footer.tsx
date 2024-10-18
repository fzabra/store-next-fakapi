import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <span className="mr-4">Pague com:</span>
          <div className="flex space-x-4">
            <Image
              src="/images/visa.svg"
              alt="Visa"
              width={50}
              height={30}
              className="object-contain"
            />
            <Image
              src="/images/mastercard.svg"
              alt="MasterCard"
              width={50}
              height={30}
              className="object-contain"
            />
            <Image
              src="/images/amex.svg"
              alt="American Express"
              width={50}
              height={30}
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex space-x-8 mb-4 md:mb-0">
          <Link href="/quem-somos">
            <span className="hover:underline">Quem Somos</span>
          </Link>
          <Link href="/contato">
            <span className="hover:underline">Contato</span>
          </Link>
        </div>
        <div className="text-center">
          <p>Desenvolvido com ♥ por Fabricio Sobral</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
