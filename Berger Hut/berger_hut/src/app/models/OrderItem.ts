// order.model.ts
export interface MenuItemCategory {
  id: number;
  name: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  category?: MenuItemCategory;
}

export interface OrderItem {
  id?: number;
  quantity: number;
  menuItem: MenuItem;
}

export interface SimpleUser {
  id: number;
  username: string;
}

export interface Order {
  id?: number;
  createdAt: string;
  status: string;
  user: SimpleUser;
  items: OrderItem[];
}


// order-request.dto.ts
export interface OrderItemRequest {
  quantity: number;
  menuItem: {
    id: number;
  };
}

export interface OrderRequest {
  createdAt: string;
  status: string;
  user: {
    id: number;
    username: string;
  };
  items: OrderItemRequest[];
}
