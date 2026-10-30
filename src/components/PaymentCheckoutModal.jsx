import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Copy, Check, Building2, AlertCircle, ArrowRight, Smartphone } from 'lucide-react';

export default function PaymentCheckoutModal({
  isOpen,
  onClose,
  orderData,
  currentUser,
  onCompleteOrder,
  language = 'am',
  t
}) {
  const [paymentMethod, setPaymentMethod] = useState('telebirr'); // 'telebirr' | 'cbe' | 'cash_pickup'
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [deliveryArea, setDeliveryArea] = useState(currentUser?.deliveryArea || (language === 'am' ? 'ቦሌ፣ አዲስ አበባ' : 'Bole, Addis Ababa'));
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser?.deliveryAddress || '');

  // Payment proof states
  const [telebirrTxnId, setTelebirrTxnId] = useState('');
  const [cbeTxnId, setCbeTxnId] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  React.useEffect(() => {
    if (currentUser?.name && !customerName) setCustomerName(currentUser.name);
    if (currentUser?.phone && !customerPhone) setCustomerPhone(currentUser.phone);
    if (currentUser?.deliveryArea && !deliveryArea) setDeliveryArea(currentUser.deliveryArea);
    if (currentUser?.deliveryAddress && !deliveryAddress) setDeliveryAddress(currentUser.deliveryAddress);
  }, [currentUser]);

  if (!isOpen) return null;

  const totalAmount = orderData.totalAmount || 0;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setFormError(language === 'am' ? 'እባክዎ ሙሉ ስምዎን ያስገቡ።' : 'Please enter your name.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 9) {
      setFormError(language === 'am' ? 'እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ (ለምሳሌ፡ 0930077432)።' : 'Please enter a valid phone number (e.g. 0930077432).');
      return;
    }
    if (paymentMethod === 'telebirr' && !telebirrTxnId.trim()) {
      setFormError(language === 'am' ? 'እባክዎ ከቴሌብር የደረሰዎትን የትራንዛክሽን ቁጥር (Transaction ID) ያስገቡ።' : 'Please enter the Telebirr SMS Transaction ID.');
      return;
    }
    if (paymentMethod === 'cbe' && !cbeTxnId.trim()) {
      setFormError(language === 'am' ? 'እባክዎ የንግድ ባንክ የግብይት ቁጥር (FT ቁጥር) ያስገቡ።' : 'Please enter the CBE Transaction Reference (FT number).');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `ETH-PRNT-${Math.floor(1000 + Math.random() * 9000)}`;
      const completedOrder = {
        ...orderData,
        orderId: generatedOrderId,
        customerName,
        customerPhone,
        deliveryArea,
        deliveryAddress: deliveryAddress || (language === 'am' ? 'አዲስ አበባ' : 'Addis Ababa Central'),
        paymentMethod,
        transactionId: paymentMethod === 'telebirr' ? telebirrTxnId : paymentMethod === 'cbe' ? cbeTxnId : 'PAY_ON_PICKUP',
        paidAt: new Date().toISOString(),
        orderStatus: 'Confirmed & Payment Verified'
      };

      setIsSubmitting(false);
      onCompleteOrder(completedOrder);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              {t?.checkoutTitle || 'ትዕዛዝዎን ያጠናቁ እና ክፍያ ይፈጽሙ'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'am' ? 'ጠቅላላ የሚከፈል ዋጋ፡' : 'Total to pay:'}{' '}
              <strong className="text-[#F58220] font-mono text-sm">{totalAmount.toLocaleString()} {language === 'am' ? 'ብር' : 'ETB'}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-6 space-y-5">
          {formError && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Customer & Address Details */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t?.deliveryInfoSection || 'የማድረሻ አድራሻ እና የስልክ መረጃ'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {t?.fullNameLabel || 'የደንበኛ ሙሉ ስም'}:
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Abebe Kebede"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {t?.phoneLabel || 'የስልክ ቁጥር (የቴሌብር ስልክ)'}:
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="0930077432"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {t?.citySubcityLabel || 'ከተማ እና ክፍለ ከተማ'}:
                </label>
                <input
                  type="text"
                  required
                  value={deliveryArea}
                  onChange={(e) => setDeliveryArea(e.target.value)}
                  placeholder="e.g. Bole, Addis Ababa"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  {t?.specificAddressLabel || 'ልዩ የመኖሪያ ወይም የቢሮ አድራሻ'}:
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Near Edna Mall, House 402"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t?.choosePaymentMethod || 'የክፍያ አማራጭ ይምረጡ'}
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('telebirr')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition font-semibold text-left ${
                  paymentMethod === 'telebirr'
                    ? 'border-[#F58220] bg-orange-50/60 text-[#C25E00] shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#F58220]" />
                <div>
                  <p>{t?.telebirrOption || 'ቴሌብር (Telebirr)'}</p>
                  <span className="text-[10px] text-slate-500 font-normal">{language === 'am' ? 'በስልክ ወይም በቲል' : 'Instant phone transfer'}</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cbe')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition font-semibold text-left ${
                  paymentMethod === 'cbe'
                    ? 'border-[#F58220] bg-orange-50/60 text-[#C25E00] shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-4 h-4 text-purple-600" />
                <div>
                  <p>{t?.cbeOption || 'የኢትዮጵያ ንግድ ባንክ (CBE)'}</p>
                  <span className="text-[10px] text-slate-500 font-normal">{language === 'am' ? 'በሂሳብ ቁጥር' : 'Direct bank transfer'}</span>
                </div>
              </button>
            </div>

            {/* Telebirr Details Box */}
            {paymentMethod === 'telebirr' && (
              <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-[#C25E00] uppercase block">
                      {t?.telebirrMerchantNumber || 'የቴሌብር ነጋዴ ስልክ ቁጥር / ቲል'}
                    </span>
                    <span className="font-mono text-base font-bold text-slate-900">0930077432</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('0930077432', 'telebirr')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-orange-200 text-[#C25E00] hover:bg-orange-100 flex items-center gap-1 font-semibold"
                  >
                    {copiedField === 'telebirr' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'telebirr' ? (language === 'am' ? 'ተቀድቷል' : 'Copied') : (language === 'am' ? 'ቅዳ' : 'Copy')}</span>
                  </button>
                </div>

                <p className="text-slate-600">
                  {language === 'am' 
                    ? `እባክዎ ${totalAmount.toLocaleString()} ብር ወደ 0930077432 (ዲ.ኤ.ኤፍ ማተሚያ ቤት) በቴሌብር ይላኩ፤ ከዚያ ከኤስኤምኤስ የደረሰዎትን የትራንዛክሽን ቁጥር ከታች ያስገቡ።` 
                    : `Please transfer ${totalAmount.toLocaleString()} ETB to 0930077432 (D.A.F Printing Plc) using Telebirr, then enter the SMS Transaction ID below.`}
                </p>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    {t?.transRefLabel || 'ከኤስኤምኤስ የደረሰዎትን የግብይት ቁጥር (ትራንዛክሽን ID) ያስገቡ'}:
                  </label>
                  <input
                    type="text"
                    required
                    value={telebirrTxnId}
                    onChange={(e) => setTelebirrTxnId(e.target.value)}
                    placeholder={t?.transRefPlaceholder || 'ለምሳሌ፡ TLB89281924'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            )}

            {/* CBE Details Box */}
            {paymentMethod === 'cbe' && (
              <div className="bg-purple-50/50 rounded-xl p-4 border border-purple-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-purple-700 uppercase block">
                      {t?.cbeAccountNumber || 'የንግድ ባንክ የሂሳብ ቁጥር'}
                    </span>
                    <span className="font-mono text-base font-bold text-slate-900">1000 2489 31924</span>
                    <span className="text-[11px] text-slate-600 block mt-0.5">
                      {t?.cbeAccountName || 'ዲ.ኤ.ኤፍ ማተሚያ ቤት (D.A.F Printing Plc)'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('1000248931924', 'cbe')}
                    className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-purple-700 hover:bg-purple-100 flex items-center gap-1 font-semibold"
                  >
                    {copiedField === 'cbe' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'cbe' ? (language === 'am' ? 'ተቀድቷል' : 'Copied') : (language === 'am' ? 'ቅዳ' : 'Copy')}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    {t?.transRefLabel || 'የንግድ ባንክ የግብይት ቁጥር (FT ቁጥር) ያስገቡ'}:
                  </label>
                  <input
                    type="text"
                    required
                    value={cbeTxnId}
                    onChange={(e) => setCbeTxnId(e.target.value)}
                    placeholder="e.g. FT263019842"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#F58220] hover:bg-[#E07010] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-xs active:scale-95 disabled:opacity-50"
            >
              <span>{isSubmitting ? (language === 'am' ? 'በማረጋገጥ ላይ...' : 'Verifying...') : (t?.btnConfirmAndPay || 'ክፍያውን አረጋግጥ እና ጨርስ')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
