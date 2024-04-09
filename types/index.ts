export interface Item {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    }
  }

export interface Product {
    id: number;
    title: string;
    price: string;
    description: string;
    images: string[];
    createdAt: string;
    updatedAt?: string;
    category: {
        id: number;
        name: string;
        image: string;
        createdAt: string;
        updatedAt: string;
    };
}