import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, ShieldCheck, Wallet } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PayPalModalProps {
  amount: number;
  coffees: number;
  supporterName: string;
  message: string;
  isMonthly: boolean;
  isAnonymous: boolean;
  paypalHandle?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const PayPalModal: React.FC<PayPalModalProps> = ({
  amount,
  coffees,
  supporterName,
  message,
  isMonthly,
  isAnonymous,
  paypalHandle = 'zencoder',
  onClose,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');

  const paypalMeUrl = `https://paypal.me/${paypalHandle}/${amount}`;

  const handleSimulatedPay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#003087', '#0079C1', '#00457C', '#F59E0B'],
      });

      setTimeout(() => {
        onSuccess();
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Top PayPal Brand Strip */}
        <div className="h-2 bg-gradient-to-r from-[#003087] via-[#0079C1] to-[#00457C] absolute top-0 left-0 right-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PayPal Header */}
        <div className="flex items-center gap-3 pt-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#003087]/20 border border-[#0079C1]/40 flex items-center justify-center text-[#0079C1]">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black italic text-[#0079C1] tracking-tighter">PayPal</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                Express Checkout
              </span>
            </div>
            <p className="text-xs text-slate-400">Pay securely to ZenCoder via PayPal</p>
          </div>
        </div>

        {isCompleted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">PayPal Payment Verified! ☕✨</h3>
            <p className="text-xs text-slate-300">
              Your support of <span className="font-bold text-amber-400">${amount} USD</span> ({coffees} coffees) has been received and posted!
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Amount Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total Contribution</p>
                <p className="text-lg font-extrabold text-white">
                  ${amount}.00 USD <span className="text-xs font-normal text-slate-400">({coffees} Coffees)</span>
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-400 block">Recipient</span>
                <span className="font-bold text-amber-400">@{paypalHandle}</span>
              </div>
            </div>

            {/* Simulated PayPal Checkout Form */}
            <form onSubmit={handleSimulatedPay} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  PayPal Account Email (Sandbox/Test)
                </label>
                <input
                  type="email"
                  required
                  placeholder="your-paypal-email@example.com"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0079C1]"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#0079C1] hover:bg-[#00457C] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting PayPal API...
                  </span>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    <span>Pay ${amount} with PayPal Sandbox</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase font-mono">Or Direct Link</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Direct PayPal.me Link Button */}
            <a
              href={paypalMeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Open paypal.me/{paypalHandle} in new tab</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Protected by PayPal Buyer Protection & SSL Encryption</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
