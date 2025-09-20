import React, { useEffect, useMemo, useState } from 'react';
import { Table, Order, User } from '../types';
import { ArrowLeft, Users, Clock, CheckCircle2, AlertCircle, Eye, LogOut } from 'lucide-react';

interface AdminInterfaceProps {
  tables: Table[];
  user: User;
  onBack: () => void;
  onUpdateOrder: (tableId: string, newStatus: Order['status']) => void;
  onLogout: () => void;
}

const AdminInterface: React.FC<AdminInterfaceProps> = ({ tables, user, onBack, onUpdateOrder, onLogout }) => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'occupied' | 'reserved'>('all');
  const [search, setSearch] = useState('');
  
  const occupiedTables = tables.filter(table => table.status === 'occupied').length;
  const availableTables = tables.filter(table => table.status === 'available').length;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 text-white';
      case 'occupied':
        return 'bg-blue-500 text-white';
      case 'reserved':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getOrderStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'served':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
  const filteredTables = useMemo(() => {
    return tables.filter(t => (statusFilter === 'all' ? true : t.status === statusFilter))
      .filter(t => {
        if (!search.trim()) return true;
        const hay = `table ${t.number} ${t.currentOrder?.id ?? ''}`.toLowerCase();
        return hay.includes(search.toLowerCase());
      });
  }, [tables, statusFilter, search]);

  const getElapsed = (date?: Date) => {
    if (!date) return '';
    const ms = Date.now() - new Date(date).getTime();
    const mins = Math.floor(ms / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m ago`;
  };

  const confirmAndUpdate = (tableId: string, next: Order['status']) => {
    const label = next.charAt(0).toUpperCase() + next.slice(1);
    if (window.confirm(`Mark order as ${label}?`)) {
      onUpdateOrder(tableId, next);
    }
  };

  // Play a short sound on status updates to 'ready'
  useEffect(() => {
    const readyCount = tables.filter(t => t.currentOrder?.status === 'ready').length;
    let last = (window as any).__readyCount || 0;
    if (readyCount > last) {
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1701/1701-preview.mp3');
        audio.volume = 0.4;
        audio.play().catch(() => {});
      } catch {}
    }
    (window as any).__readyCount = readyCount;
  }, [tables]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
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
                Admin: {user.username}
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800">Spice Palace - Admin Dashboard</h1>
            
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary & Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Available Tables</p>
                <p className="text-3xl font-bold text-gray-800">{availableTables}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Occupied Tables</p>
                <p className="text-3xl font-bold text-gray-800">{occupiedTables}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-3">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Orders</p>
                <p className="text-3xl font-bold text-gray-800">
                  {tables.filter(table => table.currentOrder).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
            </select>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search: table or order id"
              className="px-3 py-2 border border-gray-300 rounded-lg w-64"
            />
          </div>
          <div className="text-sm text-gray-600">{filteredTables.length} tables</div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Table {table.number}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(table.status)}`}>
                    {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Capacity: {table.capacity}</span>
                </div>

                {table.currentOrder && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Order #{table.currentOrder.id}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{getElapsed(table.currentOrder.timestamp)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getOrderStatusColor(table.currentOrder.status)}`}>
                          {table.currentOrder.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-green-700">
                        <span className="font-semibold">{inr.format(table.currentOrder.total)}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(table.currentOrder.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedTable(selectedTable === table.id ? null : table.id)}
                        className="w-full flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {selectedTable === table.id ? 'Hide Details' : 'View Details'}
                      </button>
                      
                      {table.currentOrder.status !== 'served' && (
                        <div className="grid grid-cols-2 gap-2">
                          {table.currentOrder.status === 'pending' && (
                            <button
                              onClick={() => confirmAndUpdate(table.id, 'preparing')}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                            >
                              Start Prep
                            </button>
                          )}
                          {table.currentOrder.status === 'preparing' && (
                            <button
                              onClick={() => confirmAndUpdate(table.id, 'ready')}
                              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
                            >
                              Ready
                            </button>
                          )}
                          {table.currentOrder.status === 'ready' && (
                            <button
                              onClick={() => confirmAndUpdate(table.id, 'served')}
                              className="px-3 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700 transition-colors"
                            >
                              Served
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Order Details */}
                    {selectedTable === table.id && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium text-gray-800 mb-2">Order Items:</h4>
                        <div className="space-y-1">
                          {table.currentOrder.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="text-gray-800">{inr.format(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {!table.currentOrder && table.status === 'available' && (
                  <div className="text-center text-gray-500 text-sm py-4">
                    No active orders
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminInterface;