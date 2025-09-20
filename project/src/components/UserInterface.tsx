import React, { useEffect, useMemo, useState } from 'react';
import { FoodItem, CartItem, User } from '../types';
import { ArrowLeft, Clock, CheckCircle, XCircle, Search, Plus, Minus, ShoppingCart, Trash2, LogOut, Star, StarHalf } from 'lucide-react';

interface UserInterfaceProps {
  foodItems: FoodItem[];
  user: User;
  onBack: () => void;
  onPlaceOrder: (items: CartItem[], tableNumber: number) => void;
  onLogout: () => void;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ foodItems, user, onBack, onPlaceOrder, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | null>(null);
  const [sortBy, setSortBy] = useState<'relevance' | 'priceAsc' | 'priceDesc' | 'prepAsc' | 'prepDesc'>('relevance');
  const [showReviewFor, setShowReviewFor] = useState<string | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const categories = ['All', ...Array.from(new Set(foodItems.map(item => item.category)))];
  
  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'prepAsc':
        return a.prepTime - b.prepTime;
      case 'prepDesc':
        return b.prepTime - a.prepTime;
      default:
        return 0;
    }
  });

  const addToCart = (item: FoodItem) => {
    if (!item.available) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.foodId === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.foodId === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, {
          foodId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        }];
      }
    });
  };

  const updateQuantity = (foodId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.foodId !== foodId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.foodId === foodId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (foodId: string) => {
    setCart(prevCart => prevCart.filter(item => item.foodId !== foodId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0 || !user.tableNumber) return;
    setShowPayment(true);
  };

  const inrFormatter = useMemo(() => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }), []);

  const upiId = '9390978060@pthdfc';
  const upiPayUri = useMemo(() => {
    const amount = getTotalPrice().toFixed(2);
    const tn = encodeURIComponent(`Table ${user.tableNumber} order`);
    const pn = encodeURIComponent('Spice Palace');
    return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${pn}&am=${amount}&cu=INR&tn=${tn}`;
  }, [cart, user.tableNumber]);

  const upiQrUrl = useMemo(() => {
    return `https://quickchart.io/qr?text=${encodeURIComponent(upiPayUri)}&size=256&margin=2`;
  }, [upiPayUri]);

  const confirmPaymentAndPlaceOrder = () => {
    if (!user.tableNumber) return;
    onPlaceOrder(cart, user.tableNumber);
    setCart([]);
    setShowCart(false);
    setShowPayment(false);
    setPaymentMethod(null);
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  // Toast + sound for order placed
  useEffect(() => {
    if (!orderPlaced) return;
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/226/226-preview.mp3');
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch {}
  }, [orderPlaced]);

  const getAverageRating = (itemId: string) => {
    const item = foodItems.find(i => i.id === itemId);
    const reviews = item?.reviews ?? [];
    if (reviews.length === 0) return 0;
    return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  };

  const renderStars = (value: number) => {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    const stars = [] as JSX.Element[];
    for (let i = 0; i < full; i++) stars.push(<Star key={`f${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-400" />);
    if (half) stars.push(<StarHalf key="half" className="w-4 h-4 text-yellow-500 fill-yellow-400" />);
    while (stars.length < 5) stars.push(<Star key={`e${stars.length}`} className="w-4 h-4 text-gray-300" />);
    return <div className="flex items-center">{stars}</div>;
  };

  const getImageForName = (name: string) => {
    const query = encodeURIComponent(name);
    return `https://source.unsplash.com/seed/${query}/96x96/?${query},indian,food,dish`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                Table {user.tableNumber}
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800">Spice Palace Menu</h1>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              
              <button
                onClick={onLogout}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Success Message */}
      {orderPlaced && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Order placed successfully for Table {user.tableNumber}!
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for delicious Indian dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              />
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full md:w-56 px-3 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="prepAsc">Prep Time: Low to High</option>
                <option value="prepDesc">Prep Time: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-orange-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl ?? getImageForName(item.name)}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover border border-orange-100"
                      loading="lazy"
                    />
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  </div>
                  <div className="flex items-center">
                    {item.available ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-green-700">
                    <span className="text-2xl font-bold">{inrFormatter.format(item.price)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.prepTime} min
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {renderStars(getAverageRating(item.id))}
                    <span className="text-sm text-gray-600">
                      {getAverageRating(item.id).toFixed(1)} ({item.reviews?.length ?? 0})
                    </span>
                  </div>
                  <button
                    onClick={() => setShowReviewFor(item.id)}
                    className="text-sm text-orange-600 hover:text-orange-700"
                  >
                    Rate & Review
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                    {item.category}
                  </span>
                  
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    item.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.available ? 'Available' : 'Out of Stock'}
                  </span>
                </div>

                {cart.find(c => c.foodId === item.id) ? (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        const existing = cart.find(c => c.foodId === item.id)!;
                        updateQuantity(item.id, Math.max(0, existing.quantity - 1));
                      }}
                      className="px-3 py-2 rounded-lg bg-orange-200 hover:bg-orange-300"
                    >
                      -
                    </button>
                    <span className="font-semibold">{cart.find(c => c.foodId === item.id)?.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.available}
                      className="px-3 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.available}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      item.available
                        ? 'bg-orange-600 text-white hover:bg-orange-700 transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {item.available ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found matching your search.</p>
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b bg-orange-50">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Your Order - Table {user.tableNumber}</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.foodId} className="flex items-center justify-between bg-orange-50 p-4 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-green-600 font-medium">${item.price.toFixed(2)} each</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.foodId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center hover:bg-orange-300 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.foodId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center hover:bg-orange-300 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => removeFromCart(item.foodId)}
                          className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="ml-4 text-right">
                        <p className="font-bold text-gray-800">{inrFormatter.format(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-orange-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-800">Total: {inrFormatter.format(getTotalPrice())}</span>
                  <span className="text-gray-600">{getTotalItems()} items</span>
                </div>
                
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors transform hover:scale-105"
                >
                  Place Order for Table {user.tableNumber}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b bg-orange-50">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Choose Payment Method</h2>
                <button
                  onClick={() => { setShowPayment(false); setPaymentMethod(null); }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-3 rounded-lg font-semibold border ${paymentMethod === 'cash' ? 'bg-green-600 text-white border-green-700' : 'bg-white text-gray-800 hover:bg-green-50 border-gray-300'}`}
                  >
                    Cash
                  </button>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 rounded-lg font-semibold border ${paymentMethod === 'upi' ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-gray-800 hover:bg-blue-50 border-gray-300'}`}
                  >
                    Online (UPI)
                  </button>
                </div>
              </div>

              {paymentMethod === 'upi' && (
                <div className="bg-gray-50 border rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Scan to pay</p>
                  <img src={upiQrUrl} alt="UPI QR" className="mx-auto w-56 h-56" />
                  <p className="mt-3 text-gray-800 font-medium">Payable: {inrFormatter.format(getTotalPrice())}</p>
                  <p className="text-xs text-gray-500 mt-1">UPI ID: {upiId}</p>
                  <a
                    href={upiPayUri}
                    className="inline-block mt-3 text-blue-600 hover:underline text-sm"
                  >
                    Open in UPI app
                  </a>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="bg-gray-50 border rounded-lg p-4">
                  <p className="text-gray-700">Please pay cash to the server. Total due:</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{inrFormatter.format(getTotalPrice())}</p>
                </div>
              )}

              <div className="mt-6 flex items-center justify-between">
                <span className="text-gray-600">Table {user.tableNumber}</span>
                <button
                  onClick={confirmPaymentAndPlaceOrder}
                  disabled={!paymentMethod}
                  className={`py-3 px-6 rounded-lg font-semibold ${paymentMethod ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewFor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full overflow-hidden">
            <div className="p-6 border-b bg-orange-50">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Rate this dish</h2>
                <button
                  onClick={() => { setShowReviewFor(null); setNewRating(5); setNewComment(''); }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {[5,4,3,2,1].map(r => (
                    <option key={r} value={r}>{r} Stars</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review (optional)</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Share your experience..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => { setShowReviewFor(null); setNewRating(5); setNewComment(''); }}
                  className="px-4 py-2 mr-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Client-only: push into in-memory array for demo purposes
                    const idx = foodItems.findIndex(f => f.id === showReviewFor);
                    if (idx !== -1) {
                      const target = foodItems[idx];
                      const arr = target.reviews ?? (target.reviews = []);
                      arr.push({ userName: user.username, rating: newRating, comment: newComment, timestamp: new Date() });
                    }
                    setShowReviewFor(null);
                    setNewRating(5);
                    setNewComment('');
                  }}
                  className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Sticky mini-cart */}
      {getTotalItems() > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 flex items-center"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {getTotalItems()} • {inrFormatter.format(getTotalPrice())}
        </button>
      )}
    </div>
  );
};

export default UserInterface;