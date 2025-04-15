import { User } from "./auth/user";

export interface CartItem {
    id?: number;
    quantity: number;
    menuItem: MenuItem;
  }
  
  export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    available: boolean;
    category?: Category;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  

  
  export interface Cart {
    id?: number;
    user: User;
    items: CartItem[];
  }
  