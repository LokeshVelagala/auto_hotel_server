import React, { useState } from 'react';
import { UserRole, Table, Order, CartItem, OrderItem, User } from './types';
import { foodItems, initialTables, users } from './data/mockData';
import LoginPage from './components/LoginPage';
import UserInterface from './components/UserInterface';
import AdminInterface from './components/AdminInterface';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [orderCounter, setOrderCounter] = useState(1);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleBack = () => {
    // For now, back just logs out
    setCurrentUser(null);
  };

  const handleUpdateOrder = (tableId: string, newStatus: Order['status']) => {
    setTables(prevTables =>
      prevTables.map(table => {
        if (table.id === tableId && table.currentOrder) {
          const updatedTable = {
            ...table,
            currentOrder: {
              ...table.currentOrder,
              status: newStatus
            }
          };
          
          // If order is served, clear the table
          if (newStatus === 'served') {
            return {
              ...updatedTable,
              status: 'available' as const,
              currentOrder: undefined
            };
          }
          
          return updatedTable;
        }
        return table;
      })
    );
  };

  const handlePlaceOrder = (cartItems: CartItem[], tableNumber: number) => {
    const newOrderId = `o${orderCounter}`;
    setOrderCounter(prev => prev + 1);
    
    const orderItems: OrderItem[] = cartItems.map(item => ({
      foodId: item.foodId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      notes: item.notes
    }));
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: newOrderId,
      tableId: `t${tableNumber}`,
      items: orderItems,
      status: 'pending',
      timestamp: new Date(),
      total
    };
    
    setTables(prevTables =>
      prevTables.map(table => {
        if (table.number === tableNumber) {
          return {
            ...table,
            status: 'occupied' as const,
            currentOrder: newOrder
          };
        }
        return table;
      })
    );
  };

  // Show login page if no user is logged in
  if (!currentUser) {
    return <LoginPage users={users} onLogin={handleLogin} />;
  }

  // Show user interface for regular users
  if (currentUser.role === 'user') {
    return (
      <UserInterface
        foodItems={foodItems}
        user={currentUser}
        onBack={handleBack}
        onPlaceOrder={handlePlaceOrder}
        onLogout={handleLogout}
      />
    );
  }

  // Show admin interface for admin users
  if (currentUser.role === 'admin') {
    return (
      <AdminInterface
        tables={tables}
        user={currentUser}
        onBack={handleBack}
        onUpdateOrder={handleUpdateOrder}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

export default App;