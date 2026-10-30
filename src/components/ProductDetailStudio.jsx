import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Type, 
  Search, 
  Upload, 
  Palette, 
  Clock, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  RotateCw,
  FlipHorizontal,
  Sliders,
  Image as ImageIcon
} from 'lucide-react';
import MockupCanvas from './MockupCanvas';
import DeliveryUrgencySelector from './DeliveryUrgencySelector';
import { FONT_OPTIONS } from '../data/artLibrary';

export default function ProductDetailStudio({
  product,
  selectedColor,
  onSelectColor,
  selectedSize,
  onSelectSize,
  customText,
  onChangeCustomText,
  textFont,
  onChangeTextFont,
  textColor,
  onChangeTextColor,
  textSize,
  onChangeTextSize,
  imageSrc,
  imageTitle,
  imageScale,
  imageRotation,
  imagePos,
  isFlipped,
  removeWhiteBg,
  onToggleRemoveWhiteBg,
  stampInkColor,
  onChangeStampInkColor,
  stampShape,
  onChangeStampShape,
  onUpdateTransform,
  onResetTransform,
  onTriggerAiFit,
  isAiOptimizing,
  aiReport,
  onOpenSearchModal,
  onUploadFile,
  onRemoveImage,
  selectedUrgency,
  onSelectUrgency,
  targetDeliveryDate,
  onTargetDateChange,
  estimatedDeliveryText,
  quantity,
  onQuantityChange,
  baseSubtotal,
  bulkDiscountAmount,
  urgencyFeeAmount,
  grandTotal,
  currentBulkTier,
  onOpenCheckout,
  onBackToCatalog,
  language = 'am',
  t
}) {
  const productName = language === 'am' && product.nameAmharic ? product.nameAmharic : product.name;
  const colorName = language === 'am' && selectedColor.nameAmharic ? selectedColor.nameAmharic : selectedColor.name;

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Breadcrumb & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-orange-50 text-slate-700 hover:text-[#C25E00] text-xs font-semibold border border-slate-200 transition shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t?.backToCatalog || '← ወደ ምርቶች ዝርዝር ተመለስ'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>{t?.navCatalog || 'ምርቶች'}</span>
          <span>/</span>
          <strong className="text-slate-900 font-bold">{productName}</strong>
          <span>•</span>
          <span className="font-mono text-[#F58220] font-bold">
            {product.basePrice} {language === 'am' ? 'ብር' : 'ETB'}
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: LIVE MOCKUP PREVIEW (Sticky) */}
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-20">
          <div className="flex items-center justify-between px-1 text-xs text-slate-600">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F58220]"></span>
              {t?.liveMockup || 'የምርቱ ቀጥታ እይታ (ላይቭ ሞክአፕ)'}
            </span>
            <span className="text-slate-500">
              {t?.productColorLabel || 'ቀለም'}: <strong className="text-slate-800 font-semibold">{colorName}</strong>
            </span>
          </div>

          {/* Canvas Component */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-2">
            <MockupCanvas
              product={product}
              selectedColor={selectedColor}
              customText={customText}
              textFont={textFont}
              textColor={textColor}
              textSize={textSize}
              imageSrc={imageSrc}
              imageScale={imageScale}
              imageRotation={imageRotation}
              imagePos={imagePos}
              isFlipped={isFlipped}
              removeWhiteBg={removeWhiteBg}
              inkColor={stampInkColor}
              stampShape={stampShape}
              onUpdateTransform={onUpdateTransform}
              onResetTransform={onResetTransform}
              onTriggerAiFit={onTriggerAiFit}
              isAiOptimizing={isAiOptimizing}
              language={language}
              t={t}
            />
          </div>

          {/* Clean Light AI Auto-Fit Banner */}
          <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <p className="font-bold text-slate-900 flex items-center gap-1.5 justify-center sm:justify-start">
                <Sparkles className="w-4 h-4 text-[#F58220]" />
                <span>{t?.aiTitle || 'ስማርት AI አቀማመጥ አስተካካይ'}</span>
              </p>
              <p className="text-slate-600">
                {t?.aiDesc || 'የምስሉን መጠን፣ መሃል አቀማመጥ እና የቀለም ንፅፅር ለህትመት ተስማሚ እንዲሆን በራሱ ይፈታል።'}
              </p>
            </div>

            <button
              onClick={onTriggerAiFit}
              disabled={isAiOptimizing}
              className="px-4 py-2.5 bg-[#F58220] hover:bg-[#E07010] text-white font-semibold rounded-xl text-xs transition active:scale-95 shrink-0 shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAiOptimizing ? (language === 'am' ? 'በማስላት ላይ...' : 'Fitting...') : (t?.aiButton || 'አቀማመጥ አስተካክል')}</span>
            </button>
          </div>

          {/* AI Pre-press safe check pill */}
          {aiReport && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>{language === 'am' ? 'ለህትመት ዝግጁ፡' : 'Pre-Press Ready:'}</strong> {aiReport.ratioNotes}
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                300 DPI Safe
              </span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: STEP-BY-STEP CUSTOMIZATION */}
        <div className="lg:col-span-6 space-y-4">
          {/* STEP 1: WHAT TO WRITE ON IT */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#F58220] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                  1
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {t?.step1TextTitle || 'ደረጃ 1፡ የሚጻፈውን ጽሁፍ ያስገቡ'}
                </h3>
              </div>

              {customText && (
                <button
                  onClick={() => onChangeCustomText('')}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  {language === 'am' ? 'አጽዳ' : 'Clear'}
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500">
              {t?.step1TextSubtitle || 'በምርቱ ላይ እንዲታተም የሚፈልጉትን መልዕክት ወይም የድርጅት ስም ይጻፉ'}
            </p>

            <div>
              <input
                type="text"
                value={customText}
                onChange={(e) => onChangeCustomText(e.target.value)}
                placeholder={t?.customTextPlaceholder || 'ለምሳሌ፡ ዲ.ኤ.ኤፍ ማተሚያ ቤት 2026'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm text-slate-900 bg-white"
              />
            </div>

            {/* Quick Styling: Font & Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t?.fontStyleLabel || 'የፊደል ቅርጽ (ፎንት)'}:
                </label>
                <select
                  value={textFont}
                  onChange={(e) => onChangeTextFont(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ethiopic">የግዕዝ እና አማርኛ ፊደል (Ge'ez / Amharic)</option>
                  <option value="display">ደማቅ ፊደል (Display Bold)</option>
                  <option value="serif">ክላሲክ ሰሪፍ (Classic Serif)</option>
                  <option value="script">የእጅ ጽሁፍ (Script)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t?.textColorLabel || 'የጽሁፍ ቀለም'}:
                </label>
                <div className="flex items-center gap-2">
                  {['#FFFFFF', '#18181B', '#F58220', '#DC2626', '#1E40AF'].map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => onChangeTextColor(hex)}
                      className={`w-6 h-6 rounded-full border transition ${
                        textColor === hex ? 'ring-2 ring-[#F58220] scale-105 border-[#F58220]' : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => onChangeTextColor(e.target.value)}
                    className="w-6 h-6 rounded-md cursor-pointer ml-auto border border-slate-300"
                    title={language === 'am' ? 'ተጨማሪ ቀለም ምረጥ' : 'Choose custom color'}
                  />
                </div>
              </div>
            </div>

            {/* Text Size Slider */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-600 font-medium">
                {t?.textSizeLabel || 'የጽሁፍ መጠን'}: <strong className="text-slate-800">{textSize} pt</strong>
              </span>
              <input
                type="range"
                min="14"
                max="56"
                value={textSize}
                onChange={(e) => onChangeTextSize(Number(e.target.value))}
                className="w-32 accent-[#F58220]"
              />
            </div>
          </div>

          {/* STEP 2: ADD PICTURE / SEARCH BESIDE */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#F58220] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                  2
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {t?.step2ArtTitle || 'ደረጃ 2፡ ፎቶ፣ አርማ ወይም ምስል ያስገቡ'}
                </h3>
              </div>

              {imageSrc && (
                <button
                  onClick={onRemoveImage}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  {t?.btnRemoveImage || 'ፎቶውን አስወግድ'}
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500">
              {t?.step2ArtSubtitle || 'ፎቶዎን ከስልክ/ኮምፒውተር ይጫኑ፣ ከጎኑ ካለው የኢትዮጵያ ምስሎች ቤተ-መጽሐፍት ይምረጡ ወይም የፎቶ ሊንክ ያስገቡ'}
            </p>

            {/* Currently Active Picture Preview */}
            {imageSrc ? (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white p-1 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                    <img src={imageSrc} alt="Thumbnail" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 truncate max-w-[160px]">{imageTitle || 'Selected Graphic'}</p>
                    <p className="text-[11px] text-emerald-600">✓ {language === 'am' ? 'በምርቱ ላይ ተቀምጧል' : 'Placed on mockup'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onToggleRemoveWhiteBg}
                    className={`px-2 py-1 text-xs rounded-lg transition font-medium ${
                      removeWhiteBg ? 'bg-[#F58220] text-white' : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {language === 'am' ? 'ነጭ አጥፋ' : 'Filter BG'}
                  </button>
                  <button
                    onClick={onOpenSearchModal}
                    className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-orange-50 hover:text-[#C25E00]"
                  >
                    {language === 'am' ? 'ቀይር' : 'Change'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-100 text-xs text-slate-600 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#F58220]" />
                <span>{t?.noImageChosen || 'ምንም ምስል አልተመረጠም፤ ከታች ካሉት አማራጮች አንዱን ይምረጡ'}</span>
              </div>
            )}

            {/* Image Controls if Image Exists */}
            {imageSrc && (
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-600 font-medium block mb-1">
                    {t?.scaleLabel || 'የምስል ስፋት'}: {imageScale}%
                  </span>
                  <input
                    type="range"
                    min="30"
                    max="220"
                    value={imageScale}
                    onChange={(e) => onUpdateTransform({ scale: Number(e.target.value) })}
                    className="w-full accent-[#F58220]"
                  />
                </div>

                <div className="flex items-end justify-end gap-1.5">
                  <button
                    onClick={() => onUpdateTransform({ rotation: (imageRotation + 45) % 360 })}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1"
                    title={t?.rotationLabel || 'አዙር'}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>45°</span>
                  </button>
                  <button
                    onClick={() => onUpdateTransform({ isFlipped: !isFlipped })}
                    className={`p-2 rounded-lg border flex items-center gap-1 transition ${
                      isFlipped ? 'bg-[#F58220] text-white border-[#F58220]' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    title={t?.btnFlip || 'ገልብጥ'}
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Two Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={onOpenSearchModal}
                className="py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#C25E00] border border-orange-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Search className="w-3.5 h-3.5 text-[#F58220]" />
                <span>{t?.btnSearchLibrary || 'ምስል ፈልግ / ቤተ-መጽሐፍት'}</span>
              </button>

              <label
                htmlFor="detail-upload-input"
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition border border-slate-200"
              >
                <Upload className="w-3.5 h-3.5 text-slate-600" />
                <span>{t?.btnUploadDevice || 'ከስልክ/ኮምፒውተር ጫን'}</span>
                <input
                  id="detail-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUploadFile(file);
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* STEP 3: CHOOSE COLOR & SIZE */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-lg bg-[#F58220] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                3
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                {t?.step3OptionTitle || 'ደረጃ 3፡ የምርት ቀለም እና መጠን ይምረጡ'}
              </h3>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                {t?.productColorLabel || 'ቀለም'}: <strong className="text-slate-900 font-semibold">{colorName}</strong>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => {
                  const isChosen = selectedColor.id === color.id;
                  const cName = language === 'am' && color.nameAmharic ? color.nameAmharic : color.name;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => onSelectColor(color)}
                      className={`w-7 h-7 rounded-xl border-2 transition ${
                        isChosen ? 'ring-2 ring-[#F58220] border-[#F58220] scale-105' : 'border-slate-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={cName}
                    >
                      {isChosen && (
                        <Check className={`w-3.5 h-3.5 mx-auto ${color.isDark ? 'text-white' : 'text-slate-900'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stamp Specifics */}
            {product.id === 'stamp' && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="block text-xs font-medium text-slate-700">
                  {t?.stampInkLabel || 'የማህተም ቀለም'}:
                </label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {product.inkColors.map((ink) => (
                    <button
                      key={ink.id}
                      type="button"
                      onClick={() => onChangeStampInkColor(ink.hex)}
                      className={`px-3 py-1 rounded-lg border font-medium transition ${
                        stampInkColor === ink.hex
                          ? 'border-[#F58220] text-white shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                      style={{ backgroundColor: stampInkColor === ink.hex ? ink.hex : '#ffffff' }}
                    >
                      {language === 'am' && ink.nameAmharic ? ink.nameAmharic : ink.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  {t?.productSizeLabel || 'መጠን (ሳይዝ)'}:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onSelectSize(s)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                        selectedSize === s
                          ? 'bg-[#F58220] text-white border-[#F58220]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: DELIVERY URGENCY (+% FEE) */}
          <DeliveryUrgencySelector
            selectedUrgency={selectedUrgency}
            onSelectUrgency={onSelectUrgency}
            targetDate={targetDeliveryDate}
            onTargetDateChange={onTargetDateChange}
            estimatedDeliveryText={estimatedDeliveryText}
            language={language}
            t={t}
          />

          {/* STEP 5: QUANTITY & TOTAL PRICE (CLEAN LIGHT CARD) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase">
                  {t?.quantityLabel || 'የህትመት ብዛት (ቁጥር)'}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    onClick={() => onQuantityChange(Math.max(product.minQty || 1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition border border-slate-200"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-lg font-bold font-mono text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition border border-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick batch presets */}
              <div className="flex gap-1.5 self-start sm:self-center">
                {[1, 5, 20, 50].map((batch) => (
                  <button
                    key={batch}
                    type="button"
                    onClick={() => onQuantityChange(batch)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition ${
                      quantity === batch ? 'bg-[#F58220] text-white border-[#F58220]' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {batch}x
                  </button>
                ))}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>
                  {quantity}x {productName.split(' ')[0]} (@ {product.basePrice} {language === 'am' ? 'ብር' : 'ETB'}):
                </span>
                <span className="font-mono text-slate-900 font-semibold">
                  {baseSubtotal.toLocaleString()} {language === 'am' ? 'ብር' : 'ETB'}
                </span>
              </div>

              {bulkDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>{t?.bulkDiscountLabel || 'የጅምላ ቅናሽ'}:</span>
                  <span className="font-mono">-{bulkDiscountAmount.toLocaleString()} {language === 'am' ? 'ብር' : 'ETB'}</span>
                </div>
              )}

              {urgencyFeeAmount > 0 && (
                <div className="flex justify-between text-[#C25E00] font-medium">
                  <span>
                    {t?.urgencyFeeLabel || 'የአስቸኳይ ተጨማሪ ክፍያ'} ({selectedUrgency.name} +{selectedUrgency.percentage}%):
                  </span>
                  <span className="font-mono">+{urgencyFeeAmount.toLocaleString()} {language === 'am' ? 'ብር' : 'ETB'}</span>
                </div>
              )}

              <div className="border-t border-slate-200 pt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">
                    {t?.totalPayable || 'ጠቅላላ የሚከፈል ዋጋ'}:
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {t?.guaranteedPromise || 'የማድረሻ ጊዜ'}: {estimatedDeliveryText}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-slate-900 font-mono">
                    {grandTotal.toLocaleString()}
                  </span>{' '}
                  <span className="text-xs text-slate-500 font-medium">
                    {language === 'am' ? 'ብር' : 'ETB'}
                  </span>
                </div>
              </div>
            </div>

            {/* 3D Tactile Proceed to Pay Button */}
            <button
              type="button"
              onClick={onOpenCheckout}
              className="btn-3d-primary w-full py-4 font-bold rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2.5 transition active:scale-[0.98]"
            >
              <span>{t?.btnProceedPayment || 'በቴሌብር ወይም በንግድ ባንክ ክፍያ ፈጽም'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
