import React, { useRef, useState } from 'react';
import { RotateCw, ZoomIn, Move, Sparkles, Check, RefreshCw, FlipHorizontal, Eye } from 'lucide-react';

export default function MockupCanvas({
  product,
  selectedColor,
  customText,
  textFont,
  textColor,
  textSize,
  imageSrc,
  imageScale,
  imageRotation,
  imagePos,
  isFlipped,
  removeWhiteBg,
  inkColor,
  stampShape = 'circle',
  onUpdateTransform,
  onResetTransform,
  onTriggerAiFit,
  isAiOptimizing,
  language = 'am',
  t
}) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showGuidelines, setShowGuidelines] = useState(true);

  // Drag handlers for interactive positioning directly on the mockup
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - imagePos.x, y: e.clientY - imagePos.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = Math.round(Math.max(-120, Math.min(120, e.clientX - dragStart.x)));
    const newY = Math.round(Math.max(-140, Math.min(140, e.clientY - dragStart.y)));
    onUpdateTransform({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const currentColorHex = selectedColor?.hex || '#FFFFFF';
  const isDarkColor = selectedColor?.isDark ?? false;

  // Text font family CSS string
  const getFontFamily = () => {
    switch (textFont) {
      case 'display': return "'Bebas Neue', cursive";
      case 'stamp': return "'Cinzel', serif";
      case 'script': return "'Pacifico', cursive";
      case 'ethiopic': return "'Noto Sans Ethiopic', sans-serif";
      default: return "'Plus Jakarta Sans', system-ui, sans-serif";
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Top Canvas Bar (Clean Soft Light) */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 text-slate-700 rounded-t-2xl text-xs border border-b-0 border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-[11px] text-slate-700">
            {product.name}
          </span>
          <span className="bg-white text-slate-600 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-200">
            300 DPI
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowGuidelines(!showGuidelines)}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition border ${
              showGuidelines ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle print safe margins"
          >
            <Eye className="w-3 h-3 inline mr-1" />
            <span>Guides</span>
          </button>

          <button
            onClick={onResetTransform}
            className="px-2 py-0.5 rounded text-[11px] bg-white hover:bg-slate-100 text-slate-600 font-medium border border-slate-200 transition"
            title="Reset position & scale"
          >
            <RefreshCw className="w-3 h-3 inline mr-1" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Mockup Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full max-w-[540px] aspect-[4/4.2] bg-slate-50/70 rounded-b-2xl overflow-hidden border border-slate-200 flex items-center justify-center p-4 shadow-xs"
      >
        {/* Soft floor shadow */}
        <div className="absolute bottom-6 w-3/4 h-6 bg-slate-300/40 rounded-full blur-md pointer-events-none" />

        {/* -------------------- SVG PRODUCT BASE TEMPLATES -------------------- */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full max-h-[460px] drop-shadow-xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Shading gradients */}
            <linearGradient id="tshirtShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000" stopOpacity="0.18" />
              <stop offset="15%" stopColor="#000" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.12" />
              <stop offset="85%" stopColor="#000" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
            </linearGradient>

            <linearGradient id="mugCylinderShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
              <stop offset="12%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.05" />
              <stop offset="92%" stopColor="#000000" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient id="mugInnerShade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="stickerHolo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffb3ba" stopOpacity="0.7" />
              <stop offset="25%" stopColor="#bae1ff" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#baffc9" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#ffffba" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#e8baff" stopOpacity="0.7" />
            </linearGradient>

            {/* Pattern for canvas texture */}
            <pattern id="canvasWeave" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 3 L6 3 M3 0 L3 6" stroke="#000000" strokeWidth="0.5" strokeOpacity="0.08" />
            </pattern>
          </defs>

          {/* ================= 1. T-SHIRT TEMPLATE ================= */}
          {product.id === 'tshirt' && (
            <g id="tshirt-model">
              {/* Garment Base Body */}
              <path
                d="M175,70 C195,95 305,95 325,70 L435,130 C445,135 448,150 435,175 L385,215 L350,180 L350,440 C350,450 340,460 325,460 L175,460 C160,460 150,450 150,440 L150,180 L115,215 L65,175 C52,150 55,135 65,130 Z"
                fill={currentColorHex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.15"
              />

              {/* Shading overlay */}
              <path
                d="M175,70 C195,95 305,95 325,70 L435,130 C445,135 448,150 435,175 L385,215 L350,180 L350,440 C350,450 340,460 325,460 L175,460 C160,460 150,450 150,440 L150,180 L115,215 L65,175 C52,150 55,135 65,130 Z"
                fill="url(#tshirtShade)"
                style={{ mixBlendMode: 'multiply' }}
              />

              {/* Realistic Fabric Creases & Wrinkle Shadow Paths */}
              <path d="M150,180 Q200,220 220,290" stroke="#000000" strokeWidth="2" strokeOpacity="0.07" fill="none" />
              <path d="M350,180 Q300,220 280,290" stroke="#000000" strokeWidth="2" strokeOpacity="0.07" fill="none" />
              <path d="M165,420 Q250,435 335,420" stroke="#000000" strokeWidth="2" strokeOpacity="0.08" fill="none" />
              <path d="M115,215 L150,180" stroke="#000000" strokeWidth="2" strokeOpacity="0.2" fill="none" />
              <path d="M385,215 L350,180" stroke="#000000" strokeWidth="2" strokeOpacity="0.2" fill="none" />

              {/* Collar Ribbing */}
              <path
                d="M175,70 C195,95 305,95 325,70 C300,110 200,110 175,70 Z"
                fill={isDarkColor ? '#000000' : '#E2E8F0'}
                fillOpacity="0.25"
                stroke="#000000"
                strokeWidth="1.5"
                strokeOpacity="0.25"
              />
              <path
                d="M190,75 C215,92 285,92 310,75 C290,102 210,102 190,75 Z"
                stroke="#000000"
                strokeWidth="1"
                strokeDasharray="3 2"
                strokeOpacity="0.2"
                fill="none"
              />

              {/* Inner neck brand label */}
              <rect x="232" y="86" width="36" height="15" rx="3" fill="#FFFFFF" fillOpacity="0.85" stroke="#F58220" strokeWidth="0.5" />
              <text x="250" y="97" fontSize="5.5" fontFamily="sans-serif" textAnchor="middle" fill="#C25E00" fontWeight="bold">
                D.A.F PRINTING
              </text>
            </g>
          )}

          {/* ================= 2. MUG TEMPLATE ================= */}
          {product.id === 'mug' && (
            <g id="mug-model">
              {/* Mug Handle */}
              <path
                d="M360,160 C440,160 450,320 360,340 L360,305 C410,290 405,195 360,195 Z"
                fill={currentColorHex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.2"
              />
              <path
                d="M360,160 C440,160 450,320 360,340 L360,305 C410,290 405,195 360,195 Z"
                fill="url(#mugCylinderShade)"
                style={{ mixBlendMode: 'multiply' }}
              />

              {/* Main Cylindrical Body */}
              <path
                d="M130,120 L370,120 C370,120 375,370 370,390 C365,410 135,410 130,390 C125,370 130,120 130,120 Z"
                fill={currentColorHex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.15"
              />

              {/* Inner Cavity Depth */}
              <ellipse cx="250" cy="120" rx="120" ry="25" fill="#334155" fillOpacity="0.25" />
              <ellipse cx="250" cy="122" rx="114" ry="22" fill={currentColorHex} />
              <ellipse cx="250" cy="122" rx="114" ry="22" fill="url(#mugInnerShade)" />

              {/* Front Cylindrical Gradient Shading */}
              <path
                d="M130,120 L370,120 C370,120 375,370 370,390 C365,410 135,410 130,390 C125,370 130,120 130,120 Z"
                fill="url(#mugCylinderShade)"
                style={{ mixBlendMode: 'multiply' }}
              />

              {/* Specular White Shine Stripe on Ceramic */}
              <rect x="290" y="125" width="22" height="260" fill="#FFFFFF" fillOpacity="0.22" rx="11" />
              <rect x="316" y="130" width="6" height="250" fill="#FFFFFF" fillOpacity="0.12" rx="3" />

              {/* Bottom Ceramic Rim Curve */}
              <path
                d="M135,390 C180,412 320,412 365,390"
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.3"
                fill="none"
              />
            </g>
          )}

          {/* ================= 3. STAMP TEMPLATE ================= */}
          {product.id === 'stamp' && (
            <g id="stamp-model">
              {/* Paper Sheet Base under the stamp */}
              <rect x="70" y="60" width="360" height="380" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="100" y1="90" x2="220" y2="90" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
              <line x1="100" y1="105" x2="380" y2="105" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="100" y1="120" x2="360" y2="120" stroke="#E2E8F0" strokeWidth="2" />
              <line x1="100" y1="135" x2="390" y2="135" stroke="#E2E8F0" strokeWidth="2" />

              {/* Official Stamp Imprint Watermark/Texture Area */}
              <g id="stamp-imprint-rings">
                {stampShape === 'circle' ? (
                  <>
                    <circle cx="250" cy="255" r="135" stroke={inkColor || '#1D4ED8'} strokeWidth="4.5" fill="none" strokeDasharray="900" />
                    <circle cx="250" cy="255" r="124" stroke={inkColor || '#1D4ED8'} strokeWidth="1.8" fill="none" strokeDasharray="4 2" />
                    <circle cx="250" cy="255" r="82" stroke={inkColor || '#1D4ED8'} strokeWidth="2.5" fill="none" />
                    {/* Stars on stamp ring */}
                    <text x="145" y="260" fill={inkColor || '#1D4ED8'} fontSize="18" textAnchor="middle">★</text>
                    <text x="355" y="260" fill={inkColor || '#1D4ED8'} fontSize="18" textAnchor="middle">★</text>
                    {/* Circular top perimeter text */}
                    <path id="stampCurveTop" d="M 150 255 A 100 100 0 0 1 350 255" fill="none" />
                    <text fill={inkColor || '#1D4ED8'} fontSize="11" fontWeight="bold" letterSpacing="3">
                      <textPath href="#stampCurveTop" startOffset="50%" textAnchor="middle">
                        OFFICIAL VERIFIED SEAL • ETHIOPIA
                      </textPath>
                    </text>
                    {/* Circular bottom perimeter text */}
                    <path id="stampCurveBottom" d="M 350 255 A 100 100 0 0 1 150 255" fill="none" />
                    <text fill={inkColor || '#1D4ED8'} fontSize="10" fontWeight="bold" letterSpacing="2.5">
                      <textPath href="#stampCurveBottom" startOffset="50%" textAnchor="middle">
                        AUTHENTICATED • REGISTERED PLC
                      </textPath>
                    </text>
                  </>
                ) : (
                  <>
                    <rect x="110" y="150" width="280" height="200" rx="8" stroke={inkColor || '#1D4ED8'} strokeWidth="4" fill="none" />
                    <rect x="118" y="158" width="264" height="184" rx="4" stroke={inkColor || '#1D4ED8'} strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
                    <line x1="130" y1="195" x2="370" y2="195" stroke={inkColor || '#1D4ED8'} strokeWidth="1.5" />
                    <line x1="130" y1="310" x2="370" y2="310" stroke={inkColor || '#1D4ED8'} strokeWidth="1.5" />
                    <text x="250" y="185" fill={inkColor || '#1D4ED8'} fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="3">
                      COMMERCIAL REGISTRATION NO.
                    </text>
                  </>
                )}
              </g>

              {/* Realistic Stamp Chassis floating in top-right as hardware preview */}
              <g transform="translate(370, 40) scale(0.65)" filter="drop-shadow(0px 8px 12px rgba(0,0,0,0.3))">
                <rect x="0" y="40" width="80" height="85" rx="14" fill={currentColorHex} stroke="#1E293B" strokeWidth="3" />
                <rect x="15" y="10" width="50" height="35" rx="8" fill="#334155" />
                <rect x="25" y="0" width="30" height="15" rx="4" fill="#0F172A" />
                <rect x="10" y="90" width="60" height="25" rx="4" fill="#FFFFFF" fillOpacity="0.8" />
                <text x="40" y="106" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#0F172A">SEAL</text>
              </g>
            </g>
          )}

          {/* ================= 4. VINYL STICKERS TEMPLATE ================= */}
          {product.id === 'stickers' && (
            <g id="sticker-model">
              {/* Cutting mat grid background */}
              <rect x="60" y="60" width="380" height="380" rx="16" fill="#1E293B" />
              <g stroke="#334155" strokeWidth="1" strokeDasharray="2 6">
                {[100, 140, 180, 220, 260, 300, 340, 380, 420].map((coord) => (
                  <React.Fragment key={coord}>
                    <line x1={coord} y1="60" x2={coord} y2="440" />
                    <line x1="60" y1={coord} x2="440" y2={coord} />
                  </React.Fragment>
                ))}
              </g>

              {/* Sticker Thick Die-Cut Outer White Outline Badge */}
              <rect
                x="115"
                y="115"
                width="270"
                height="270"
                rx="42"
                fill={selectedColor?.isHolo ? 'url(#stickerHolo)' : '#FFFFFF'}
                stroke="#E2E8F0"
                strokeWidth="4"
                filter="drop-shadow(0px 15px 25px rgba(0,0,0,0.35))"
              />

              {/* Die-Cut Cut Line (Laser Cut Marker) */}
              <rect
                x="125"
                y="125"
                width="250"
                height="250"
                rx="34"
                fill="none"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                strokeOpacity="0.4"
              />

              {/* Peel Tab in corner with realistic lift curl */}
              <path
                d="M345,115 L385,155 L345,155 Z"
                fill="#F1F5F9"
                stroke="#CBD5E1"
                strokeWidth="1.5"
                filter="drop-shadow(-3px 3px 4px rgba(0,0,0,0.25))"
              />
              <path d="M345,155 L385,155" stroke="#94A3B8" strokeWidth="1" />
            </g>
          )}

          {/* ================= 5. TOTE BAG TEMPLATE ================= */}
          {product.id === 'tote' && (
            <g id="tote-model">
              {/* Handles */}
              <path
                d="M190,60 C190,20 310,20 310,60 L310,180 L280,180 L280,75 C280,50 220,50 220,75 L220,180 L190,180 Z"
                fill={currentColorHex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.2"
              />
              {/* Bag Body */}
              <rect
                x="120"
                y="160"
                width="260"
                height="290"
                rx="14"
                fill={currentColorHex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.2"
              />
              {/* Fabric Weave Texture */}
              <rect x="120" y="160" width="260" height="290" rx="14" fill="url(#canvasWeave)" />
              {/* Fold Shadows */}
              <path d="M140,160 Q250,180 360,160" stroke="#000000" strokeWidth="2" strokeOpacity="0.15" fill="none" />
              <path d="M130,430 Q250,450 370,430" stroke="#000000" strokeWidth="2" strokeOpacity="0.2" fill="none" />
              <line x1="120" y1="200" x2="380" y2="200" stroke="#000000" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.15" />
            </g>
          )}

          {/* ================= 6. BASEBALL CAP TEMPLATE ================= */}
          {product.id === 'cap' && (
            <g id="cap-model">
              {/* Cap Visor / Brim */}
              <path
                d="M130,300 C150,370 350,370 370,300 C390,325 350,380 250,380 C150,380 110,325 130,300 Z"
                fill={currentColorHex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.25"
              />
              {/* Visor Stitching Lines */}
              <path d="M145,310 C170,360 330,360 355,310" stroke="#000000" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.2" fill="none" />
              {/* Cap Crown Dome */}
              <path
                d="M140,305 C135,170 365,170 360,305 C330,320 170,320 140,305 Z"
                fill={currentColorHex}
                stroke="#000000"
                strokeWidth="2"
                strokeOpacity="0.2"
              />
              {/* Crown Panel Seams */}
              <path d="M250,180 L250,315" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.2" />
              <path d="M250,180 Q190,240 160,310" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
              <path d="M250,180 Q310,240 340,310" stroke="#000000" strokeWidth="1.5" strokeOpacity="0.15" fill="none" />
              {/* Top squatchee button */}
              <ellipse cx="250" cy="180" rx="10" ry="6" fill={currentColorHex} stroke="#000000" strokeWidth="2" strokeOpacity="0.3" />
            </g>
          )}

          {/* ================= PRINT BOUNDING SAFE GUIDE ================= */}
          {showGuidelines && (
            <g id="print-safe-boundary" pointerEvents="none">
              <rect
                x={product.bounds.left}
                y={product.bounds.top}
                width={product.bounds.width}
                height={product.bounds.height}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeOpacity="0.75"
                rx="6"
              />
              <text
                x={product.bounds.left + 8}
                y={product.bounds.top + 16}
                fill="#3B82F6"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                PRINT AREA [300 DPI SAFE]
              </text>
            </g>
          )}

          {/* ================= CUSTOM ARTWORK & TEXT LAYER ================= */}
          <g
            id="artwork-canvas-group"
            transform={`translate(${250 + imagePos.x}, ${255 + imagePos.y}) scale(${imageScale / 100}) rotate(${imageRotation}) ${isFlipped ? 'scale(-1, 1)' : ''}`}
            onMouseDown={handleMouseDown}
            className="cursor-grab active:cursor-grabbing transition-transform duration-75"
          >
            {/* Center target crosshair when dragging */}
            {isDragging && (
              <g pointerEvents="none" opacity="0.6">
                <circle cx="0" cy="0" r="18" fill="none" stroke="#2563EB" strokeWidth="2" />
                <line x1="-25" y1="0" x2="25" y2="0" stroke="#2563EB" strokeWidth="2" />
                <line x1="0" y1="-25" x2="0" y2="25" stroke="#2563EB" strokeWidth="2" />
              </g>
            )}

            {/* 1. Custom Image (Uploaded or Searched from Library) */}
            {imageSrc && (
              <image
                href={imageSrc}
                x="-85"
                y={customText ? "-110" : "-85"}
                width="170"
                height="170"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  filter: removeWhiteBg ? 'contrast(120%) brightness(105%)' : 'none'
                }}
              />
            )}

            {/* 2. Custom Text */}
            {customText && (
              <text
                x="0"
                y={imageSrc ? "90" : "10"}
                textAnchor="middle"
                fontSize={textSize || 24}
                fontFamily={getFontFamily()}
                fontWeight="bold"
                fill={textColor || (isDarkColor ? '#FFFFFF' : '#111827')}
                letterSpacing="1px"
                style={{
                  textShadow: isDarkColor ? '0 2px 4px rgba(0,0,0,0.6)' : '0 1px 2px rgba(255,255,255,0.4)',
                }}
              >
                {customText}
              </text>
            )}

            {/* Default Placeholder when completely empty */}
            {!imageSrc && !customText && (
              <g pointerEvents="none" opacity="0.45">
                <rect x="-70" y="-45" width="140" height="90" rx="8" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 3" />
                <text x="0" y="-5" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
                  Your Design Here
                </text>
                <text x="0" y="16" textAnchor="middle" fontSize="10" fill="#64748B">
                  Type text or upload image
                </text>
              </g>
            )}
          </g>
        </svg>

        {/* AI Optimizing Toast Overlay */}
        {isAiOptimizing && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center transition-all animate-fadeIn">
            <div className="bg-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-200 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-indigo-600 animate-spin" />
              <div>
                <p className="text-sm font-bold text-slate-800">AI Solving Proportions...</p>
                <p className="text-xs text-slate-500">Auto-centering & calculating 300 DPI bounds</p>
              </div>
            </div>
          </div>
        )}

        {/* 3D Floating Dock Controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 floating-dock-3d p-1.5 rounded-2xl text-slate-700">
          <button
            onClick={() => onUpdateTransform({ scale: Math.max(30, imageScale - 10) })}
            className="w-7 h-7 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition font-bold text-xs flex items-center justify-center active:scale-95"
            title="Zoom Out"
          >
            -
          </button>
          <span className="text-[11px] font-mono px-1 min-w-[34px] text-center text-slate-800 font-bold">
            {imageScale}%
          </span>
          <button
            onClick={() => onUpdateTransform({ scale: Math.min(220, imageScale + 10) })}
            className="w-7 h-7 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition font-bold text-xs flex items-center justify-center active:scale-95"
            title="Zoom In"
          >
            +
          </button>
          <div className="w-px h-4 bg-slate-200 mx-0.5" />
          <button
            onClick={() => onUpdateTransform({ rotation: (imageRotation + 45) % 360 })}
            className="w-7 h-7 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition flex items-center justify-center active:scale-95"
            title="Rotate 45°"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onUpdateTransform({ isFlipped: !isFlipped })}
            className={`w-7 h-7 rounded-xl transition flex items-center justify-center active:scale-95 ${
              isFlipped 
                ? 'bg-gradient-to-r from-[#F58220] to-[#E07010] text-white shadow-2xs' 
                : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
            }`}
            title={language === 'am' ? 'አግድም ገልብጥ' : 'Flip Horizontal'}
          >
            <FlipHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D AI Proportion & Fit Trigger Banner */}
      <div className="w-full mt-3 flex items-center justify-between p-3.5 bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-orange-50/90 rounded-2xl border border-orange-200/90 shadow-[0_4px_12px_-2px_rgba(245,130,32,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#FFA034] via-[#F58220] to-[#D96B0F] text-white flex items-center justify-center shadow-[0_4px_8px_rgba(245,130,32,0.3)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>{t?.aiTitle || 'ስማርት AI አቀማመጥ አስተካካይ'}</span>
              <span className="text-[10px] bg-orange-100 text-[#C25E00] px-1.5 py-0.5 rounded font-bold shadow-2xs">Auto-Scale</span>
            </p>
            <p className="text-[11px] text-slate-600">
              {t?.aiDesc || 'የምስሉን መጠን፣ መሃል አቀማመጥ እና የቀለም ንፅፅር ለህትመት ተስማሚ እንዲሆን በራሱ ይፈታል።'}
            </p>
          </div>
        </div>

        <button
          onClick={onTriggerAiFit}
          disabled={isAiOptimizing}
          className="btn-3d-primary px-4 py-2 font-bold rounded-xl text-xs flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAiOptimizing ? (language === 'am' ? 'በማስላት ላይ...' : 'Fitting...') : (t?.aiButton || 'አቀማመጥ አስተካክል')}</span>
        </button>
      </div>
    </div>
  );
}
