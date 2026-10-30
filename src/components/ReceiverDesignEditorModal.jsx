import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCw, 
  Type, 
  Sparkles, 
  Upload, 
  Search, 
  Palette, 
  Check, 
  ShieldCheck,
  FlipHorizontal
} from 'lucide-react';
import MockupCanvas from './MockupCanvas';
import { FONT_OPTIONS } from '../data/artLibrary';
import { solveArtworkProportion } from '../utils/aiProportionEngine';

export default function ReceiverDesignEditorModal({
  isOpen,
  onClose,
  order,
  onSaveOrderDesign,
  onOpenSearchModal,
  language = 'am',
  t
}) {
  if (!isOpen || !order) return null;

  const product = order.product;
  const [selectedColor, setSelectedColor] = useState(order.selectedColor || product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(order.selectedSize || product.sizes?.[0] || 'Standard');
  
  // Custom text
  const [customText, setCustomText] = useState(order.customText || '');
  const [textFont, setTextFont] = useState(order.textFont || 'display');
  const [textColor, setTextColor] = useState(order.textColor || (order.selectedColor?.isDark ? '#FFFFFF' : '#18181B'));
  const [textSize, setTextSize] = useState(order.textSize || 24);

  // Artwork & Image
  const [imageSrc, setImageSrc] = useState(order.imageSrc || '');
  const [imageTitle, setImageTitle] = useState(order.imageTitle || 'Artwork File');
  const [imageScale, setImageScale] = useState(order.imageScale || 90);
  const [imageRotation, setImageRotation] = useState(order.imageRotation || 0);
  const [imagePos, setImagePos] = useState(order.imagePos || { x: 0, y: -10 });
  const [isFlipped, setIsFlipped] = useState(order.isFlipped || false);
  const [removeWhiteBg, setRemoveWhiteBg] = useState(order.removeWhiteBg || false);

  // Stamp specifics
  const [stampInkColor, setStampInkColor] = useState(order.stampInkColor || '#1D4ED8');
  const [stampShape, setStampShape] = useState(order.stampShape || 'circle');

  // Workshop Revision Note
  const [receiverNote, setReceiverNote] = useState(
    order.receiverEditNote || (language === 'am' ? 'ጽሁፉ እና የምስሉ አቀማመጥ ለህትመት ተስተካክሏል።' : 'Adjusted text placement & print centering.')
  );

  const [isAiOptimizing, setIsAiOptimizing] = useState(false);
  const [hasSavedSuccess, setHasSavedSuccess] = useState(false);

  const handleAiAutoFit = () => {
    setIsAiOptimizing(true);
    setTimeout(() => {
      const result = solveArtworkProportion({
        product,
        selectedColor,
        imageNaturalWidth: 400,
        imageNaturalHeight: 400,
        hasImage: !!imageSrc,
        customText,
        currentScale: imageScale
      });

      setImageScale(result.recommendedScale);
      setImagePos({ x: result.recommendedX, y: result.recommendedY });
      if (result.suggestedTextColor) {
        setTextColor(result.suggestedTextColor);
      }
      setIsAiOptimizing(false);
    }, 350);
  };

  const handleUploadNewFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      setImageTitle(file.name);
      handleAiAutoFit();
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedPayload = {
      selectedColor,
      selectedSize,
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
      receiverEditNote: receiverNote,
      wasEditedByReceiver: true,
      lastEditedAt: new Date().toISOString()
    };

    onSaveOrderDesign(order.orderId, updatedPayload);
    setHasSavedSuccess(true);
    setTimeout(() => {
      setHasSavedSuccess(false);
      onClose();
    }, 600);
  };

  const productName = language === 'am' && product.nameAmharic ? product.nameAmharic : product.name;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#C25E00] flex items-center justify-center font-bold">
              🛠️
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span>{t?.receiverEditorTitle || 'ከህትመት በፊት የዲዛይን መፈተሻ እና ማስተካከያ'}</span>
                <span className="font-mono text-xs bg-orange-100 text-[#C25E00] px-2 py-0.5 rounded-md font-bold">
                  {order.orderId}
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                {productName} • {order.customerName} ({order.customerPhone})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Grid: Left Canvas, Right Controls */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Canvas (Sticky) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-800">
                {t?.receiverCanvasHeader || 'የዎርክሾፕ ቀጥታ የህትመት እይታ'}
              </span>
              <span className="font-mono text-slate-500">
                {selectedColor.name} • {selectedSize}
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-2 shadow-xs">
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
                onUpdateTransform={(t) => {
                  if (t.scale !== undefined) setImageScale(t.scale);
                  if (t.rotation !== undefined) setImageRotation(t.rotation);
                  if (t.pos !== undefined) setImagePos(t.pos);
                  if (t.isFlipped !== undefined) setIsFlipped(t.isFlipped);
                }}
                onResetTransform={() => {
                  setImageScale(90);
                  setImageRotation(0);
                  setImagePos({ x: 0, y: -10 });
                  setIsFlipped(false);
                }}
                onTriggerAiFit={handleAiAutoFit}
                isAiOptimizing={isAiOptimizing}
                language={language}
                t={t}
              />
            </div>

            <button
              onClick={handleAiAutoFit}
              disabled={isAiOptimizing}
              className="w-full py-2 bg-orange-50 hover:bg-orange-100 text-[#C25E00] border border-orange-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
              <span>{language === 'am' ? 'ስማርት AI በራሱ እንዲያስተካክል' : 'Auto-Fit Proportions with AI'}</span>
            </button>
          </div>

          {/* Right Controls */}
          <div className="lg:col-span-6 space-y-4">
            {/* Customer Original Notice */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1">
              <p className="font-bold text-slate-800">
                {t?.customerOriginalInfo || 'የደንበኛው መረጃ'}
              </p>
              <p className="text-slate-600">
                {language === 'am' ? 'የታዘዘው ብዛት፡' : 'Quantity:'} <strong>{order.quantity} pcs</strong> • {language === 'am' ? 'የማድረሻ አድራሻ፡' : 'Delivery:'} {order.deliveryArea || 'Addis Ababa'}
              </p>
            </div>

            {/* Edit Text */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2.5">
              <label className="block text-xs font-bold text-slate-800">
                {language === 'am' ? 'ጽሁፍ አርትዕ / ቀይር፡' : 'Edit Printed Text:'}
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-slate-500 block mb-1">{language === 'am' ? 'ፎንት፡' : 'Font:'}</span>
                  <select
                    value={textFont}
                    onChange={(e) => setTextFont(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  >
                    <option value="ethiopic">Ge'ez / Amharic (ግዕዝ/አማርኛ)</option>
                    <option value="display">Display Bold</option>
                    <option value="serif">Classic Serif</option>
                    <option value="script">Script</option>
                  </select>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">{language === 'am' ? 'መጠን (Font Size):' : 'Size:'} {textSize}pt</span>
                  <input
                    type="range"
                    min="14"
                    max="60"
                    value={textSize}
                    onChange={(e) => setTextSize(Number(e.target.value))}
                    className="w-full accent-[#F58220]"
                  />
                </div>
              </div>
            </div>

            {/* Replace Image / Scale */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2.5">
              <label className="block text-xs font-bold text-slate-800">
                {language === 'am' ? 'ምስል እና አቀማመጥ ማስተካከያ፡' : 'Artwork & Scaling:'}
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block mb-1">{language === 'am' ? 'ስፋት፡' : 'Scale:'} {imageScale}%</span>
                  <input
                    type="range"
                    min="30"
                    max="220"
                    value={imageScale}
                    onChange={(e) => setImageScale(Number(e.target.value))}
                    className="w-full accent-[#F58220]"
                  />
                </div>

                <div className="flex items-end gap-1.5">
                  <button
                    onClick={() => setImageRotation((imageRotation + 45) % 360)}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-center gap-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>45°</span>
                  </button>
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className={`p-2 rounded-lg border text-xs flex items-center gap-1 ${
                      isFlipped ? 'bg-[#F58220] text-white' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" />
                    <span>{language === 'am' ? 'ገልብጥ' : 'Flip'}</span>
                  </button>
                </div>
              </div>

              {/* Upload Replacement File */}
              <label className="block p-2 rounded-lg border border-dashed border-orange-200 bg-orange-50/40 text-center cursor-pointer text-xs text-[#C25E00] font-semibold hover:bg-orange-50">
                <Upload className="w-3.5 h-3.5 inline mr-1 text-[#F58220]" />
                <span>{language === 'am' ? 'አዲስ ፎቶ በፋይል ቀይር' : 'Replace with New Image File'}</span>
                <input type="file" accept="image/*" onChange={handleUploadNewFile} className="hidden" />
              </label>
            </div>

            {/* Receiver Note */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                {language === 'am' ? 'የትዕዛዝ ተቀባይ የዎርክሾፕ ማስታወሻ፡' : 'Workshop Note:'}
              </label>
              <textarea
                value={receiverNote}
                onChange={(e) => setReceiverNote(e.target.value)}
                rows={2}
                placeholder="e.g. Centered text, 300 DPI confirmed, ready for DTF press."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-semibold"
          >
            {t?.editorCloseButton || 'ሳታስቀምጥ ዝጋ'}
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#F58220] hover:bg-[#E07010] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
          >
            {hasSavedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>{language === 'am' ? 'ተመዝግቧል!' : 'Saved!'}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{t?.editorSaveButton || 'ለውጦቹን በትዕዛዙ ላይ መዝግብ'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
