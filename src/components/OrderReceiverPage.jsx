import React, { useState } from 'react';
import { 
  Printer, 
  Clock, 
  CheckCircle2, 
  Search, 
  Phone, 
  MapPin, 
  Check, 
  Zap, 
  ArrowRight, 
  Edit3,
  Maximize2
} from 'lucide-react';
import ReceiverDesignEditorModal from './ReceiverDesignEditorModal';

export default function OrderReceiverPage({
  orders = [],
  onUpdateOrderStatus,
  onSaveOrderDesign,
  onOpenSearchModal,
  currentUser,
  onNavigateHome,
  language = 'am',
  t
}) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'urgent' | 'in_printing' | 'ready'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForTicket, setSelectedOrderForTicket] = useState(null);
  const [editingOrderForDesign, setEditingOrderForDesign] = useState(null);
  const [internalNotes, setInternalNotes] = useState({});

  // Filter logic
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      !searchQuery ||
      o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.transactionId?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'urgent') return o.selectedUrgency?.percentage > 0;
    if (activeFilter === 'in_printing') return o.orderStatus === 'In Printing';
    if (activeFilter === 'ready') return o.orderStatus === 'Ready for Pickup' || o.orderStatus === 'Dispatched';

    return true;
  });

  const urgentCount = orders.filter(o => o.selectedUrgency?.percentage > 0).length;
  const inPrintingCount = orders.filter(o => o.orderStatus === 'In Printing').length;
  const readyCount = orders.filter(o => o.orderStatus === 'Ready for Pickup' || o.orderStatus === 'Dispatched').length;

  const handlePrintJobTicket = (ord) => {
    setSelectedOrderForTicket(ord);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleAddNote = (orderId, note) => {
    setInternalNotes(prev => ({
      ...prev,
      [orderId]: note
    }));
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* 1. CLEAN LIGHT RECEIVER HEADER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#C25E00] text-xs font-semibold border border-orange-200">
            <span className="w-2 h-2 rounded-full bg-[#F58220] animate-pulse"></span>
            <span>{language === 'am' ? 'ዲ.ኤ.ኤፍ ማተሚያ ቤት • የትዕዛዝ መቀበያ እና ዎርክሾፕ' : 'D.A.F Printing • Workshop Terminal'}</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <span>{t?.receiverTitle || 'የትዕዛዝ መቀበያ እና የዎርክሾፕ ክፍል'}</span>
            <span className="text-xs font-medium text-slate-500">
              ({currentUser?.name || 'Dawit Alemu'})
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            {t?.receiverSubtitle || 'የመጡ ትዕዛዞችን ይመልከቱ፣ ዲዛይኑን በቲሸርቱ ላይ ይፈትሹ፣ ጽሁፍ/ፎቶ ያስተካክሉ እና የህትመት ደረጃውን ያዘምኑ'}
          </p>
        </div>

        {/* Status Counters */}
        <div className="grid grid-cols-3 gap-3 shrink-0 text-center">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <p className="text-xl font-mono font-bold text-slate-900">{orders.length}</p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">
              {language === 'am' ? 'ጠቅላላ ትዕዛዞች' : 'Total Orders'}
            </p>
          </div>

          <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-200">
            <p className="text-xl font-mono font-bold text-[#C25E00]">{urgentCount}</p>
            <p className="text-[10px] text-[#C25E00] uppercase font-semibold">
              {language === 'am' ? 'አስቸኳይ' : 'Urgent'}
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <p className="text-xl font-mono font-bold text-slate-800">{inPrintingCount}</p>
            <p className="text-[10px] text-slate-500 uppercase font-semibold">
              {language === 'am' ? 'በህትመት ላይ' : 'In Printing'}
            </p>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER TABS */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t?.searchOrdersPlaceholder || 'የትዕዛዝ ቁጥር፣ የደንበኛ ስም፣ ስልክ...'}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#F58220] text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t?.allOrdersTab || 'ሁሉም'} ({orders.length})
          </button>

          <button
            onClick={() => setActiveFilter('urgent')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap flex items-center gap-1 ${
              activeFilter === 'urgent'
                ? 'bg-[#F58220] text-white shadow-xs'
                : 'bg-orange-50 text-[#C25E00] hover:bg-orange-100 border border-orange-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{language === 'am' ? 'አስቸኳይ' : 'Urgent'} ({urgentCount})</span>
          </button>

          <button
            onClick={() => setActiveFilter('in_printing')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
              activeFilter === 'in_printing'
                ? 'bg-[#F58220] text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {t?.inPrintingTab || 'በህትመት ላይ'} ({inPrintingCount})
          </button>

          <button
            onClick={() => setActiveFilter('ready')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap ${
              activeFilter === 'ready'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            {t?.readyTab || 'የተጠናቀቁ'} ({readyCount})
          </button>
        </div>
      </div>

      {/* 3. ORDER CARDS (CLEAN LIGHT DESIGN) */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500 text-sm">
            {language === 'am' ? 'ምንም የሚዛመድ ትዕዛዝ አልተገኘም።' : 'No matching orders in the queue.'}
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isUrgent = ord.selectedUrgency?.percentage > 0;
            const pName = language === 'am' && ord.product?.nameAmharic ? ord.product.nameAmharic : ord.product?.name;
            const cName = language === 'am' && ord.selectedColor?.nameAmharic ? ord.selectedColor.nameAmharic : ord.selectedColor?.name;

            return (
              <div
                key={ord.orderId}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all p-5 space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                      {ord.orderId}
                    </span>

                    {isUrgent && (
                      <span className="px-2.5 py-0.5 rounded-md bg-orange-100 text-[#C25E00] text-[11px] font-semibold">
                        {language === 'am' ? 'አስቸኳይ' : 'Urgent'} (+{ord.selectedUrgency?.percentage}%)
                      </span>
                    )}

                    {ord.wasEditedByReceiver && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-semibold flex items-center gap-1 border border-emerald-200">
                        <Check className="w-3 h-3" />
                        <span>{t?.editedByReceiverBadge || 'በትዕዛዝ ተቀባይ የተስተካከለ'}</span>
                      </span>
                    )}
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">{t?.btnUpdateStatus || 'ደረጃ'}:</span>
                    <select
                      value={ord.orderStatus || 'Confirmed & Payment Verified'}
                      onChange={(e) => onUpdateOrderStatus(ord.orderId, e.target.value)}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Confirmed & Payment Verified">1. ክፍያ የተረጋገጠ (Payment Verified)</option>
                      <option value="In Printing">2. በህትመት ሂደት ላይ (In Printing)</option>
                      <option value="Ready for Pickup">3. ለርክክብ ዝግጁ (Ready for Dispatch)</option>
                      <option value="Dispatched">4. የተረከቡ / ደርሷል (Delivered)</option>
                    </select>
                  </div>
                </div>

                {/* Main Content Grid: Preview on Left, Info on Center, Actions on Right */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Visual Miniature Preview of the Design on T-Shirt */}
                  <div className="md:col-span-3 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center relative group">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      {/* Product Base Representation */}
                      <div
                        className="w-24 h-24 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center p-2 text-center transition"
                        style={{ backgroundColor: ord.selectedColor?.hex || '#ffffff' }}
                      >
                        {ord.imageSrc ? (
                          <img
                            src={ord.imageSrc}
                            alt="Order Graphic"
                            className="w-12 h-12 object-contain rounded"
                            style={{
                              transform: `rotate(${ord.imageRotation || 0}deg) scaleX(${ord.isFlipped ? -1 : 1})`
                            }}
                          />
                        ) : (
                          <span className="text-xl">👕</span>
                        )}

                        {ord.customText && (
                          <span
                            className="mt-1 text-[9px] font-bold truncate max-w-[80px]"
                            style={{ color: ord.textColor || '#000000' }}
                          >
                            {ord.customText}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-500 mt-1 font-medium">
                      {pName} ({cName})
                    </span>

                    {/* Quick Button to Open Live Editor */}
                    <button
                      onClick={() => setEditingOrderForDesign(ord)}
                      className="mt-2 text-[11px] text-[#C25E00] font-semibold hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3 text-[#F58220]" />
                      <span>{t?.btnViewEditDesign || 'ዲዛይኑን አርትዕ'}</span>
                    </button>
                  </div>

                  {/* Order Specifications & Customer Info */}
                  <div className="md:col-span-6 space-y-2 text-xs text-slate-600">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-900">
                        {ord.quantity}x {pName} ({ord.selectedSize || 'Standard'})
                      </p>
                      <p className="text-slate-500">
                        {language === 'am' ? 'ደንበኛ፡' : 'Customer:'} <strong className="text-slate-800">{ord.customerName}</strong> • {ord.customerPhone}
                      </p>
                    </div>

                    <div className="space-y-1 text-slate-600 pt-1 border-t border-slate-100">
                      <p>
                        <strong>{language === 'am' ? 'የተጻፈ ጽሁፍ፡' : 'Custom Text:'}</strong>{' '}
                        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-900">
                          {ord.customText || (language === 'am' ? 'ምንም ጽሁፍ የለም' : 'No text')}
                        </span>
                      </p>
                      <p>
                        <strong>{language === 'am' ? 'የማድረሻ አድራሻ፡' : 'Delivery Address:'}</strong> {ord.deliveryAddress || 'Addis Ababa'} ({ord.deliveryArea || 'Bole'})
                      </p>
                      <p className="text-[#C25E00] font-semibold">
                        <strong>{language === 'am' ? 'የማድረሻ ሰዓት፡' : 'Delivery Target:'}</strong> {ord.estimatedDeliveryText}
                      </p>
                    </div>

                    {ord.receiverEditNote && (
                      <div className="bg-emerald-50 text-emerald-800 p-2 rounded-lg text-[11px] border border-emerald-200">
                        <strong>{language === 'am' ? 'የዎርክሾፕ ማስታወሻ፡' : 'Workshop Note:'}</strong> {ord.receiverEditNote}
                      </div>
                    )}
                  </div>

                  {/* Actions Column: Edit Design on T-Shirt + Print Ticket */}
                  <div className="md:col-span-3 flex flex-col gap-2">
                    {/* Primary Button to Open Full Receiver Pre-Press Editor */}
                    <button
                      onClick={() => setEditingOrderForDesign(ord)}
                      className="w-full py-2.5 px-3 bg-[#F58220] hover:bg-[#E07010] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{t?.btnViewEditDesign || 'ዲዛይኑን ይመልከቱ & ያርትዑ'}</span>
                    </button>

                    <button
                      onClick={() => handlePrintJobTicket(ord)}
                      className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 flex items-center justify-center gap-1.5 transition"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-500" />
                      <span>{t?.btnJobSlip || 'የስራ ወረቀት አትም'}</span>
                    </button>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-medium">
                        {language === 'am' ? 'የተከፈለበት፡' : 'Paid via:'} {ord.paymentMethod?.toUpperCase()}
                      </span>
                      <span className="font-mono text-sm font-bold text-slate-900">
                        {ord.totalAmount?.toLocaleString()} {language === 'am' ? 'ብር' : 'ETB'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. MODAL: FULL VISUAL PRE-PRESS STUDIO FOR RECEIVER */}
      {editingOrderForDesign && (
        <ReceiverDesignEditorModal
          isOpen={!!editingOrderForDesign}
          onClose={() => setEditingOrderForDesign(null)}
          order={editingOrderForDesign}
          onSaveOrderDesign={onSaveOrderDesign}
          onOpenSearchModal={onOpenSearchModal}
          language={language}
          t={t}
        />
      )}
    </div>
  );
}
