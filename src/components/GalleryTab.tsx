import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Image as ImageIcon, Maximize2, X, Sparkles } from 'lucide-react';

interface GalleryTabProps {
  gallery: GalleryItem[];
}

export const GalleryTab: React.FC<GalleryTabProps> = ({ gallery }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Plugin Showcase & Architecture Gallery
            </h2>
            <p className="text-xs text-slate-400">
              Screenshots, performance benchmarks, and UI workflows of ZenCoder's Obsidian tools
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 relative"
          >
            <div className="h-64 w-full overflow-hidden bg-slate-950 relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 rounded-full bg-amber-500 text-slate-950 shadow-xl">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="p-5 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                {item.category}
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 space-y-1">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
