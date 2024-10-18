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
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const products: Product[] = await res.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
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
    console.error('Error fetching product by id:', error);
    return null;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    const categories: string[] = await res.json();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    if (!res.ok) {
      throw new Error('Failed to fetch products by category');
    }
    const products: Product[] = await res.json();
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
};
