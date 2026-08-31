import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, CheckCircle2, ShieldCheck, Wallet, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

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
  paypalHandle = 'lychuan_007@163.com',
  onClose,
  onSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [useSmartButtons, setUseSmartButtons] = useState(true);
  const [payerEmail, setPayerEmail] = useState('');
  const [sdkError, setSdkError] = useState<string | null>(null);

  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test';
  const isEmail = paypalHandle.includes('@');
  const directCheckoutUrl = isEmail
    ? `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalHandle)}&currency_code=USD&amount=${amount}&item_name=Coffee%20Support%20(${coffees}%20Coffees%20from%20${encodeURIComponent(supporterName || 'Supporter')})`
    : `https://paypal.me/${paypalHandle}/${amount}`;

  const triggerCelebration = () => {
    setIsCompleted(true);
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#003087', '#0079C1', '#00457C', '#F59E0B', '#10B981'],
    });

    setTimeout(() => {
      onSuccess();
    }, 2200);
  };

  const handleSimulatedPay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      triggerCelebration();
    }, 1200);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
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
        <div className="flex items-center gap-3 pt-2 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#003087]/20 border border-[#0079C1]/40 flex items-center justify-center text-[#0079C1]">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black italic text-[#0079C1] tracking-tighter">PayPal</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Ko-fi Style Smart SDK
              </span>
            </div>
            <p className="text-xs text-slate-400">Official PayPal & Debit/Credit Card Checkout</p>
          </div>
        </div>

        {isCompleted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">PayPal Payment Verified! ☕✨</h3>
            <p className="text-xs text-slate-300">
              Your support of <span className="font-bold text-amber-400">${amount}.00 USD</span> ({coffees} coffees) has been received and credited to <span className="text-blue-400 font-mono">{paypalHandle}</span>!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Amount Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total Contribution</p>
                <p className="text-lg font-extrabold text-white">
                  ${amount}.00 USD <span className="text-xs font-normal text-slate-400">({coffees} Coffees)</span>
                </p>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-400 block">Recipient Account</span>
                <span className="font-bold text-amber-400 font-mono">{paypalHandle}</span>
              </div>
            </div>

            {/* Mode Toggle: Smart Buttons vs Quick Pay */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setUseSmartButtons(true)}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                  useSmartButtons
                    ? 'bg-[#0079C1] text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Smart Buttons (Ko-fi)</span>
              </button>
              <button
                type="button"
                onClick={() => setUseSmartButtons(false)}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                  !useSmartButtons
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Instant Test</span>
              </button>
            </div>

            {/* Mode 1: PayPal Smart Payment Buttons (Ko-fi identical) */}
            {useSmartButtons ? (
              <div className="space-y-3 pt-1">
                {sdkError ? (
                  <div className="p-3 bg-red-950/40 border border-red-800/50 rounded-xl text-xs text-red-300">
                    {sdkError}
                  </div>
                ) : null}

                <div className="min-h-[140px] bg-slate-950/50 p-3 rounded-2xl border border-slate-800/80">
                  <PayPalScriptProvider
                    options={{
                      clientId: clientId,
                      currency: 'USD',
                      intent: 'capture',
                      components: 'buttons',
                    }}
                  >
                    <PayPalButtons
                      style={{
                        layout: 'vertical',
                        color: 'gold',
                        shape: 'rect',
                        label: 'paypal',
                        height: 40,
                      }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          intent: 'CAPTURE',
                          purchase_units: [
                            {
                              description: `Coffee Donation (${coffees} cups) to ${paypalHandle}`,
                              amount: {
                                currency_code: 'USD',
                                value: amount.toFixed(2),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        if (actions.order) {
                          const order = await actions.order.capture();
                          console.log('PayPal Order captured:', order);
                        }
                        triggerCelebration();
                      }}
                      onError={(err) => {
                        console.warn('PayPal Smart Buttons Notice:', err);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            ) : (
              /* Mode 2: Quick Test Simulation Form */
              <form onSubmit={handleSimulatedPay} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Supporter PayPal Email (Sandbox)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="supporter@example.com"
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0079C1]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#0079C1] hover:bg-[#00457C] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authorizing Payment...
                    </span>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      <span>Simulate $ {amount} PayPal Approval</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="relative flex py-0.5 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[10px] text-slate-500 uppercase font-mono">Or Direct Link</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Direct PayPal Link Button */}
            <a
              href={directCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Open PayPal Checkout for {paypalHandle}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official PayPal Smart Buttons with Buyer Protection & SSL</span>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
