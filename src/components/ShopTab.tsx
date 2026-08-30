import React, { useState } from 'react';
import { ShopItem } from '../types';
import { ShoppingBag, Key, Check, Download, Sparkles, Tag, Plus } from 'lucide-react';

interface ShopTabProps {
  items: ShopItem[];
  isCreatorMode: boolean;
  onBuyItem: (item: ShopItem) => void;
  onAddShopItem?: () => void;
}

export const ShopTab: React.FC<ShopTabProps> = ({
  items,
  isCreatorMode,
  onBuyItem,
  onAddShopItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'License', 'Plugin', 'Guide'];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              ZenCoder Digital Shop
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Pro licenses, Docker packages, self-hosted sync tools, and Obsidian workflow guides. All purchases directly fund server hosting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Category Filters */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isCreatorMode && onAddShopItem && (
            <button
              onClick={onAddShopItem}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          )}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden shadow-lg flex flex-col transition-all group"
          >
            {/* Image Header */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

              {/* Badge */}
              {item.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-extrabold tracking-wider shadow-md">
                  {item.badge}
                </div>
              )}

              {/* Price Tag */}
              <div className="absolute bottom-4 right-4 bg-slate-900/95 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-slate-700 shadow-xl font-mono">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-amber-400">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-slate-500 line-through">${item.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider font-semibold">
                    {item.category}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px] text-slate-500">{item.salesCount} sold</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Feature Bullet Points */}
                <ul className="mt-3 space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Action */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                  {item.requiresKey ? (
                    <>
                      <Key className="w-3.5 h-3.5 text-amber-400" /> Instant License Key
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-blue-400" /> Instant Package Download
                    </>
                  )}
                </span>

                <button
                  onClick={() => onBuyItem(item)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>Buy Product (${item.price})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
