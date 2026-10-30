import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, Printer, ArrowLeft, ShieldCheck, Phone, FileText } from 'lucide-react';

export default function OrderVerificationScreen({
  order,
  onResetToNewOrder,
  onOpenAdminOrders,
  language = 'am',
  t
}) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 45 });

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePrintReceipt = () => {
    window.print();
  };

  const pName = language === 'am' && order.product?.nameAmharic ? order.product.nameAmharic : order.product?.name;
  const cName = language === 'am' && order.selectedColor?.nameAmharic ? order.selectedColor.nameAmharic : order.selectedColor?.name;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-fadeIn">
      {/* Top Success Banner with D.A.F Logo */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs text-center space-y-3">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-200 mx-auto shadow-xs">
          <img 
            src="/images/daf-logo-icon.jpg" 
            alt="D.A.F Printing Logo" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          {t?.verifiedBadge || 'ክፍያው ተረጋግጧል & ትዕዛዝዎ ጸድቋል'}
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          {t?.thankYouTitle || 'ዲ.ኤ.ኤፍ ማተሚያ ቤትን ስለመረጡ እናመሰግናለን!'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {language === 'am' 
            ? `ውድ ${order.customerName}፣ ያበጁት የህትመት ስራ ተቀብለን ወደ ዎርክሾፕ አስገብተናል።` 
            : `Dear ${order.customerName}, your custom print job has been scheduled for production.`}
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
          <div className="bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 font-mono">
            <span className="text-slate-500 mr-1.5">{t?.orderIdLabel || 'የትዕዛዝ ቁጥር'}:</span>
            <strong className="text-slate-900 font-bold">{order.orderId}</strong>
          </div>

          <div className="bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 font-mono">
            <span className="text-slate-500 mr-1.5">{language === 'am' ? 'የትራንዛክሽን ቁጥር፡' : 'Payment Ref:'}</span>
            <strong className="text-slate-900 font-bold">{order.transactionId}</strong>
          </div>
        </div>
      </div>

      {/* Guaranteed Delivery Time Box with Countdown */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center shrink-0 border border-orange-200">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-semibold block">
              {t?.guaranteedTimeLabel || 'የተረጋገጠ የርክክብ ሰዓት'}
            </span>
            <p className="text-sm font-bold text-slate-900">
              {order.estimatedDeliveryText}
            </p>
          </div>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-2 font-mono">
          <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center min-w-[50px]">
            <span className="text-lg font-bold text-slate-900">{timeLeft.hours}</span>
            <span className="text-[9px] text-slate-400 block uppercase">{language === 'am' ? 'ሰዓት' : 'hrs'}</span>
          </div>
          <span className="font-bold text-slate-400">:</span>
          <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center min-w-[50px]">
            <span className="text-lg font-bold text-slate-900">{timeLeft.minutes}</span>
            <span className="text-[9px] text-slate-400 block uppercase">{language === 'am' ? 'ደቂቃ' : 'min'}</span>
          </div>
          <span className="font-bold text-slate-400">:</span>
          <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center min-w-[50px]">
            <span className="text-lg font-bold text-[#F58220]">{timeLeft.seconds}</span>
            <span className="text-[9px] text-slate-400 block uppercase">{language === 'am' ? 'ሰከንድ' : 'sec'}</span>
          </div>
        </div>
      </div>

      {/* Printable Digital Receipt Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {t?.digitalReceiptTitle || 'ህጋዊ ዲጂታል የትዕዛዝ ደረሰኝ'}
            </h3>
            <p className="text-xs text-slate-500">
              ዲ.ኤ.ኤፍ ማተሚያ ቤት (D.A.F Printing Plc) • TIN: 0048192831
            </p>
          </div>

          <button
            onClick={handlePrintReceipt}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition border border-slate-200"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t?.printReceiptButton || 'ደረሰኝ አትም'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
          <div>
            <p><strong>{language === 'am' ? 'ደንበኛ፡' : 'Customer:'}</strong> {order.customerName}</p>
            <p><strong>{language === 'am' ? 'ስልክ፡' : 'Phone:'}</strong> {order.customerPhone}</p>
            <p><strong>{language === 'am' ? 'አድራሻ፡' : 'Address:'}</strong> {order.deliveryAddress}, {order.deliveryArea}</p>
          </div>
          <div>
            <p><strong>{language === 'am' ? 'ምርት፡' : 'Product:'}</strong> {order.quantity}x {pName} ({cName})</p>
            <p><strong>{language === 'am' ? 'የተከፈለበት መንገድ፡' : 'Payment Method:'}</strong> {order.paymentMethod?.toUpperCase()}</p>
            <p className="text-sm font-bold text-slate-900 mt-1">
              <strong>{language === 'am' ? 'ጠቅላላ የተከፈለ፡' : 'Total Paid:'}</strong> {order.totalAmount?.toLocaleString()} {language === 'am' ? 'ብር' : 'ETB'}
            </p>
          </div>
        </div>
      </div>

      {/* Return home button */}
      <div className="text-center pt-2">
        <button
          onClick={onResetToNewOrder}
          className="px-6 py-3 bg-[#F58220] hover:bg-[#E07010] text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition"
        >
          {t?.backHomeButton || 'አዲስ ትዕዛዝ ጀምር'}
        </button>
      </div>
    </div>
  );
}
