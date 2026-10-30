import React from 'react';
import { X, Package, Clock, CheckCircle2, MapPin, Printer, ArrowRight } from 'lucide-react';

export default function CustomerOrdersModal({
  isOpen,
  onClose,
  currentUser,
  orders = [],
  onSelectOrder
}) {
  if (!isOpen) return null;

  // Filter orders placed by this customer (or all if not filtered strictly)
  const customerOrders = orders.filter(
    o => o.customerPhone === currentUser?.phone || o.customerName === currentUser?.name
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg">
              🛍️
            </div>
            <div>
              <h3 className="text-base font-bold text-white">My Print Orders</h3>
              <p className="text-xs text-slate-400">
                Logged in as <strong>{currentUser?.name || 'Customer'}</strong> ({currentUser?.phone})
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

        {/* Orders list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {customerOrders.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No previous orders found for your account.</p>
              <p className="text-xs text-slate-400">
                Customize a product from our catalog and check out with Telebirr or CBE to see it here!
              </p>
            </div>
          ) : (
            customerOrders.map((ord) => (
              <div
                key={ord.orderId}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 hover:border-indigo-400 transition"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {ord.orderId}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{ord.product?.name}</span>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    {ord.orderStatus || 'Confirmed'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div>
                    <span>Quantity: <strong>{ord.quantity} pcs</strong> ({ord.selectedColor?.name})</span>
                    {ord.customText && (
                      <p className="text-indigo-600 font-mono mt-0.5">Text: "{ord.customText}"</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold font-mono text-slate-900 block">
                      {ord.totalAmount?.toLocaleString()} ETB
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Via {ord.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Est. Delivery: {ord.estimatedDeliveryText}</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectOrder(ord);
                      onClose();
                    }}
                    className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <span>View Receipt</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
