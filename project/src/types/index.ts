export interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  available: boolean;
  description: string;
  prepTime: number; // in minutes
  imageUrl?: string;
  reviews?: Review[];
}

export interface Review {
  userName: string;
  rating: number; // 1-5
  comment?: string;
  timestamp: Date;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served';
  timestamp: Date;
  total: number;
}

export interface OrderItem {
  foodId: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentOrder?: Order;
}

export type UserRole = 'admin' | 'user' | null;

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  tableNumber?: number;
}

export interface CartItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}