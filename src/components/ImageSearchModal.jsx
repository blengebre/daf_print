import React, { useState } from 'react';
import { Search, Upload, Link as LinkIcon, Sparkles, Image as ImageIcon, X, Check, Filter } from 'lucide-react';
import { ART_CATEGORIES, ART_PRESETS, ONLINE_SEARCH_SUGGESTIONS } from '../data/artLibrary';

export default function ImageSearchModal({
  isOpen,
  onClose,
  onSelectImage,
  onUploadFile
}) {
  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'upload' | 'url'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');

  if (!isOpen) return null;

  // Filter curated library based on search term & category
  const filteredPresets = ART_PRESETS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  // Handle URL submit
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    if (!urlInput.startsWith('http://') && !urlInput.startsWith('https://') && !urlInput.startsWith('data:image')) {
      setUrlError('Please enter a valid URL starting with https:// or http://');
      return;
    }

    setUrlError('');
    onSelectImage(urlInput.trim(), 'Web Image Link');
    onClose();
  };

  // Convert SVG string to Data URI for seamless canvas rendering
  const handleSelectSvgPreset = (preset) => {
    let src = preset.url;
    if (!src && preset.svg) {
      src = `data:image/svg+xml;utf8,${encodeURIComponent(preset.svg)}`;
    }
    onSelectImage(src, preset.title);
    onClose();
  };

  // File upload input handler
  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadFile(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Artwork & Image Studio</span>
            </h3>
            <p className="text-xs text-slate-500">
              Search curated Ethiopian graphics, enter any image URL, or upload your own file
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-200/70 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-6">
          <button
            onClick={() => setActiveTab('search')}
            className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition ${
              activeTab === 'search'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Search Graphic Library</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition ${
              activeTab === 'upload'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload From Device</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`py-3 text-sm font-semibold border-b-2 flex items-center gap-2 transition ${
              activeTab === 'url'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Enter Image Link (URL)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: SEARCH & BROWSE */}
          {activeTab === 'search' && (
            <div className="space-y-4">
              {/* Search Bar Beside */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search graphics (e.g. coffee, buna, lion, addis, seal, quotes...)"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {ART_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid of Results */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {filteredPresets.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectSvgPreset(item)}
                    className="group relative bg-slate-50 hover:bg-blue-50/40 rounded-xl p-3 border border-slate-200 hover:border-blue-300 cursor-pointer transition flex flex-col items-center justify-between text-center gap-2 hover:shadow-xs"
                  >
                    <div className="w-20 h-20 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center text-slate-800 group-hover:scale-105 transition shadow-xs">
                      {item.svg ? (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: item.svg }}
                        />
                      ) : (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{item.title}</p>
                      <span className="text-[10px] text-slate-500 font-medium">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPresets.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-sm text-slate-500">No artwork found matching "{searchQuery}".</p>
                  <p className="text-xs text-blue-600 font-semibold mt-1">Try searching "coffee", "lion", or switch to URL/Upload tab!</p>
                </div>
              )}

              {/* Online photo suggestions (Unsplash direct quick options) */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  High-Res Photo Inspirations:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {ONLINE_SEARCH_SUGGESTIONS[0].results.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => {
                        onSelectImage(photo.url, photo.title);
                        onClose();
                      }}
                      className="group relative h-20 rounded-xl overflow-hidden cursor-pointer border border-slate-200 hover:border-blue-400"
                    >
                      <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent flex items-end p-1.5">
                        <span className="text-[10px] font-medium text-white truncate">{photo.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOCAL FILE UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <label
                htmlFor="file-upload-input"
                className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/20 hover:bg-blue-50/50 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition group"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                  <Upload className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">
                  Click to Browse or Drag & Drop Image
                </h4>
                <p className="text-xs text-slate-500 max-w-sm">
                  Supports PNG, JPG, JPEG, SVG, WebP up to 25MB. High resolution recommended (300 DPI) for best print results.
                </p>
                <span className="mt-4 px-4 py-2 bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition">
                  Choose File From Computer
                </span>
                <input
                  id="file-upload-input"
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <p className="font-bold">Automatic AI Proportion Optimization Included</p>
                  <p className="text-amber-700 mt-0.5">
                    When you upload your picture, our AI engine automatically analyzes the aspect ratio and positions it perfectly centered on your chosen product.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IMAGE LINK / URL */}
          {activeTab === 'url' && (
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Paste Direct Image Address / Web Link:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => {
                      setUrlInput(e.target.value);
                      setUrlError('');
                    }}
                    placeholder="https://example.com/my-cool-logo.png"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition"
                  >
                    Apply Image
                  </button>
                </div>
                {urlError && <p className="text-xs text-rose-600 mt-1.5">{urlError}</p>}
              </div>

              {urlInput && (
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center">
                    <img
                      src={urlInput}
                      alt="URL Preview"
                      className="w-full h-full object-contain"
                      onError={() => setUrlError('Could not load image from this URL. Please verify the link.')}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Ready to print</p>
                    <p className="text-[11px] text-slate-500">Click "Apply Image" or hit Enter to place it directly on your mockup!</p>
                  </div>
                </div>
              )}

              <div className="text-xs text-slate-500 bg-slate-100 p-3 rounded-xl space-y-1">
                <p className="font-semibold text-slate-700">Quick Test Links you can copy & paste:</p>
                <p className="font-mono text-[11px] text-blue-600 break-all cursor-pointer hover:underline" onClick={() => setUrlInput('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500')}>
                  https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500 (Coffee Cup)
                </p>
                <p className="font-mono text-[11px] text-blue-600 break-all cursor-pointer hover:underline" onClick={() => setUrlInput('https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500')}>
                  https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=500 (Majestic Lion)
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
