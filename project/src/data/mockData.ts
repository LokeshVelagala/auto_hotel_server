import { FoodItem, Table, Order, User } from '../types';

export const users: User[] = [
  {
    id: 'admin1',
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 'user1',
    username: 'table1',
    password: 'user123',
    role: 'user',
    tableNumber: 1
  },
  {
    id: 'user2',
    username: 'table2',
    password: 'user123',
    role: 'user',
    tableNumber: 2
  },
  {
    id: 'user3',
    username: 'table3',
    password: 'user123',
    role: 'user',
    tableNumber: 3
  },
  {
    id: 'user4',
    username: 'table4',
    password: 'user123',
    role: 'user',
    tableNumber: 4
  }
];

export const foodItems: FoodItem[] = [
  // Appetizers
  {
    id: '1',
    name: 'Samosa',
    price: 8.99,
    category: 'Appetizer',
    available: true,
    description: 'Crispy triangular pastry filled with spiced potatoes and peas',
    prepTime: 10,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Samosachutney.jpg',
    reviews: [
      { userName: 'Asha', rating: 5, comment: 'Crispy and flavorful!', timestamp: new Date() },
      { userName: 'Rahul', rating: 4, comment: 'Great snack with chutney.', timestamp: new Date() }
    ]
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    price: 14.99,
    category: 'Appetizer',
    available: true,
    description: 'Grilled cottage cheese marinated in aromatic spices',
    prepTime: 15,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Paneer_Tikka.jpg',
    reviews: [
      { userName: 'Priya', rating: 5, comment: 'Soft paneer and smoky taste!', timestamp: new Date() }
    ]
  },
  {
    id: '3',
    name: 'Chicken 65',
    price: 16.99,
    category: 'Appetizer',
    available: true,
    description: 'Spicy deep-fried chicken with curry leaves and green chilies',
    prepTime: 12,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Chicken_65.jpg',
    reviews: [
      { userName: 'Vijay', rating: 4, comment: 'Nice heat, juicy pieces.', timestamp: new Date() }
    ]
  },
  
  // Main Course
  {
    id: '4',
    name: 'Butter Chicken',
    price: 22.99,
    category: 'Main Course',
    available: true,
    description: 'Tender chicken in rich tomato and cream sauce',
    prepTime: 25,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Chicken_makhani.jpg',
    reviews: [
      { userName: 'Neha', rating: 5, comment: 'Rich and creamy!', timestamp: new Date() }
    ]
  },
  {
    id: '5',
    name: 'Biryani',
    price: 19.99,
    category: 'Main Course',
    available: true,
    description: 'Fragrant basmati rice with spiced meat and aromatic herbs',
    prepTime: 30,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Chicken_Biryani.jpg',
    reviews: [
      { userName: 'Aman', rating: 5, comment: 'Aromatic and perfectly spiced.', timestamp: new Date() }
    ]
  },
  {
    id: '6',
    name: 'Dal Makhani',
    price: 15.99,
    category: 'Main Course',
    available: true,
    description: 'Creamy black lentils slow-cooked with butter and spices',
    prepTime: 20,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Dal_Makhani.jpg',
    reviews: [
      { userName: 'Kiran', rating: 4, comment: 'Comfort food!', timestamp: new Date() }
    ]
  },
  {
    id: '7',
    name: 'Palak Paneer',
    price: 17.99,
    category: 'Main Course',
    available: true,
    description: 'Cottage cheese in creamy spinach gravy',
    prepTime: 18,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Palak_paneer.jpg',
    reviews: [
      { userName: 'Ishita', rating: 4, comment: 'Creamy spinach goodness.', timestamp: new Date() }
    ]
  },
  {
    id: '8',
    name: 'Tandoori Chicken',
    price: 24.99,
    category: 'Main Course',
    available: false,
    description: 'Chicken marinated in yogurt and spices, cooked in tandoor',
    prepTime: 35,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Tandoori_chicken.jpg',
    reviews: [
      { userName: 'Rohit', rating: 3, comment: 'Tasty but currently unavailable.', timestamp: new Date() }
    ]
  },
  
  // Breads
  {
    id: '9',
    name: 'Naan',
    price: 4.99,
    category: 'Bread',
    available: true,
    description: 'Soft leavened bread baked in tandoor',
    prepTime: 8,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Naanbread.jpg',
    reviews: [
      { userName: 'Meera', rating: 5, comment: 'Soft and fluffy!', timestamp: new Date() }
    ]
  },
  {
    id: '10',
    name: 'Garlic Naan',
    price: 5.99,
    category: 'Bread',
    available: true,
    description: 'Naan topped with fresh garlic and herbs',
    prepTime: 10,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Garlic_naan.jpg',
    reviews: [
      { userName: 'Sachin', rating: 5, comment: 'Garlic aroma is perfect.', timestamp: new Date() }
    ]
  },
  {
    id: '11',
    name: 'Roti',
    price: 3.99,
    category: 'Bread',
    available: true,
    description: 'Traditional whole wheat flatbread',
    prepTime: 5,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Chapati%2C_roti.jpg',
    reviews: [
      { userName: 'Sneha', rating: 4, comment: 'Healthy and light.', timestamp: new Date() }
    ]
  },
  
  // Desserts
  {
    id: '12',
    name: 'Gulab Jamun',
    price: 7.99,
    category: 'Dessert',
    available: true,
    description: 'Sweet milk dumplings in rose-flavored syrup',
    prepTime: 5,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Gulab_Jamun_%28GJB%29.jpg',
    reviews: [
      { userName: 'Arjun', rating: 5, comment: 'Melt-in-mouth!', timestamp: new Date() }
    ]
  },
  {
    id: '13',
    name: 'Kulfi',
    price: 6.99,
    category: 'Dessert',
    available: true,
    description: 'Traditional Indian ice cream with cardamom and pistachios',
    prepTime: 3,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Kulfi.jpg',
    reviews: [
      { userName: 'Ritika', rating: 5, comment: 'So creamy!', timestamp: new Date() }
    ]
  },
  
  // Beverages
  {
    id: '14',
    name: 'Masala Chai',
    price: 3.99,
    category: 'Beverage',
    available: true,
    description: 'Spiced tea with milk and aromatic herbs',
    prepTime: 5,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Masala_Chai_tea.jpg',
    reviews: [
      { userName: 'Dev', rating: 5, comment: 'Perfect masala balance.', timestamp: new Date() }
    ]
  },
  {
    id: '15',
    name: 'Lassi',
    price: 5.99,
    category: 'Beverage',
    available: true,
    description: 'Refreshing yogurt-based drink with mango or sweet flavor',
    prepTime: 3,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Glass_of_Mango_Lassi.jpg',
    reviews: [
      { userName: 'Ananya', rating: 5, comment: 'Refreshing!', timestamp: new Date() }
    ]
  }
];

export const initialTables: Table[] = [
  {
    id: 't1',
    number: 1,
    capacity: 4,
    status: 'available'
  },
  {
    id: 't2',
    number: 2,
    capacity: 2,
    status: 'available'
  },
  {
    id: 't3',
    number: 3,
    capacity: 6,
    status: 'available'
  },
  {
    id: 't4',
    number: 4,
    capacity: 4,
    status: 'available'
  }
];