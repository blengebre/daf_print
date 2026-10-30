import React, { useState } from 'react';
import { X, CheckCircle, Clock, Search, Filter, Eye, Printer, Phone, MapPin, Sparkles } from 'lucide-react';

export default function AdminOrdersModal({
  isOpen,
  onClose,
  orders = [],
  onUpdateOrderStatus
}) {
  const [filterQuery, setFilterQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    const matchesQuery =
      !filterQuery ||
      o.orderId.toLowerCase().includes(filterQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      o.customerPhone.includes(filterQuery) ||
      o.transactionId.toLowerCase().includes(filterQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>EthioPrint Production & Merchant Dashboard</span>
                <span className="text-[10px] bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full font-mono border border-indigo-400/30">
                  Staff View
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Track incoming Telebirr & CBE print orders, verify artwork DPI, and dispatch orders
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search by Order ID, phone, name..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white focus:outline-none text-xs"
            >
              <option value="all">All Orders ({orders.length})</option>
              <option value="Confirmed & Payment Verified">Payment Verified</option>
              <option value="In Printing">In Printing</option>
              <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="Dispatched">Dispatched</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              <p>No orders found matching your search.</p>
              <p className="text-xs text-slate-400 mt-1">Submit an order using Telebirr or CBE to see it here live!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((ord) => (
                <div
                  key={ord.orderId}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Left Info */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 shadow-inner"
                      style={{ backgroundColor: ord.selectedColor?.hex || '#ffffff' }}
                    >
                      <span className="text-[10px] font-bold" style={{ color: ord.selectedColor?.isDark ? '#fff' : '#000' }}>
                        {ord.product?.id?.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {ord.orderId}
                        </span>
                        <span className="text-xs font-bold text-slate-900">{ord.customerName}</span>
                        <span className="text-[11px] text-slate-500 font-mono">({ord.customerPhone})</span>

                        {ord.selectedUrgency?.percentage > 0 && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                            {ord.selectedUrgency.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600">
                        <strong>{ord.quantity}x {ord.product?.name}</strong> • Color: {ord.selectedColor?.name}
                        {ord.customText && <span className="text-indigo-600 ml-1">("{ord.customText}")</span>}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{ord.deliveryArea}</span>
                        </span>
                        <span>•</span>
                        <span className="font-mono font-semibold text-emerald-700">
                          {ord.paymentMethod?.toUpperCase()}: {ord.transactionId}
                        </span>
                        <span>•</span>
                        <span>Due: <strong className="text-slate-800">{ord.estimatedDeliveryText}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right Status & Actions */}
                  <div className="flex items-center gap-3 self-end lg:self-center border-t lg:border-t-0 pt-2 lg:pt-0 w-full lg:w-auto justify-between lg:justify-end">
                    <div className="text-right">
                      <span className="text-sm font-extrabold font-mono text-slate-900 block">
                        {ord.totalAmount?.toLocaleString()} ETB
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Payment Verified</span>
                    </div>

                    <select
                      value={ord.orderStatus}
                      onChange={(e) => onUpdateOrderStatus(ord.orderId, e.target.value)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 text-slate-800"
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
          )}
        </div>
      </div>
    </div>
  );
}
