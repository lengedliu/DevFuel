import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Key, Download, CreditCard, ShieldCheck, Copy, Check } from 'lucide-react';

interface CheckoutModalProps {
  title: string;
  price: number;
  itemType: 'coffee' | 'shop' | 'tier';
  requiresKey?: boolean;
  onClose: () => void;
  onSuccess: (details: { licenseKey?: string; email: string }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  title,
  price,
  itemType,
  requiresKey = false,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [generatedKey, setGeneratedKey] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  const generateMockLicenseKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const randChunk = (len: number) =>
      Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `HNK-2026-${randChunk(4)}-${randChunk(4)}-${randChunk(4)}`;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      const key = requiresKey ? generateMockLicenseKey() : undefined;
      if (key) setGeneratedKey(key);

      // Confetti burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });

      onSuccess({ licenseKey: key, email });
    }, 1200);
  };

  const handleCopyKey = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-7 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isCompleted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Payment Successful! 🎉</h3>
              <p className="text-xs text-slate-300">
                Thank you for supporting HaierKeys' development work!
              </p>
            </div>

            {/* If License Key Required */}
            {generatedKey ? (
              <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/40 space-y-2 text-left">
                <div className="flex items-center justify-between text-xs text-amber-400 font-mono font-bold">
                  <span className="flex items-center gap-1">
                    <Key className="w-3.5 h-3.5" /> License Key
                  </span>
                  <span>Pro Activation</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-slate-900 rounded-xl text-amber-300 font-mono text-sm font-bold border border-slate-800 select-all">
                    {generatedKey}
                  </code>
                  <button
                    onClick={handleCopyKey}
                    className="p-2.5 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold text-xs"
                    title="Copy License Key"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Paste this key into Obsidian Settings → Fast Note Sync → Activation.
                </p>
              </div>
            ) : (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1 text-center">
                <Download className="w-6 h-6 text-blue-400 mx-auto" />
                <p className="text-xs font-bold text-white">Download Package Ready</p>
                <p className="text-[11px] text-slate-400">
                  A receipt & download link was sent to {email || 'your email'}.
                </p>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay} className="space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                Ko-fi Test Checkout
              </span>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <div className="flex items-baseline gap-1 text-amber-400 font-mono">
                <span className="text-2xl font-extrabold">${price}</span>
                <span className="text-xs text-slate-400 font-normal">
                  {itemType === 'tier' ? '/ month' : 'one-time'}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300">Email Address (for receipt/license)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full mt-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Cardholder Name</label>
                <input
                  type="text"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full mt-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Test Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={cardNumber}
                    className="w-full mt-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-mono cursor-not-allowed"
                  />
                  <CreditCard className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isProcessing ? (
                  <span>Processing Test Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-slate-950" />
                    <span>Confirm & Pay ${price}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-500">
              🔒 Simulated Sandbox Mode • No actual charge will occur
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
