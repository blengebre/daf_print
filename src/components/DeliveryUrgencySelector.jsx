import React from 'react';
import { Calendar, Clock, Zap, ShieldCheck } from 'lucide-react';
import { URGENCY_TIERS } from '../data/products';

export default function DeliveryUrgencySelector({
  selectedUrgency,
  onSelectUrgency,
  targetDate,
  onTargetDateChange,
  estimatedDeliveryText,
  language = 'am',
  t
}) {
  const today = new Date();
  const minDateStr = today.toISOString().split('T')[0];

  const handleDateChange = (e) => {
    const chosenDateStr = e.target.value;
    onTargetDateChange(chosenDateStr);

    if (!chosenDateStr) return;
    const chosen = new Date(chosenDateStr);
    chosen.setHours(0,0,0,0);
    const diffTime = chosen.getTime() - new Date().setHours(0,0,0,0);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      const urgentTier = URGENCY_TIERS.find(t => t.id === 'super_urgent');
      if (urgentTier) onSelectUrgency(urgentTier);
    } else if (diffDays === 2) {
      const priorityTier = URGENCY_TIERS.find(t => t.id === 'priority');
      if (priorityTier) onSelectUrgency(priorityTier);
    } else {
      const standardTier = URGENCY_TIERS.find(t => t.id === 'standard');
      if (standardTier) onSelectUrgency(standardTier);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#F58220] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
            4
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            {t?.step4DeliveryTitle || 'ደረጃ 4፡ የማድረሻ ፍጥነት እና ቀን'}
          </h4>
        </div>

        {selectedUrgency.percentage > 0 && (
          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-orange-50 text-[#C25E00] border border-orange-200">
            +{selectedUrgency.percentage}% {language === 'am' ? 'ተጨማሪ ክፍያ' : 'Rush Fee'}
          </span>
        )}
      </div>

      {/* 3 Simple Choice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {URGENCY_TIERS.map((tier) => {
          const isSelected = selectedUrgency.id === tier.id;
          const tierTitle = language === 'am' && tier.nameAmharic ? tier.nameAmharic : tier.name;
          const tierDays = language === 'am' && tier.daysLabelAmharic ? tier.daysLabelAmharic : tier.daysLabel;

          return (
            <div
              key={tier.id}
              onClick={() => onSelectUrgency(tier)}
              className={`p-3 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                isSelected
                  ? 'border-[#F58220] bg-orange-50/60 shadow-xs'
                  : 'border-slate-200 hover:border-orange-200 bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="font-semibold text-slate-900">
                    {tierTitle}
                  </span>
                  <span className="font-mono text-[#C25E00] font-bold">
                    {tier.percentage === 0 ? (language === 'am' ? 'ነጻ' : 'Free') : `+${tier.percentage}%`}
                  </span>
                </div>
                <p className="text-xs text-[#C25E00] font-medium">{tierDays}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2 text-[11px] text-slate-500">
                {tier.percentage === 0 
                  ? (language === 'am' ? 'መደበኛ ተራ' : 'Standard queue') 
                  : (language === 'am' ? 'ፈጣን ኤክስፕረስ ተራ' : 'Priority express')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pick Day Calendar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#F58220] shrink-0" />
          <span className="text-slate-700 font-medium">
            {t?.targetDeliveryDateLabel || 'የሚረከቡበት ቀን'}:
          </span>
        </div>

        <input
          type="date"
          min={minDateStr}
          value={targetDate}
          onChange={handleDateChange}
          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Guaranteed time verification preview */}
      <div className="flex items-center gap-2 text-xs text-slate-600 bg-orange-50/40 p-2.5 rounded-xl border border-orange-100">
        <Clock className="w-4 h-4 text-[#F58220] shrink-0" />
        <span>
          <strong className="text-slate-800">{t?.guaranteedPromise || 'የተረጋገጠ የማድረሻ ቃል'}:</strong>{' '}
          {estimatedDeliveryText}
        </span>
      </div>
    </div>
  );
}
