import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function DonateSuccess() {
  const { search } = useLocation();

  useEffect(() => {
    document.title = 'Thank you - ACW';
  }, []);

  const params = new URLSearchParams(search);
  const amount = params.get('amount');
  const method = params.get('method');
  const status = params.get('status') || params.get('payment_status') || 'unknown';
  const reference = params.get('reference') || params.get('tx_ref');

  return (
    <div className="max-w-3xl mx-auto py-24 px-4 text-center">
      <div className="bg-white p-12 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-4">Thank you for your support!</h1>
        <p className="text-gray-600 mb-6">We appreciate your donation — it helps us continue our work in the community.</p>

        <div className="space-y-4 text-left max-w-sm mx-auto text-sm text-gray-700 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
          {amount && (<div className="flex justify-between border-b pb-2"><strong>Amount:</strong> <span className="text-teal-600 font-bold">Ksh {Number(amount).toLocaleString()}</span></div>)}
          <div className="flex justify-between border-b pb-2"><strong>Status:</strong> <span className="text-green-600 font-bold uppercase">{status}</span></div>
          {reference && (<div className="flex justify-between"><strong>Reference:</strong> <span className="font-mono text-xs">{reference}</span></div>)}
        </div>

        <div className="flex justify-center gap-3">
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link to="/donate">
            <Button>Make another donation</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}