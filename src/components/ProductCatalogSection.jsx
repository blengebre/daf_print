import React, { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ProductCatalogSection({
  products = PRODUCTS,
  onSelectProductToCustomize,
  language = 'am',
  t
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoriesEn = ['All', 'Apparel', 'Drinkware', 'Office & Business', 'Branding & Labels', 'Eco & Lifestyle', 'Headwear'];
  const categoriesAm = [
    { id: 'All', label: 'ሁሉም ምርቶች' },
    { id: 'Apparel', label: 'አልባሳት' },
    { id: 'Drinkware', label: 'ኩባያዎች (ማግ)' },
    { id: 'Office & Business', label: 'የቢሮ እና ማህተሞች' },
    { id: 'Branding & Labels', label: 'የብራንዲንግ ስቲከሮች' },
    { id: 'Eco & Lifestyle', label: 'የጨርቅ ቦርሳ' },
    { id: 'Headwear', label: 'ቆቦች' },
  ];

  const filteredProducts = products.filter((p) => {
    return selectedCategory === 'All' || p.category === selectedCategory;
  });

  return (
    <section id="products-catalog-section" className="space-y-6 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {t?.catalogTitle || 'የህትመት ምርቶቻችን'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {t?.catalogSubtitle || 'በማንኛውም ምርት ላይ ጠቅ በማድረግ ጽሁፍ፣ ፎቶ እና ቀለም በመምረጥ በቀጥታ ይመልከቱ'}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {language === 'am' ? (
            categoriesAm.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-[#F58220] text-white shadow-xs font-semibold'
                    : 'bg-white hover:bg-orange-50 text-slate-600 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))
          ) : (
            categoriesEn.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-[#F58220] text-white shadow-xs font-semibold'
                    : 'bg-white hover:bg-orange-50 text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => {
          const displayName = language === 'am' && prod.nameAmharic ? prod.nameAmharic : prod.name;
          const displayTagline = language === 'am' && prod.taglineAmharic ? prod.taglineAmharic : prod.tagline;
          const displayCategory = language === 'am' && prod.categoryAmharic ? prod.categoryAmharic : prod.category;
          const displayBadge = language === 'am' && prod.badgeAmharic ? prod.badgeAmharic : prod.badge;

          return (
            <div
              key={prod.id}
              onClick={() => onSelectProductToCustomize(prod.id)}
              className="card-3d rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
                <img
                  src={prod.cardImage}
                  alt={displayName}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* 3D Tag / Badge */}
                {displayBadge && (
                  <span className="absolute top-3 left-3 bg-white/95 text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-[0_4px_10px_rgba(0,0,0,0.06)]">
                    {displayBadge}
                  </span>
                )}

                {/* Min Qty Badge */}
                <span className="absolute bottom-3 right-3 bg-slate-900/85 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-sm">
                  {language === 'am' ? `ዝቅተኛ ${prod.minQty} ፍሬ` : `Min ${prod.minQty} pc`}
                </span>
              </div>

              {/* Product Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#C25E00] uppercase tracking-wider">
                      {displayCategory}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#F58220] transition-colors">
                    {displayName}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {displayTagline}
                  </p>
                </div>

                {/* Price & 3D Action Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {t?.basePriceFrom || 'ዋጋ ከ'}
                    </span>
                    <span className="text-base font-extrabold text-slate-900 font-mono">
                      {prod.basePrice}{' '}
                      <span className="text-xs font-normal text-slate-500">
                        {language === 'am' ? 'ብር' : 'ETB'}
                      </span>
                    </span>
                  </div>

                  <button
                    type="button"
                    className="px-3.5 py-2 bg-orange-50 group-hover:bg-gradient-to-r group-hover:from-[#F58220] group-hover:to-[#E07010] text-[#C25E00] group-hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs group-hover:shadow-[0_4px_12px_rgba(245,130,32,0.35)]"
                  >
                    <span>{t?.customizeThisProduct || 'አብጅ እና እዘዝ'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
