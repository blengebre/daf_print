import React from 'react';
import { ArrowRight, CheckCircle, Clock, PackageCheck, Sparkles, Phone, ShieldCheck, Zap } from 'lucide-react';

export default function HomeHeroSection({
  onExploreProducts,
  onOpenTracker,
  language = 'am',
  t
}) {
  return (
    <div className="space-y-10">
      {/* 1. 3D ADVANCED CLEAN HERO BANNER (REDUNDANT LOGO CARD REMOVED AS REQUESTED) */}
      <section className="relative rounded-3xl overflow-hidden bg-white text-slate-900 border border-slate-200/90 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.05)] p-6 sm:p-10 lg:p-14">
        {/* Subtle 3D Ambient Highlights in Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 via-amber-100/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-gradient-to-tr from-sky-100/20 via-pink-100/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 text-[#C25E00] text-xs font-bold border border-orange-200/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F58220] shadow-[0_0_8px_#F58220]"></span>
            <span>{t?.heroBadge || 'ዲ.ኤ.ኤፍ ማተሚያ ቤት • D.A.F Printing Plc'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
            {language === 'am' ? (
              <>
                የህትመት ፍላጎትዎን <span className="bg-gradient-to-r from-[#F58220] via-[#FA8A1E] to-[#E67300] bg-clip-text text-transparent">በጥራት እና በፍጥነት</span> ያሟሉ
              </>
            ) : (
              <>
                Custom Printing <span className="bg-gradient-to-r from-[#F58220] via-[#FA8A1E] to-[#E67300] bg-clip-text text-transparent">Made Simple & Fast</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
            {t?.heroSubtitle || 'በቲሸርት፣ ሴራሚክ ማግ፣ ህጋዊ ማህተም እና ስቲከሮች ላይ የራስዎን ጽሁፍ እና ፎቶ ያስገቡ። በቴሌብር ወይም በንግድ ባንክ ከፍለው በተረጋገጠ ሰዓት ይረከቡ።'}
          </p>

          {/* Direct Phone Numbers Callout & Guarantees */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] font-mono font-semibold">
              <Phone className="w-3.5 h-3.5 text-[#F58220]" />
              <span>0930 07 74 32</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] font-mono font-semibold">
              <Phone className="w-3.5 h-3.5 text-[#F58220]" />
              <span>09 1125 76 69</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50/80 border border-orange-200 text-[#C25E00] font-semibold text-xs shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'am' ? 'የጥራት ዋስትና ያለው ህትመት' : 'Guaranteed Quality Print'}</span>
            </div>
          </div>

          {/* 3D Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={onExploreProducts}
              className="btn-3d-primary px-7 py-3.5 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>{t?.heroCtaCustomize || 'ምርቶችን ይመልከቱ እና አሁኑኑ ይዘዙ'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenTracker}
              className="px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-sm transition active:translate-y-0.5"
            >
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{t?.heroCtaTrack || 'ትዕዛዝ መከታተያ'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. 3D ELEVATED 3-STEP GUIDE */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.04)] space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {t?.stepsHeaderTitle || 'በ 3 ቀላል ደረጃዎች የሚከናወን ፈጣን ህትመት'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t?.stepsHeaderSub || 'ከዲዛይን ምርጫ ጀምሮ በአዲስ አበባ እና በመላው ኢትዮጵያ እስከሚደርስዎት ድረስ'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="card-3d rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#FFA034] via-[#F58220] to-[#D96B0F] text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_10px_rgba(245,130,32,0.35)]">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {t?.step1Title || '1. የሚታተመውን ምርት ይምረጡ'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t?.step1Desc || 'ከቲሸርት፣ ማግ፣ ህጋዊ ማህተም፣ ስቲከር፣ የጨርቅ ቦርሳ ወይም ቆብ መካከል የሚፈልጉትን ይምረጡ።'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="card-3d rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#FFA034] via-[#F58220] to-[#D96B0F] text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_10px_rgba(245,130,32,0.35)]">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {t?.step2Title || '2. ጽሁፍ እና ፎቶ ያስገቡ'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t?.step2Desc || 'የሚጻፈውን ጽሁፍ ያስገቡ፣ ፎቶዎን ይጫኑ ወይም ከጎኑ ይፈልጉ። የኛ ስማርት AI በራሱ ያስተካክላል።'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="card-3d rounded-2xl p-5 border border-slate-200 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#FFA034] via-[#F58220] to-[#D96B0F] text-white flex items-center justify-center font-bold text-sm shadow-[0_4px_10px_rgba(245,130,32,0.35)]">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              {t?.step3Title || '3. በቴሌብር ወይም ንግድ ባንክ ይክፈሉ'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t?.step3Desc || 'በቴሌብር ወይም በኢትዮጵያ ንግድ ባንክ ክፍያ ፈጽመው የማረጋገጫ ደረሰኝ እና የሰዓት ቆጣሪ ይቀበሉ።'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
