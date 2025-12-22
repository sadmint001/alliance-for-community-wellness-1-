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

        <div className="space-y-2 text-left max-w-sm mx-auto text-sm text-gray-700 mb-6">
          {amount && (<div><strong>Amount:</strong> Ksh {Number(amount).toLocaleString()}</div>)}
          {method && (<div><strong>Method:</strong> {method}</div>)}
          <div><strong>Status:</strong> {status}</div>
          {reference && (<div><strong>Reference:</strong> {reference}</div>)}
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