import Image from 'next/image';
import Link from 'next/link'; 
import { useFilter } from '@/context/FilterContext';

const CategoryMenu = () => {
  const { categories, selectedCategory } = useFilter();

  return (
    <nav className="bg-blue-900 p-4 shadow-lg flex items-center justify-between">
      <div className="flex row justify-between container mx-auto p-4">
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

        <ul className="flex justify-end space-x-4">
          {categories.map((category) => (
            <li key={category}>
              <Link href={`/categories/${category}`}>
                <span className={`block text-white p-2 ${
                  selectedCategory === category ? 'underline' : ''
                } hover:underline transition`}>
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
