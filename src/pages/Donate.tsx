import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone, Banknote, Heart, Shield, CheckCircle, User, Mail, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_a34e17221aacc87c92a1ce7951f86498292aeb88';

export default function Donate() {
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [amount, setAmount] = useState<number>(1000);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [method, setMethod] = useState<'mpesa' | 'card' | 'bank'>('card');
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Donate - ACW';
  }, []);

  const donationAmounts = [500, 1000, 2000, 5000, 10000];

  const sanitizeAmount = (value: number) => {
    if (!Number.isFinite(value) || value < 100) return 100;
    return Math.round(value);
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: email || 'donor@example.com',
    amount: sanitizeAmount(amount) * 100, // Paystack amount is in kobo/cents
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: "KES",
    metadata: {
      custom_fields: [
        {
          display_name: "Donor Name",
          variable_name: "donor_name",
          value: name
        }
      ]
    },
    callback_url: `${window.location.origin}/donate/success?amount=${amount}&status=success`
  };

  const initializePayment = usePaystackPayment(config);

  interface PaystackResponse {
    reference: string;
    trxref?: string;
    status: string;
    message: string;
    transaction: string;
  }

  const onSuccess = (reference: PaystackResponse) => {
    setLoading(false);
    setIsProcessing(false);
    // Use window.location.origin to ensure absolute URL if needed, but navigate is fine for SPA
    const ref = reference.reference || reference.trxref;
    navigate(`/donate/success?amount=${amount}&reference=${ref}&status=success`);
  };

  const onClose = () => {
    setLoading(false);
    setIsProcessing(false);
  };

  const handleDonation = () => {
    if (!email) {
      toast({
        title: "Required Information",
        description: "Please enter your email to proceed with the donation.",
        variant: "destructive"
      });
      return;
    }

    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setIsProcessing(true);

    // Call initializePayment directly to avoid browser popup blocks
    // react-paystack initializePayment takes an object with onSuccess/onClose or handles it via config
    initializePayment({ onSuccess, onClose });
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
            {/* Donation Workflow Steps */}
            <div className="lg:col-span-2">
              {step === 1 ? (
                <div className="relative rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 animate-fade-in-up">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Amount (KES)</h2>
                    <p className="text-slate-500 text-sm mb-6">Choose an amount to support our health initiatives</p>

                    <div className="grid grid-cols-3 gap-3 mb-8">
                      {donationAmounts.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setAmount(amt)}
                          className={`py-4 rounded-2xl border-2 font-bold transition-all duration-300 ${amount === amt
                            ? 'border-teal-500 bg-teal-50 text-teal-700 scale-105 shadow-md shadow-teal-500/10'
                            : 'border-slate-100 text-slate-600 hover:border-teal-200 hover:bg-slate-50/50'
                            }`}
                        >
                          {amt.toLocaleString()}
                        </button>
                      ))}
                    </div>

                    {/* Donor Info Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <User className="h-4 w-4 text-teal-600" /> Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-teal-500 transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          <Mail className="h-4 w-4 text-teal-600" /> Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-teal-500 transition-all outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div className="mb-0">
                      <label className="text-sm font-bold text-slate-700 block mb-2">Custom Amount</label>
                      <div className="relative group">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-teal-600 transition-colors">KES</span>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(sanitizeAmount(Number(e.target.value)))}
                          className="w-full pl-16 pr-6 py-4 text-2xl font-black bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-teal-500 transition-all outline-none"
                          min={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 animate-slide-in-right">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-teal-600 font-bold text-sm mb-6 hover:gap-3 transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Details
                  </button>

                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Review & Pay</h2>
                    <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between border-b border-slate-200 pb-4">
                        <span className="text-slate-500 font-medium">Support Amount</span>
                        <span className="text-slate-900 font-black">KES {amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-4">
                        <span className="text-slate-500 font-medium">Donor Name</span>
                        <span className="text-slate-900 font-bold">{name || 'Anonymous'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">Email</span>
                        <span className="text-slate-900 font-bold">{email}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-4">Select Payment Method</h3>
                  <div className="grid gap-3 mb-8">
                    <button
                      onClick={() => setMethod('mpesa')}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${method === 'mpesa'
                        ? 'border-green-500 bg-green-50/50'
                        : 'border-slate-100 hover:border-slate-200'
                        }`}
                    >
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${method === 'mpesa' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                        <Smartphone className="h-6 w-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-slate-900">M-Pesa</div>
                        <div className="text-xs text-slate-500">Fast & Secure Mobile Money</div>
                      </div>
                      {method === 'mpesa' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </button>

                    <button
                      onClick={() => setMethod('card')}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${method === 'card'
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-slate-100 hover:border-slate-200'
                        }`}
                    >
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${method === 'card' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-slate-900">Card / Banking</div>
                        <div className="text-xs text-slate-500">Visa, Mastercard, Bank Deposit</div>
                      </div>
                      {method === 'card' && <CheckCircle className="h-5 w-5 text-blue-500" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Trust Section */}
              <div className="mt-8 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">PCI-DSS Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Community Impact</span>
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
                    {amount && !isNaN(Number(amount)) && (
                      <div className="flex justify-between border-b pb-2">
                        <strong>Amount:</strong>
                        <span className="text-teal-600 font-bold">Ksh {Number(amount).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Total</span>
                      <span className="text-2xl font-bold text-amber-300">
                        KES {(sanitizeAmount(amount) + sanitizeAmount(amount) * 0.015).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {(method === 'mpesa' || method === 'card') && (
                  <button
                    onClick={handleDonation}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl shadow-soft-xl hover:shadow-soft-2xl hover-lift transition-all disabled:opacity-50 text-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Processing Payment...
                      </span>
                    ) : (
                      `Donate KES ${amount.toLocaleString()}`
                    )}
                  </button>
                )}

                {method === 'bank' && (
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4 text-sm">
                      <div className="font-medium mb-2">Bank Transfer</div>
                      <div className="space-y-2 text-slate-300">
                        <p>For bank transfer details, please contact us at:</p>
                        <div className="bg-white/5 rounded p-2">
                          <div>Email: info@a-cw.org</div>
                          <div>Phone: 0718271543</div>
                        </div>
                        <p className="text-xs text-amber-300 pt-2">We'll provide you with our bank account information securely.</p>
                      </div>
                    </div>
                    <Link to="/contact">
                      <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-lg hover:shadow-lg transition-all">
                        Contact Us
                      </button>
                    </Link>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                  <p className="text-xs text-slate-400">Secured with Paystack • PCI-DSS Compliant</p>
                </div>
              </div>

              <div className="mt-4 bg-teal-50 rounded-lg p-4 border border-teal-100">
                <div className="flex items-center gap-2 text-teal-700 mb-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-medium">Your Impact</span>
                </div>
                <p className="text-xs text-slate-600">
                  KES {amount} can provide health supplies for {Math.floor(amount / 100)} people
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stepper Indicator */}
        <div className="mt-8 flex justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-400'}`}>1</div>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= 1 ? 'text-teal-700' : 'text-slate-400'}`}>Details</span>
          </div>
          <div className="w-12 h-[2px] bg-slate-200 self-center mt-[-20px]"></div>
          <div className="flex flex-col items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-400'}`}>2</div>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${step >= 2 ? 'text-teal-700' : 'text-slate-400'}`}>Payment</span>
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
  );
}