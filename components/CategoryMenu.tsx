import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFilter } from '@/context/FilterContext';

const CategoryMenu = () => {
  const { categories, selectedCategory } = useFilter();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar a visibilidade do menu

  return (
    <nav className="bg-blue-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" passHref>
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={120}
              height={50}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Botão do Menu Hambúrguer */}
        <button
          className="text-white md:hidden" // Mostra apenas em telas pequenas
          onClick={() => setMenuOpen(!menuOpen)} // Alterna o estado do menu
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Menu de Categorias */}
        <ul
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full bg-blue-900 md:bg-transparent md:w-auto p-4 md:p-0 z-50`}
        >
          {categories.map((category) => (
            <li key={category}>
              <Link href={`/categories/${category}`}>
                <span
                  className={`block text-white p-2 ${
                    selectedCategory === category ? 'underline' : ''
                  } hover:underline transition`}
                >
                  {category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryMenu;
