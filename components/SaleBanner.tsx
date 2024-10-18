const SaleBanner = () => {
    return (
      <div className="bg-blue-900 text-white p-8 text-center rounded-lg shadow-lg max-w-xs w-[320px] mx-auto md:ml-[50%]">
        <h2 className="text-sm font-light uppercase mb-2">todos os produtos</h2>
        <h1 className="text-3xl font-bold mb-4">MEGA SALE</h1>
        <p className="text-lg mb-4">50% OFF</p>
        <p className="text-sm font-light">até o fim do estoque</p>
        <a
          href="#shop"
          className="bg-red-500 text-white mt-6 inline-block px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          COMPRAR AGORA
        </a>
      </div>
    );
  };
  
  export default SaleBanner;
  