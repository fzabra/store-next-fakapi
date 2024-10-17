// lib/products.ts
export interface Product {
    category: string;
    id: number;
    title: string;
    price: number;
    image: string;
  }
  
  export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('https://fakestoreapi.com/products');
  
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
  
    const products: Product[] = await res.json();
    return products;
  };
  