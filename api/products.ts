import { ReactNode } from "react";
export interface Product {
    description: ReactNode;
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
  
export interface ProductDetail {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const fetchProductById = async (id: string | string[] | undefined): Promise<ProductDetail | null> => {
  if (!id) return null;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error('Product not found');
    }
    const product: ProductDetail = await res.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};
