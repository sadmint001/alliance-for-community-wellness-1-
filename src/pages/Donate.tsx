import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone, Banknote, Heart, Shield, CheckCircle } from 'lucide-react';

const PESAPAL_BASE = import.meta.env.VITE_PESAPAL_URL || 'https://payments.pesapal.com/v3/ACW/donate';
const PESAPAL_CALLBACK = import.meta.env.VITE_PESAPAL_CALLBACK || `${window.location.origin}/donate/success`;

export default function Donate() {
  const [amount, setAmount] = useState<number>(1000);
  const [method, setMethod] = useState<'mpesa' | 'card' | 'bank'>('mpesa');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Donate - ACW';
  }, []);

  const donationAmounts = [500, 1000, 2000, 5000, 10000];

  const sanitizeAmount = (value: number) => {
    if (!Number.isFinite(value) || value < 100) return 100;
    return Math.round(value);
  };

  const handleMpesaDonation = async () => {
    setLoading(true);
    const safe = sanitizeAmount(amount);
    const cb = encodeURIComponent(PESAPAL_CALLBACK);
    window.location.href = `${PESAPAL_BASE}?amount=${safe}&method=mpesa&callback=${cb}`;
  };

  const handleCardDonation = async () => {
    setLoading(true);
    const safe = sanitizeAmount(amount);
    const cb = encodeURIComponent(PESAPAL_CALLBACK);
    window.location.href = `${PESAPAL_BASE}?amount=${safe}&method=card&callback=${cb}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/20 to-teal-50/10">
      {/* Compact Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-800 pt-20 pb-16 text-center text-white">
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
            <Heart className="h-3 w-3 text-rose-300" />
            <span className="text-xs font-medium text-rose-200">Support Community Wellness</span>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            <span className="bg-gradient-to-r from-white via-teal-100 to-amber-100 bg-clip-text text-transparent">
              Make a Donation
            </span>
          </h1>
          
          <p className="mx-auto max-w-xl text-base text-gray-300">
            Your contribution directly supports community health initiatives
          </p>
        </div>
      </div>

      {/* Donation Section - Compact Layout */}
      <div className="relative -mt-8 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Donation Options */}
            <div className="lg:col-span-2">
              <div className="relative rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-100">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Select Amount (KES)</h2>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {donationAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className={`py-3 rounded-lg border-2 font-medium transition-all ${
                          amount === amt
                            ? 'border-teal-500 bg-teal-50 text-teal-700 scale-105'
                            : 'border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-slate-50'
                        }`}
                      >
                        {amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Custom Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-600">KES</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(sanitizeAmount(Number(e.target.value)))}
                        className="w-full pl-14 pr-4 py-3 text-lg font-medium border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-300"
                        min={100}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Minimum: KES 100</p>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Method</h2>
                    <div className="grid gap-3">
                      <button
                        onClick={() => setMethod('mpesa')}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                          method === 'mpesa'
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          method === 'mpesa' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-slate-900">M-Pesa</div>
                          <div className="text-sm text-slate-600">Instant mobile payment</div>
                        </div>
                        {method === 'mpesa' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </button>

                      <button
                        onClick={() => setMethod('card')}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                          method === 'card'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          method === 'card' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-slate-900">Credit/Debit Card</div>
                          <div className="text-sm text-slate-600">Visa, Mastercard, Amex</div>
                        </div>
                        {method === 'card' && <CheckCircle className="h-5 w-5 text-blue-500" />}
                      </button>

                      <button
                        onClick={() => setMethod('bank')}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                          method === 'bank'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          method === 'bank' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Banknote className="h-5 w-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-slate-900">Bank Transfer</div>
                          <div className="text-sm text-slate-600">Direct bank deposit</div>
                        </div>
                        {method === 'bank' && <CheckCircle className="h-5 w-5 text-purple-500" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg border border-slate-100 text-center">
                  <div className="text-teal-600 font-bold text-lg mb-1">98%</div>
                  <div className="text-xs text-slate-600">Direct to programs</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-100 text-center">
                  <div className="text-teal-600 font-bold text-lg mb-1">Secure</div>
                  <div className="text-xs text-slate-600">Encrypted payment</div>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="relative rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 p-6 shadow-xl text-white">
                  <h3 className="text-lg font-bold mb-4">Donation Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-slate-300">Donation</span>
                      <span className="font-bold">KES {sanitizeAmount(amount).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Transaction Fee</span>
                      <span className="text-slate-300">KES {(sanitizeAmount(amount) * 0.015).toFixed(0)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Shield className="h-4 w-4 text-teal-400" />
                      <span>Secure & encrypted</span>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Total</span>
                        <span className="text-2xl font-bold text-amber-300">
                          KES {(sanitizeAmount(amount) + sanitizeAmount(amount) * 0.015).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {method === 'mpesa' && (
                    <button
                      onClick={handleMpesaDonation}
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Processing...
                        </span>
                      ) : (
                        'Donate with M-Pesa'
                      )}
                    </button>
                  )}

                  {method === 'card' && (
                    <button
                      onClick={handleCardDonation}
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Processing...
                        </span>
                      ) : (
                        'Donate with Card'
                      )}
                    </button>
                  )}

                  {method === 'bank' && (
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-lg p-4 text-sm">
                        <div className="font-medium mb-2">Bank Details:</div>
                        <div className="space-y-1 text-slate-300">
                          <div>Equity Bank</div>
                          <div>Acc: 1234567890</div>
                          <div>Alliance for Community Wellness</div>
                          <div className="pt-2 text-amber-300 font-medium">Ref: ACW-DONATION</div>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-lg hover:shadow-lg transition-all">
                        Confirm Transfer
                      </button>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <p className="text-xs text-slate-400">Powered by Pesapal • SSL Secured</p>
                  </div>
                </div>

                {/* Impact Note */}
                <div className="mt-4 bg-teal-50 rounded-lg p-4 border border-teal-100">
                  <div className="flex items-center gap-2 text-teal-700 mb-1">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-medium">Your Impact</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    KES {amount} can provide health supplies for {Math.floor(amount/100)} people
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="text-slate-700">
              <div className="text-lg font-bold text-teal-600">2,500+</div>
              <div className="text-xs">Lives Impacted</div>
            </div>
            <div className="text-slate-700">
              <div className="text-lg font-bold text-teal-600">50+</div>
              <div className="text-xs">Communities</div>
            </div>
            <div className="text-slate-700">
              <div className="text-lg font-bold text-teal-600">100%</div>
              <div className="text-xs">Transparent</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}