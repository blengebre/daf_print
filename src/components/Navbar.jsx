import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Printer, 
  Shield,
  Globe,
  Phone,
  ChevronRight,
  Clock,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function Navbar({
  currentView,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateReceiver,
  onSelectProduct,
  onOpenOrderTracker,
  onOpenAdminOrders,
  onOpenCustomerOrders,
  onOpenAuthModal,
  currentUser,
  orderCount = 0,
  language = 'am',
  onToggleLanguage,
  t
}) {
  const [isSlideDrawerOpen, setIsSlideDrawerOpen] = useState(false);
  const [quickTrackId, setQuickTrackId] = useState('');

  const handleQuickTrackSubmit = (e) => {
    e.preventDefault();
    if (!quickTrackId.trim()) return;
    setIsSlideDrawerOpen(false);
    onOpenOrderTracker(quickTrackId.trim());
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-orange-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] text-slate-800">
        {/* Sleek top 3D notice ticker */}
        <div className="bg-gradient-to-r from-orange-50/90 via-amber-50/70 to-orange-50/90 border-b border-orange-100/60 px-4 py-1.5 text-center text-xs text-slate-700 font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-[#F58220] shrink-0 animate-ping"></span>
              <span className="truncate text-[11px] sm:text-xs">
                {t?.topNotice || 'ዲ.ኤ.ኤፍ ማተሚያ ቤት (D.A.F Printing Plc) • ስልክ፡ 0930 07 74 32 / 09 1125 76 69'}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500 font-mono">
              <span>Bole, Addis Ababa</span>
              <span>•</span>
              <span className="text-[#C25E00] font-semibold">Telebirr & CBE Verified</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand: 3D Sphere Logo + Company Title */}
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            {/* 3D Sphere Logo Wrap with Specular Glow */}
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-[#F58220] to-[#C25E00] shadow-[0_6px_16px_rgba(245,130,32,0.35)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full rounded-full overflow-hidden bg-white border border-white/60 p-0.5">
                <img 
                  src="/images/daf-logo-icon.jpg" 
                  alt="D.A.F Printing Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/daf-full-logo.jpg';
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 font-sans group-hover:text-[#F58220] transition">
                  {language === 'am' ? 'ዲ.ኤ.ኤፍ ማተሚያ ቤት' : 'D.A.F Printing Plc'}
                </span>
                <span className="text-[10px] bg-orange-100 text-[#C25E00] border border-orange-200 px-1.5 py-0.2 rounded font-mono font-bold shadow-2xs">
                  {language === 'am' ? 'አዲስ አበባ' : 'Addis'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-normal">
                {language === 'am' ? '0930 07 74 32 • 09 1125 76 69' : 'Custom Merch & Printing Press'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={onNavigateHome}
              className={`hover:text-[#F58220] transition-colors relative py-1 ${
                currentView === 'home' 
                  ? 'text-[#F58220] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F58220] after:rounded-full' 
                  : ''
              }`}
            >
              {t?.navHome || 'Home'}
            </button>
            <button
              onClick={onNavigateCatalog}
              className={`hover:text-[#F58220] transition-colors relative py-1 ${
                currentView === 'catalog' 
                  ? 'text-[#F58220] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#F58220] after:rounded-full' 
                  : ''
              }`}
            >
              {t?.navCatalog || 'Products'}
            </button>

            {/* Dedicated Order Receiver Button with 3D Bevel */}
            <button
              onClick={onNavigateReceiver}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                currentView === 'receiver'
                  ? 'bg-gradient-to-r from-[#F58220] to-[#E07010] text-white shadow-[0_4px_12px_rgba(245,130,32,0.3)]'
                  : 'bg-orange-50/80 hover:bg-orange-100 text-[#C25E00] border border-orange-200/90 shadow-2xs'
              }`}
            >
              <Printer className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{t?.navReceiver || 'Order Receiver Page'}</span>
              {orderCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  currentView === 'receiver' ? 'bg-white text-[#F58220]' : 'bg-[#F58220] text-white'
                }`}>
                  {orderCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Actions: 3D Language Toggle + 3D Slide Drawer Toggle Button */}
          <div className="flex items-center gap-2.5">
            {/* 3D Language Switcher Pill */}
            <button
              onClick={onToggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50/80 text-[#C25E00] text-xs font-bold flex items-center gap-1.5 transition border border-orange-200 shadow-[0_2px_8px_-2px_rgba(245,130,32,0.15)] active:translate-y-0.5"
              title="ቋንቋ ቀይር / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{language === 'am' ? 'English' : 'አማርኛ'}</span>
            </button>

            {/* 3D Slide-Out Sidebar Toggle Button */}
            <button
              onClick={() => setIsSlideDrawerOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-b from-white to-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-2 transition-all border border-slate-200 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] active:translate-y-0.5 group"
              title="Open Navigation Menu & Tracker"
            >
              <Menu className="w-4 h-4 text-[#F58220] group-hover:scale-110 transition" />
              <span className="hidden sm:inline">
                {language === 'am' ? 'ማውጫ' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 3D TOGGLE SLIDE BAR (SLIDE-OUT DRAWER FROM RIGHT) */}
      {isSlideDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn">
          {/* Backdrop */}
          <div 
            onClick={() => setIsSlideDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          />

          {/* Slide Bar Content Panel (3D Depth & Glassmorphism) */}
          <aside className="relative w-full max-w-sm bg-white h-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border-l border-slate-200 flex flex-col z-10 animate-slide-in-right overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-5 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/60 border-b border-orange-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-300 shadow-xs bg-white">
                  <img 
                    src="/images/daf-logo-icon.jpg" 
                    alt="D.A.F Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {language === 'am' ? 'ዲ.ኤ.ኤፍ ማተሚያ ቤት' : 'D.A.F Printing Plc'}
                  </h3>
                  <p className="text-[10px] text-[#C25E00] font-mono">
                    {language === 'am' ? 'ፈጣን የህትመት ማውጫ' : 'Navigation & Services'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSlideDrawerOpen(false)}
                className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition border border-slate-200 shadow-2xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 space-y-6 flex-1">
              {/* 1. TRACK ORDER SECTION (Moved here as requested: "in top bar remove track order make it in to add in toogle slide bar") */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 via-white to-amber-50/70 border border-orange-200 shadow-sm space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Search className="w-4 h-4 text-[#F58220]" />
                  <span>{t?.trackerModalTitle || 'ትዕዛዝ መከታተያ (Track Order)'}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {language === 'am' 
                    ? 'የትዕዛዝ መለያ ቁጥርዎን ወይም ስልክዎን በማስገባት ህትመቱ የደረሰበትን ደረጃ ይመልከቱ' 
                    : 'Enter your Order Tracking ID or phone to inspect live production & arrival time'}
                </p>

                <form onSubmit={handleQuickTrackSubmit} className="flex gap-1.5 pt-1">
                  <input
                    type="text"
                    value={quickTrackId}
                    onChange={(e) => setQuickTrackId(e.target.value)}
                    placeholder="ETH-PRNT-XXXX"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#F58220] hover:bg-[#E07010] text-white text-xs font-bold rounded-xl shadow-xs transition"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                <button
                  type="button"
                  onClick={() => {
                    setIsSlideDrawerOpen(false);
                    onOpenOrderTracker();
                  }}
                  className="w-full text-center text-[11px] text-[#C25E00] font-semibold hover:underline block pt-1"
                >
                  {language === 'am' ? 'ሙሉ የመከታተያ መስኮት ክፈት →' : 'Open Detailed Tracker Modal →'}
                </button>
              </div>

              {/* 2. MAIN NAVIGATION SHORTCUTS */}
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  {language === 'am' ? 'ገጾች እና ክፍሎች' : 'Pages & Portals'}
                </p>

                <button
                  onClick={() => { onNavigateHome(); setIsSlideDrawerOpen(false); }}
                  className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition ${
                    currentView === 'home'
                      ? 'bg-orange-50 text-[#C25E00] border border-orange-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#F58220]" />
                    <span>{t?.navHome || 'መነሻ ገጽ (Home)'}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={() => { onNavigateCatalog(); setIsSlideDrawerOpen(false); }}
                  className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition ${
                    currentView === 'catalog'
                      ? 'bg-orange-50 text-[#C25E00] border border-orange-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-slate-500" />
                    <span>{t?.navCatalog || 'ምርቶች (Product Catalog)'}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Receiver Terminal */}
                <button
                  onClick={() => { onNavigateReceiver(); setIsSlideDrawerOpen(false); }}
                  className={`w-full p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between transition ${
                    currentView === 'receiver'
                      ? 'bg-[#F58220] text-white shadow-xs'
                      : 'bg-orange-50/70 hover:bg-orange-100 text-[#C25E00] border border-orange-200'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Printer className="w-4 h-4" />
                    <span>{t?.navReceiver || 'የትዕዛዝ መቀበያ ገጽ (Receiver Terminal)'}</span>
                  </span>
                  {orderCount > 0 && (
                    <span className="bg-[#F58220] text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {orderCount}
                    </span>
                  )}
                </button>

                {/* Admin Portal */}
                <button
                  onClick={() => { onOpenAdminOrders(); setIsSlideDrawerOpen(false); }}
                  className="w-full p-3 rounded-xl text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-slate-500" />
                    <span>{t?.navAdmin || 'የአስተዳዳሪ ክፍል (Admin Portal)'}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* My Orders */}
                <button
                  onClick={() => { onOpenCustomerOrders(); setIsSlideDrawerOpen(false); }}
                  className="w-full p-3 rounded-xl text-left text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between transition"
                >
                  <span className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>{t?.navMyOrders || 'የታዘዙ እቃዎች (My Orders)'}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* 3. DIRECT CONTACT & BANKING CALLOUT */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>{language === 'am' ? 'ቀጥታ የስራ መስመር' : 'Direct Call & WhatsApp'}</span>
                </p>
                <div className="font-mono text-[11px] text-slate-600 space-y-0.5">
                  <p>0930 07 74 32</p>
                  <p>09 1125 76 69</p>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                  <p>Telebirr: <strong>0930077432</strong></p>
                  <p>CBE: <strong>1000 2489 31924</strong></p>
                </div>
              </div>
            </div>

            {/* Drawer Footer with Language Switcher */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={onToggleLanguage}
                className="w-full py-2 px-3 rounded-xl bg-white border border-orange-200 text-[#C25E00] text-xs font-bold flex items-center justify-center gap-2 shadow-2xs hover:bg-orange-50"
              >
                <Globe className="w-3.5 h-3.5 text-[#F58220]" />
                <span>{language === 'am' ? 'Switch to English' : 'ወደ አማርኛ ቀይር'}</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
