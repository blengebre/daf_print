import React, { useState } from 'react';
import { Search, X, CheckCircle, Clock, MapPin, AlertCircle, Sparkles } from 'lucide-react';

export default function OrderTrackerModal({
  isOpen,
  onClose,
  orders = [],
  onSelectFoundOrder,
  language = 'am',
  t,
  initialQuery = ''
}) {
  const [trackingQuery, setTrackingQuery] = useState(initialQuery);
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  React.useEffect(() => {
    if (initialQuery && isOpen) {
      setTrackingQuery(initialQuery);
      setHasSearched(true);
      const cleanQ = initialQuery.trim().toLowerCase();
      const found = orders.find(
        (o) =>
          o.orderId.toLowerCase() === cleanQ ||
          o.orderId.toLowerCase().includes(cleanQ) ||
          o.customerPhone.includes(cleanQ) ||
          o.transactionId?.toLowerCase().includes(cleanQ)
      );
      setSearchResult(found || null);
    }
  }, [initialQuery, isOpen]);

  if (!isOpen) return null;

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingQuery.trim()) return;

    setHasSearched(true);
    const cleanQ = trackingQuery.trim().toLowerCase();

    const found = orders.find(
      (o) =>
        o.orderId.toLowerCase() === cleanQ ||
        o.orderId.toLowerCase().includes(cleanQ) ||
        o.customerPhone.includes(cleanQ) ||
        o.transactionId?.toLowerCase().includes(cleanQ)
    );

    setSearchResult(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-[#F58220]" />
            <h3 className="text-base font-bold text-slate-800">
              {t?.trackerModalTitle || 'የትዕዛዝዎን ሁኔታ ይከታተሉ'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            {t?.trackerModalSubtitle || 'የትዕዛዝ ቁጥርዎን ወይም ስልክዎን በማስገባት ህትመቱ የደረሰበትን ደረጃ እና የማድረሻ ሰዓቱን ይመልከቱ'}
          </p>

          <form onSubmit={handleTrackSubmit} className="flex gap-2">
            <input
              type="text"
              required
              value={trackingQuery}
              onChange={(e) => setTrackingQuery(e.target.value)}
              placeholder={t?.trackerInputPlaceholder || 'ለምሳሌ፡ ETH-PRNT-1024 ወይም 0930077432'}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono uppercase bg-white text-slate-800 placeholder-slate-400"
              autoFocus
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F58220] hover:bg-[#E07010] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition"
            >
              {t?.btnTrackNow || 'አሁን ፈልግ'}
            </button>
          </form>

          {/* Search result display */}
          {hasSearched && (
            <div className="pt-2">
              {searchResult ? (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {language === 'am' ? 'ትዕዛዝ ተረጋግጧል' : 'Order Verified'}
                      </span>
                      <p className="text-sm font-extrabold text-slate-900 font-mono">{searchResult.orderId}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                      {searchResult.orderStatus || 'Confirmed'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <p>
                      <strong>{language === 'am' ? 'ምርት፡' : 'Product:'}</strong> {searchResult.quantity}x {searchResult.product?.name} ({searchResult.selectedColor?.name})
                    </p>
                    <p>
                      <strong>{language === 'am' ? 'ደንበኛ፡' : 'Customer:'}</strong> {searchResult.customerName} ({searchResult.customerPhone})
                    </p>
                    <div className="flex items-center gap-1.5 text-[#C25E00] font-bold bg-orange-50 p-2 rounded-lg border border-orange-200">
                      <Clock className="w-4 h-4 shrink-0 text-[#F58220]" />
                      <span>{t?.guaranteedPromise || 'የማድረሻ ሰዓት'}: {searchResult.estimatedDeliveryText}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectFoundOrder(searchResult);
                      onClose();
                    }}
                    className="w-full py-2 bg-[#F58220] hover:bg-[#E07010] text-white text-xs font-bold rounded-xl transition shadow-xs"
                  >
                    {language === 'am' ? 'ሙሉ ደረሰኝ እና የሰዓት ቆጣሪ ይመልከቱ' : 'View Full Digital Receipt & Countdown'}
                  </button>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">
                      {language === 'am' ? `በ "${trackingQuery}" የተገኘ ትዕዛዝ የለም።` : `No active order found for "${trackingQuery}".`}
                    </p>
                    <p className="text-rose-600 mt-0.5">
                      {t?.noOrderFound || 'በዚህ ቁጥር ወይም ስልክ የተገኘ ንቁ ትዕዛዝ የለም።'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
