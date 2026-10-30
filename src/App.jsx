import React, { useState } from 'react';
import { PRODUCTS, URGENCY_TIERS, BULK_TIERS } from './data/products';
import { INITIAL_USERS } from './data/users';
import { solveArtworkProportion } from './utils/aiProportionEngine';
import { TRANSLATIONS } from './i18n/translations';

import Navbar from './components/Navbar';
import HomeHeroSection from './components/HomeHeroSection';
import ProductCatalogSection from './components/ProductCatalogSection';
import ProductDetailStudio from './components/ProductDetailStudio';
import OrderReceiverPage from './components/OrderReceiverPage';
import AuthModal from './components/AuthModal';
import AdminPortalModal from './components/AdminPortalModal';
import CustomerOrdersModal from './components/CustomerOrdersModal';
import ImageSearchModal from './components/ImageSearchModal';
import PaymentCheckoutModal from './components/PaymentCheckoutModal';
import OrderVerificationScreen from './components/OrderVerificationScreen';
import OrderTrackerModal from './components/OrderTrackerModal';

export default function App() {
  // Navigation View: 'home' | 'detail' | 'receiver' | 'confirmed'
  const [currentView, setCurrentView] = useState('home');

  // Language state (default 'am' as requested, with instant toggle)
  const [language, setLanguage] = useState('am');
  const t = TRANSLATIONS[language] || TRANSLATIONS.am;

  const handleToggleLanguage = () => {
    setLanguage(prev => prev === 'am' ? 'en' : 'am');
  };

  // User Authentication State (Default: Abebe Kebede as Customer)
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS[0]);

  // Product Catalog State (dynamic so admin can adjust base prices)
  const [productsList, setProductsList] = useState(PRODUCTS);

  // Selected Product & Customizer State
  const [selectedProductId, setSelectedProductId] = useState('tshirt');
  const activeProduct = productsList.find(p => p.id === selectedProductId) || productsList[0];
  const [selectedColor, setSelectedColor] = useState(activeProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState(activeProduct.sizes[1] || activeProduct.sizes[0]);

  // Stamp specifics
  const [stampInkColor, setStampInkColor] = useState(activeProduct.inkColors ? activeProduct.inkColors[0].hex : '#1D4ED8');
  const [stampShape, setStampShape] = useState('circle');

  // Custom Text & Typography
  const [customText, setCustomText] = useState('ETHIOPIA 2026');
  const [textFont, setTextFont] = useState('display');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [textSize, setTextSize] = useState(26);

  // Artwork & Image (Upload, Search or URL Link)
  const [imageSrc, setImageSrc] = useState('https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=500&q=80'); // Lion placeholder
  const [imageTitle, setImageTitle] = useState('Lion of Judah Crest');
  const [imageScale, setImageScale] = useState(90);
  const [imageRotation, setImageRotation] = useState(0);
  const [imagePos, setImagePos] = useState({ x: 0, y: -10 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [removeWhiteBg, setRemoveWhiteBg] = useState(false);

  // AI Proportion & Auto-Fit Engine State
  const [aiReport, setAiReport] = useState(null);
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);

  // Quantity & Delivery Urgency State
  const [quantity, setQuantity] = useState(activeProduct.minQty || 1);
  const [selectedUrgency, setSelectedUrgency] = useState(URGENCY_TIERS[0]);
  const [targetDeliveryDate, setTargetDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });

  // Modal Visibility States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isCustomerOrdersOpen, setIsCustomerOrdersOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [trackerQuery, setTrackerQuery] = useState('');

  // Confirmed Order payload
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Initial Orders List with rich demo orders for testing
  const [ordersList, setOrdersList] = useState([
    {
      orderId: 'ETH-PRNT-1024',
      customerName: 'Alemayehu Tadesse',
      customerPhone: '0911883344',
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].colors[1], // Black
      selectedSize: 'XL',
      quantity: 25,
      totalAmount: 10420,
      paymentMethod: 'telebirr',
      transactionId: 'TLB99281744',
      deliveryArea: 'Bole, Addis Ababa',
      deliveryAddress: 'Near Edna Mall, Lex Plaza 4th Fl.',
      selectedUrgency: URGENCY_TIERS[1],
      estimatedDeliveryText: 'Tomorrow at 3:00 PM',
      orderStatus: 'In Printing',
      paidAt: '2026-10-30T06:30:00Z',
      customText: 'ETHIOPIA TECH SUMMIT',
      textFont: 'display',
      textColor: '#FFFFFF',
      textSize: 26,
      imageSrc: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=500&q=80',
      imageTitle: 'Lion of Judah Crest',
      imageScale: 90,
      imageRotation: 0,
      imagePos: { x: 0, y: -10 },
      isFlipped: false
    },
    {
      orderId: 'ETH-PRNT-8812',
      customerName: 'Bethlehem Haile',
      customerPhone: '0922119900',
      product: PRODUCTS[1], // Mug
      selectedColor: PRODUCTS[1].colors[0], // White
      selectedSize: 'Standard 11 oz (325 ml)',
      quantity: 12,
      totalAmount: 3120,
      paymentMethod: 'cbe',
      transactionId: 'FT263019842',
      deliveryArea: 'Kazanchis, Addis Ababa',
      deliveryAddress: 'Intercontinental Hotel area',
      selectedUrgency: URGENCY_TIERS[2], // Urgent Rush
      estimatedDeliveryText: 'Today within 6 Hours (Urgent Express)',
      orderStatus: 'Confirmed & Payment Verified',
      paidAt: '2026-10-30T07:15:00Z',
      customText: 'MORNING BUNA & CODE',
      textFont: 'script',
      textColor: '#18181B',
      textSize: 22,
      imageSrc: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
      imageTitle: 'Ethiopian Jebena',
      imageScale: 85,
      imageRotation: 0,
      imagePos: { x: 0, y: 5 },
      isFlipped: false
    },
    {
      orderId: 'ETH-PRNT-5541',
      customerName: 'Abebe Kebede',
      customerPhone: '0911234567',
      product: PRODUCTS[2], // Stamp
      selectedColor: PRODUCTS[2].colors[0],
      selectedSize: 'Circular 42mm',
      quantity: 2,
      totalAmount: 700,
      paymentMethod: 'telebirr',
      transactionId: 'TLB44910281',
      deliveryArea: 'Bole, Addis Ababa',
      deliveryAddress: 'Morning Star Mall 2nd Fl.',
      selectedUrgency: URGENCY_TIERS[0],
      estimatedDeliveryText: 'In 3 Business Days',
      orderStatus: 'Pre-Press Approved',
      paidAt: '2026-10-30T07:25:00Z',
      customText: 'VERIFIED TRADING PLC',
      textFont: 'stamp',
      textColor: '#1D4ED8',
      textSize: 18,
      stampInkColor: '#1D4ED8',
      stampShape: 'circle',
      imageSrc: '',
      imageScale: 90,
      imageRotation: 0,
      imagePos: { x: 0, y: 0 }
    }
  ]);

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    if (user.role === 'receiver') {
      setCurrentView('receiver');
    } else if (user.role === 'admin') {
      setIsAdminPortalOpen(true);
    }
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    if (user.role === 'receiver') {
      setCurrentView('receiver');
    } else if (user.role === 'admin') {
      setIsAdminPortalOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  // Price adjustment handler (Admin capability)
  const handleUpdateProductPrice = (prodId, newPrice) => {
    setProductsList(prev => prev.map(p => p.id === prodId ? { ...p, basePrice: newPrice } : p));
  };

  // Navigate to product detail customizer
  const handleSelectProductToCustomize = (prodId) => {
    const prod = productsList.find(p => p.id === prodId);
    if (!prod) return;
    setSelectedProductId(prodId);
    setSelectedColor(prod.colors[0]);
    setSelectedSize(prod.sizes[0]);
    setQuantity(prod.minQty || 1);
    setImageScale(prod.defaultScale || 100);
    setImagePos({ x: 0, y: 0 });

    if (prod.colors[0].isDark) {
      setTextColor('#FFFFFF');
    } else {
      setTextColor('#18181B');
    }

    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    runAiProportionSolver(prod, prod.colors[0]);
  };

  // Color change handler
  const handleSelectColor = (color) => {
    setSelectedColor(color);
    if (color.isDark && (textColor === '#18181B' || textColor === '#000000')) {
      setTextColor('#FFFFFF');
    } else if (!color.isDark && textColor === '#FFFFFF') {
      setTextColor('#18181B');
    }
  };

  // AI Auto-Proportion Runner
  const runAiProportionSolver = (prod = activeProduct, col = selectedColor) => {
    setIsAiOptimizing(true);
    setTimeout(() => {
      const result = solveArtworkProportion({
        product: prod,
        selectedColor: col,
        imageNaturalWidth: 400,
        imageNaturalHeight: 400,
        hasImage: !!imageSrc,
        customText,
        currentScale: imageScale
      });

      setAiReport(result);
      setImageScale(result.recommendedScale);
      setImagePos({ x: result.recommendedX, y: result.recommendedY });
      if (result.suggestedTextColor) {
        setTextColor(result.suggestedTextColor);
      }
      setIsAiOptimizing(false);
    }, 450);
  };

  // Local File Upload handler
  const handleLocalFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImageSrc(dataUrl);
      setImageTitle(file.name);
      runAiProportionSolver();
    };
    reader.readAsDataURL(file);
  };

  // Searched Image selection handler
  const handleSelectSearchedImage = (url, title) => {
    setImageSrc(url);
    setImageTitle(title || 'Selected Graphic');
    runAiProportionSolver();
  };

  // Delivery Promise Text calculation
  const getDeliveryPromiseText = () => {
    const dateObj = new Date(targetDeliveryDate);
    const dateFormatted = dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    if (language === 'am') {
      if (selectedUrgency.id === 'super_urgent') {
        return `ዛሬ / በ 24 ሰዓት ውስጥ ከቀኑ 11:30 (በጣም አስቸኳይ)`;
      } else if (selectedUrgency.id === 'priority') {
        return `${dateFormatted} ከቀኑ 8:00 (አስቸኳይ ቅድሚያ)`;
      } else {
        return `${dateFormatted} ከቀኑ 10:00 (መደበኛ)`;
      }
    }

    if (selectedUrgency.id === 'super_urgent') {
      return `Today / Within 24h by 5:30 PM (Express Rush)`;
    } else if (selectedUrgency.id === 'priority') {
      return `${dateFormatted} at 2:00 PM (Priority Fast-Track)`;
    } else {
      return `${dateFormatted} at 4:00 PM (Standard)`;
    }
  };

  // Dynamic Pricing Calculations
  const baseSubtotal = activeProduct.basePrice * quantity;
  const currentBulkTier = BULK_TIERS.find(t => quantity >= t.min && quantity <= t.max) || BULK_TIERS[0];
  const bulkDiscountAmount = Math.round(baseSubtotal * currentBulkTier.discount);
  const discountedSubtotal = baseSubtotal - bulkDiscountAmount;
  const urgencyFeeAmount = Math.round(discountedSubtotal * (selectedUrgency.percentage / 100));
  const grandTotal = discountedSubtotal + urgencyFeeAmount;

  // Complete Order Handler
  const handleCompleteOrder = (orderPayload) => {
    setOrdersList([orderPayload, ...ordersList]);
    setConfirmedOrder(orderPayload);
    setIsCheckoutModalOpen(false);
    setCurrentView('confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order Status Update (usable by receiver & admin)
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prev => prev.map(o => o.orderId === orderId ? { ...o, orderStatus: newStatus } : o));
    if (confirmedOrder && confirmedOrder.orderId === orderId) {
      setConfirmedOrder(prev => ({ ...prev, orderStatus: newStatus }));
    }
  };

  // Order Design Save/Edit Handler (Receiver Pre-Press Editing)
  const handleSaveOrderDesign = (orderId, updatedFields) => {
    setOrdersList(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          ...updatedFields,
          wasEditedByReceiver: true,
          lastEditedAt: new Date().toISOString()
        };
      }
      return o;
    }));
    if (confirmedOrder && confirmedOrder.orderId === orderId) {
      setConfirmedOrder(prev => ({
        ...prev,
        ...updatedFields,
        wasEditedByReceiver: true,
        lastEditedAt: new Date().toISOString()
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Top Navbar with Auth & Role Switcher */}
      <Navbar
        currentView={currentView}
        onNavigateHome={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateCatalog={() => {
          setCurrentView('home');
          setTimeout(() => {
            const el = document.getElementById('products-catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        onNavigateReceiver={() => {
          setCurrentView('receiver');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectProduct={(prodId) => handleSelectProductToCustomize(prodId)}
        onOpenOrderTracker={(q) => {
          setTrackerQuery(q || '');
          setIsTrackerModalOpen(true);
        }}
        onOpenAdminOrders={() => setIsAdminPortalOpen(true)}
        onOpenCustomerOrders={() => setIsCustomerOrdersOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
        orderCount={ordersList.length}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        t={t}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* VIEW 1: HOME PAGE (Hero + 3 Steps + Product Catalog) */}
        {currentView === 'home' && (
          <div className="space-y-16">
            <HomeHeroSection
              onExploreProducts={() => {
                const el = document.getElementById('products-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenTracker={() => setIsTrackerModalOpen(true)}
              language={language}
              t={t}
            />

            <ProductCatalogSection
              products={productsList}
              onSelectProductToCustomize={handleSelectProductToCustomize}
              language={language}
              t={t}
            />
          </div>
        )}

        {/* VIEW 2: PRODUCT DETAIL & MOCKUP STUDIO */}
        {currentView === 'detail' && (
          <ProductDetailStudio
            product={activeProduct}
            selectedColor={selectedColor}
            onSelectColor={handleSelectColor}
            selectedSize={selectedSize}
            onSelectSize={(s) => setSelectedSize(s)}
            customText={customText}
            onChangeCustomText={(txt) => setCustomText(txt)}
            textFont={textFont}
            onChangeTextFont={(f) => setTextFont(f)}
            textColor={textColor}
            onChangeTextColor={(c) => setTextColor(c)}
            textSize={textSize}
            onChangeTextSize={(sz) => setTextSize(sz)}
            imageSrc={imageSrc}
            imageTitle={imageTitle}
            imageScale={imageScale}
            imageRotation={imageRotation}
            imagePos={imagePos}
            isFlipped={isFlipped}
            removeWhiteBg={removeWhiteBg}
            onToggleRemoveWhiteBg={() => setRemoveWhiteBg(!removeWhiteBg)}
            stampInkColor={stampInkColor}
            onChangeStampInkColor={(hex) => setStampInkColor(hex)}
            stampShape={stampShape}
            onChangeStampShape={(sh) => setStampShape(sh)}
            onUpdateTransform={(updates) => {
              if (updates.scale !== undefined) setImageScale(updates.scale);
              if (updates.rotation !== undefined) setImageRotation(updates.rotation);
              if (updates.isFlipped !== undefined) setIsFlipped(updates.isFlipped);
              if (updates.x !== undefined && updates.y !== undefined) setImagePos({ x: updates.x, y: updates.y });
            }}
            onResetTransform={() => {
              setImageScale(activeProduct.defaultScale || 100);
              setImageRotation(0);
              setImagePos({ x: 0, y: 0 });
              setIsFlipped(false);
            }}
            onTriggerAiFit={() => runAiProportionSolver()}
            isAiOptimizing={isAiOptimizing}
            aiReport={aiReport}
            onOpenSearchModal={() => setIsSearchModalOpen(true)}
            onUploadFile={handleLocalFileUpload}
            onRemoveImage={() => { setImageSrc(''); setImageTitle(''); }}
            selectedUrgency={selectedUrgency}
            onSelectUrgency={(tier) => setSelectedUrgency(tier)}
            targetDeliveryDate={targetDeliveryDate}
            onTargetDateChange={(dt) => setTargetDeliveryDate(dt)}
            estimatedDeliveryText={getDeliveryPromiseText()}
            quantity={quantity}
            onQuantityChange={(q) => setQuantity(q)}
            baseSubtotal={baseSubtotal}
            bulkDiscountAmount={bulkDiscountAmount}
            urgencyFeeAmount={urgencyFeeAmount}
            grandTotal={grandTotal}
            currentBulkTier={currentBulkTier}
            onOpenCheckout={() => setIsCheckoutModalOpen(true)}
            onBackToCatalog={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={language}
            t={t}
          />
        )}

        {/* VIEW 3: THE ONE WHO RECEIVE THE ORDER PAGE (ORDER RECEIVER PORTAL) */}
        {currentView === 'receiver' && (
          <OrderReceiverPage
            orders={ordersList}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSaveOrderDesign={handleSaveOrderDesign}
            onOpenSearchModal={() => setIsSearchModalOpen(true)}
            currentUser={currentUser}
            onNavigateHome={() => setCurrentView('home')}
            language={language}
            t={t}
          />
        )}

        {/* VIEW 4: ORDER CONFIRMATION & RECEIPT COUNTDOWN */}
        {currentView === 'confirmed' && confirmedOrder && (
          <OrderVerificationScreen
            order={confirmedOrder}
            onResetToNewOrder={() => {
              setCurrentView('home');
              setConfirmedOrder(null);
            }}
            onOpenAdminOrders={() => setIsAdminPortalOpen(true)}
            language={language}
            t={t}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-white text-slate-500 border-t border-slate-200 py-10 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-slate-900 font-bold text-sm">
              {t?.footerCompanyName || 'ዲ.ኤ.ኤፍ ማተሚያ ቤት (D.A.F Printing Plc)'}
            </p>
            <p className="text-slate-500">
              Commercial Registration: 1489201 • Tax TIN: 0048192831 • Addis Ababa, Ethiopia
            </p>
            <p className="text-slate-600 font-medium">
              {t?.footerContact || 'ቀጥታ የስራ ጥያቄዎች እና የጅምላ ትዕዛዝ፡ 0930 07 74 32 / 09 1125 76 69'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200 font-semibold text-[#C25E00]">
              Telebirr: 0930077432
            </span>
            <span className="bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200 font-semibold text-purple-700">
              CBE Acc: 1000248931924
            </span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <AdminPortalModal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        orders={ordersList}
        products={productsList}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onUpdateProductPrice={handleUpdateProductPrice}
      />

      <CustomerOrdersModal
        isOpen={isCustomerOrdersOpen}
        onClose={() => setIsCustomerOrdersOpen(false)}
        currentUser={currentUser}
        orders={ordersList}
        onSelectOrder={(ord) => {
          setConfirmedOrder(ord);
          setCurrentView('confirmed');
        }}
      />

      <ImageSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectImage={handleSelectSearchedImage}
        onUploadFile={handleLocalFileUpload}
      />

      <PaymentCheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        currentUser={currentUser}
        orderData={{
          product: activeProduct,
          selectedColor,
          selectedSize,
          quantity,
          customText,
          textFont,
          textColor,
          textSize,
          imageSrc,
          imageTitle,
          imageScale,
          imageRotation,
          imagePos,
          isFlipped,
          removeWhiteBg,
          stampInkColor,
          stampShape,
          baseSubtotal,
          bulkDiscountAmount,
          urgencyFeeAmount,
          totalAmount: grandTotal,
          selectedUrgency,
          estimatedDeliveryText: getDeliveryPromiseText()
        }}
        onCompleteOrder={handleCompleteOrder}
        language={language}
        t={t}
      />

      <OrderTrackerModal
        isOpen={isTrackerModalOpen}
        onClose={() => {
          setIsTrackerModalOpen(false);
          setTrackerQuery('');
        }}
        orders={ordersList}
        onSelectFoundOrder={(ord) => {
          setConfirmedOrder(ord);
          setCurrentView('confirmed');
        }}
        language={language}
        t={t}
        initialQuery={trackerQuery}
      />
    </div>
  );
}
