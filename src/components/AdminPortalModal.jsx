import React, { useState } from 'react';
import { 
  X, 
  Search, 
  TrendingUp, 
  Users, 
  Package, 
  Edit3, 
  Save, 
  ShieldCheck 
} from 'lucide-react';
import { INITIAL_USERS } from '../data/users';

export default function AdminPortalModal({
  isOpen,
  onClose,
  orders = [],
  products = [],
  onUpdateOrderStatus,
  onUpdateProductPrice
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'analytics' | 'products' | 'users'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  if (!isOpen) return null;

  // Analytics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const telebirrRevenue = orders
    .filter(o => o.paymentMethod === 'telebirr')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const cbeRevenue = orders
    .filter(o => o.paymentMethod === 'cbe')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const urgentOrdersCount = orders.filter(o => o.selectedUrgency?.percentage > 0).length;

  const filteredOrders = orders.filter(o => 
    !searchQuery ||
    o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customerPhone.includes(searchQuery)
  );

  const handleStartEditPrice = (prod) => {
    setEditingPriceId(prod.id);
    setTempPrice(String(prod.basePrice));
  };

  const handleSavePrice = (prodId) => {
    const num = Number(tempPrice);
    if (!isNaN(num) && num > 0 && onUpdateProductPrice) {
      onUpdateProductPrice(prodId, num);
    }
    setEditingPriceId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header (Clean Light) */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Store Admin Portal
            </h3>
            <p className="text-xs text-slate-500">
              Revenue reports, product pricing, all orders & staff accounts
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'orders' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'analytics' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Revenue</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'products' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Product Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'users' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Users & Staff</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* TAB 1: ALL ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by order ID, phone, name..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <span className="text-slate-500">
                  Total: {orders.length} orders
                </span>
              </div>

              <div className="space-y-2.5">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-slate-300 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs border border-slate-200 shrink-0"
                        style={{ backgroundColor: ord.selectedColor?.hex || '#ffffff' }}
                      >
                        <span style={{ color: ord.selectedColor?.isDark ? '#fff' : '#000' }}>
                          {ord.product?.id?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {ord.orderId}
                          </span>
                          <span className="font-bold text-slate-900">{ord.customerName}</span>
                          <span className="text-slate-500 font-mono">({ord.customerPhone})</span>
                        </div>
                        <p className="text-slate-600 mt-0.5">
                          {ord.quantity}x {ord.product?.name} • Area: {ord.deliveryArea}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-slate-900 block">
                          {ord.totalAmount?.toLocaleString()} ETB
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {ord.paymentMethod?.toUpperCase()}
                        </span>
                      </div>

                      <select
                        value={ord.orderStatus}
                        onChange={(e) => onUpdateOrderStatus(ord.orderId, e.target.value)}
                        className="px-2 py-1 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-800"
                      >
                        <option value="Confirmed & Payment Verified">Payment Verified</option>
                        <option value="In Printing">In Printing</option>
                        <option value="Ready for Pickup">Ready for Pickup</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FINANCIAL ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="font-medium text-slate-500 block">Total Revenue</span>
                  <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
                    {totalRevenue.toLocaleString()} <span className="text-xs font-normal">ETB</span>
                  </p>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">{orders.length} orders total</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="font-medium text-slate-500 block">Telebirr Received</span>
                  <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
                    {telebirrRevenue.toLocaleString()} <span className="text-xs font-normal">ETB</span>
                  </p>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Till 778921 / 0911234567</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="font-medium text-slate-500 block">CBE Bank Received</span>
                  <p className="text-2xl font-bold font-mono text-slate-900 mt-1">
                    {cbeRevenue.toLocaleString()} <span className="text-xs font-normal">ETB</span>
                  </p>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">Acc 1000248931924</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800">Urgent Surcharge Volume</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {urgentOrdersCount} orders selected express same-day / priority delivery.
                  </p>
                </div>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-800 font-bold rounded-lg font-mono">
                  {urgentOrdersCount} Jobs
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCT PRICING */}
          {activeTab === 'products' && (
            <div className="space-y-3">
              <p className="text-slate-500">
                Adjust base retail prices. Changes take effect across the website immediately:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map((prod) => {
                  const isEditing = editingPriceId === prod.id;
                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img src={prod.cardImage} alt={prod.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-900">{prod.name}</p>
                          <span className="text-slate-400 text-[11px]">{prod.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="w-16 px-2 py-1 text-xs font-mono font-bold rounded border border-blue-500 focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSavePrice(prod.id)}
                              className="p-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
                              title="Save"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-slate-900">
                              {prod.basePrice} ETB
                            </span>
                            <button
                              onClick={() => handleStartEditPrice(prod)}
                              className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded transition"
                              title="Edit Price"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: USERS & STAFF */}
          {activeTab === 'users' && (
            <div className="space-y-3">
              <p className="text-slate-500">
                Registered platform users and staff accounts:
              </p>

              <div className="space-y-2">
                {INITIAL_USERS.map((usr) => (
                  <div
                    key={usr.id}
                    className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{usr.avatar}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-slate-900">{usr.name}</p>
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded uppercase bg-slate-100 text-slate-700">
                            {usr.role}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{usr.email} • {usr.phone}</p>
                      </div>
                    </div>

                    <span className="text-slate-600 font-medium">
                      {usr.roleTitle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
