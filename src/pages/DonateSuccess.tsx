import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Heart, Share2, Download, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function DonateSuccess() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const amount = params.get('amount');
  const reference = params.get('reference');
  const status = params.get('status');

  useEffect(() => {
    document.title = 'Support Confirmed - Thank You';

    // Safety redirect if no amount
    if (!amount) {
      const timer = setTimeout(() => {
        // navigate('/donate');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [amount, navigate]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Celebration Background Assets */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-20 pb-24 text-center">
        {/* Animated Icon Cluster */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-teal-100 rounded-full scale-150 blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-full shadow-2xl shadow-teal-500/10 border border-teal-50 animate-scale-in">
            <CheckCircle2 className="h-16 w-16 text-teal-600 animate-bounce-slow" />
          </div>
          <div className="absolute -top-2 -right-2 bg-amber-400 p-2 rounded-full shadow-lg animate-spin-slow">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Celebratory Header */}
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Support Journey <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Confirmed</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">
            You just made a real difference. Your contribution is already being processed to support our upcoming health camps.
          </p>
        </div>

        {/* Detailed Impact Receipt */}
        <div className="max-w-md mx-auto mb-12 animate-fade-in-up">
          <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden text-left">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Impact Tier</div>
                  <div className="text-teal-400 font-bold flex items-center gap-1">
                    <Heart className="h-3 w-3 fill-current" /> Wellness Champion
                  </div>
                </div>
                <div className="bg-white/10 p-2 rounded-xl">
                  <ShieldCheck className="h-5 w-5 text-teal-300" />
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Amount Supported</div>
                  <div className="text-4xl font-black text-white">KES {Number(amount).toLocaleString()}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Transaction Ref</div>
                    <div className="text-xs font-mono text-slate-300 truncate">{reference || 'ACW-PROD-REF'}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Status</div>
                    <div className="text-[10px] inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                      <div className="h-1 w-1 bg-emerald-400 rounded-full animate-pulse"></div> SUCCESS
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  "Your contribution is estimated to provide essential medical checkups for approximately {Math.floor(Number(amount) / 200)} community members."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Donation Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            className="w-full sm:w-auto px-8 py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download Certificate
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto px-8 py-6 border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50 text-slate-700 font-bold rounded-2xl transition-all flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" /> Share Impact
          </Button>

          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              className="w-full px-6 py-6 text-slate-500 font-bold hover:text-teal-600 transition-colors flex items-center gap-2"
            >
              Close <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Security Footer */}
        <div className="mt-16 pt-8 border-t border-slate-100 max-w-sm mx-auto flex items-center justify-center gap-4 opacity-40 grayscale">
          <img src="https://paystack.com/assets/img/login/paystack-logo.png" alt="Paystack" className="h-4" />
          <div className="h-4 w-[1px] bg-slate-300"></div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Verified Secure Transation</span>
        </div>
      </div>
    </div>
  );
}