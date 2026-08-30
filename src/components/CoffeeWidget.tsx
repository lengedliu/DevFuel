import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Coffee, Heart, CheckCircle2, Sparkles, Lock, Wallet, CreditCard } from 'lucide-react';
import { PayPalModal } from './PayPalModal';

interface CoffeeWidgetProps {
  coffeePrice: number;
  paypalHandle?: string;
  onSendCoffee: (data: {
    coffees: number;
    amount: number;
    name: string;
    message: string;
    isAnonymous: boolean;
    isMonthly: boolean;
  }) => void;
}

export const CoffeeWidget: React.FC<CoffeeWidgetProps> = ({ coffeePrice, paypalHandle = 'zencoder', onSendCoffee }) => {
  const [coffees, setCoffees] = useState<number>(3);
  const [customCoffees, setCustomCoffees] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('paypal');
  const [showPayPalModal, setShowPayPalModal] = useState<boolean>(false);

  const selectedCoffees = isCustom ? (parseInt(customCoffees, 10) || 1) : coffees;
  const totalAmount = selectedCoffees * coffeePrice;

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'paypal') {
      setShowPayPalModal(true);
      return;
    }

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#3B82F6'],
    });

    onSendCoffee({
      coffees: selectedCoffees,
      amount: totalAmount,
      name: isAnonymous ? 'Someone' : (name.trim() || 'Generous Supporter'),
      message: message.trim(),
      isAnonymous,
      isMonthly,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setMessage('');
    }, 4000);
  };

  const handlePayPalSuccess = () => {
    setShowPayPalModal(false);

    onSendCoffee({
      coffees: selectedCoffees,
      amount: totalAmount,
      name: isAnonymous ? 'Someone' : (name.trim() || 'Generous Supporter'),
      message: message.trim(),
      isAnonymous,
      isMonthly,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setMessage('');
    }, 4000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
      {/* Decorative subtle background glow */}
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
          <Coffee className="w-5 h-5 fill-slate-950" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            Buy ZenCoder a Coffee
          </h2>
          <p className="text-xs text-slate-400">
            Each coffee is ${coffeePrice} to keep sync servers & plugins running
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-3 animate-fade-in">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">Thank You for Supporting! ☕✨</h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            Your support of <strong className="text-amber-400">${totalAmount} ({selectedCoffees} Coffees)</strong> was received and posted to the live feed!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSupportSubmit} className="space-y-5">
          {/* Contribution Frequency Radio */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setIsMonthly(false)}
              className={`py-2 text-xs font-semibold rounded-xl transition-all ${
                !isMonthly
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              One-Time Support
            </button>
            <button
              type="button"
              onClick={() => setIsMonthly(true)}
              className={`py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                isMonthly
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Monthly Support</span>
            </button>
          </div>

          {/* Coffee Count Preset Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Select Coffee Amount</span>
              <span className="text-amber-400 font-mono">${totalAmount} total</span>
            </label>

            <div className="grid grid-cols-4 gap-2">
              {[1, 3, 5].map((num) => {
                const isSelected = !isCustom && coffees === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setIsCustom(false);
                      setCoffees(num);
                    }}
                    className={`flex flex-col items-center justify-center py-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="text-base font-extrabold flex items-center gap-1">
                      ☕ {num}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">${num * coffeePrice}</span>
                  </button>
                );
              })}

              {/* Custom Input Toggle */}
              <button
                type="button"
                onClick={() => setIsCustom(true)}
                className={`flex flex-col items-center justify-center py-3 rounded-2xl border transition-all ${
                  isCustom
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <span className="text-xs font-bold">Custom</span>
                <span className="text-[11px] text-slate-400">Qty</span>
              </button>
            </div>

            {isCustom && (
              <div className="pt-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={customCoffees}
                  onChange={(e) => setCustomCoffees(e.target.value)}
                  placeholder="Enter custom coffee count (e.g. 10)"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-amber-500/50 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Name & Anonymous Field */}
          <div className="space-y-3">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isAnonymous}
                placeholder={isAnonymous ? 'Anonymous Supporter' : 'Your name or @social handle (optional)'}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-amber-500/50 disabled:opacity-50"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-200 select-none">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
              />
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Make this contribution anonymous
              </span>
            </label>
          </div>

          {/* Message Textarea */}
          <div>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a note or feedback for ZenCoder (e.g. Love your VaultSync Pro plugin!)..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-amber-500/50 resize-none"
            />
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Payment Gateway</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'paypal'
                    ? 'bg-[#0079C1]/20 border-[#0079C1] text-white shadow-md shadow-blue-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Wallet className="w-4 h-4 text-[#0079C1]" />
                <span>PayPal</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Credit Card</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-xl transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer ${
              paymentMethod === 'paypal'
                ? 'bg-[#0079C1] hover:bg-[#00457C] text-white shadow-blue-500/20'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
            }`}
          >
            {paymentMethod === 'paypal' ? (
              <>
                <Wallet className="w-4 h-4" />
                <span>Pay ${totalAmount} with PayPal</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>
                  Support ${totalAmount} {isMonthly ? '/ month' : ''} ({selectedCoffees} {selectedCoffees === 1 ? 'Coffee' : 'Coffees'})
                </span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-500">
            🔒 Protected by {paymentMethod === 'paypal' ? 'PayPal Buyer Protection' : '256-Bit SSL Encryption'}
          </p>
        </form>
      )}

      {/* Render PayPal Modal */}
      {showPayPalModal && (
        <PayPalModal
          amount={totalAmount}
          coffees={selectedCoffees}
          supporterName={isAnonymous ? 'Someone' : (name.trim() || 'Generous Supporter')}
          message={message.trim()}
          isMonthly={isMonthly}
          isAnonymous={isAnonymous}
          paypalHandle={paypalHandle}
          onClose={() => setShowPayPalModal(false)}
          onSuccess={handlePayPalSuccess}
        />
      )}
    </div>
  );
};
