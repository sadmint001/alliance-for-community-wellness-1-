import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BANK_DETAILS } from '@/lib/constants';
import { Copy, CreditCard, Smartphone, Heart, Hand, Briefcase, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const volunteerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(100, "Email must be less than 100 characters"),
  areaOfInterest: z.string().min(1, "Area of interest is required").max(100, "Area of interest must be less than 100 characters"),
  motivation: z.string().max(1000, "Motivation must be less than 1000 characters").optional()
});

const GetInvolved = () => {
  const [activeTab, setActiveTab] = useState<'donate' | 'volunteer' | 'partner'>('donate');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [volunteerForm, setVolunteerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    areaOfInterest: 'Community Health',
    motivation: ''
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${text} copied to clipboard`,
    });
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Honeypot check - if filled, silently reject (bot detected)
    if (honeypot) {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll be in touch soon.",
      });
      return;
    }

    // Validate form data
    const result = volunteerSchema.safeParse(volunteerForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form fields and try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const validatedData = result.data;
      const { error } = await supabase.from('volunteer_applications').insert({
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        email: validatedData.email,
        area_of_interest: validatedData.areaOfInterest,
        motivation: validatedData.motivation || null
      });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll be in touch soon.",
      });

      setVolunteerForm({
        firstName: '',
        lastName: '',
        email: '',
        areaOfInterest: 'Community Health',
        motivation: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-teal-700 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Get Involved</h1>
        <p className="text-xl text-teal-100 max-w-2xl mx-auto">
          Join us in our mission to enhance community well-being. Whether through donating, volunteering, or partnering, your support changes lives.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setActiveTab('donate')}
            className={`flex-1 flex items-center justify-center py-4 rounded-lg font-bold transition-all ${activeTab === 'donate' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Heart className="mr-2 h-5 w-5" /> Donate
          </button>
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`flex-1 flex items-center justify-center py-4 rounded-lg font-bold transition-all ${activeTab === 'volunteer' ? 'bg-amber-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Hand className="mr-2 h-5 w-5" /> Volunteer
          </button>
          <button
            onClick={() => setActiveTab('partner')}
            className={`flex-1 flex items-center justify-center py-4 rounded-lg font-bold transition-all ${activeTab === 'partner' ? 'bg-slate-800 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Briefcase className="mr-2 h-5 w-5" /> Partner
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* DONATE SECTION */}
        {activeTab === 'donate' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Make a Donation</h2>
              <p className="text-gray-600">Your contribution goes directly to our programs supporting women, elderly, and PWDs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* M-Pesa */}
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden relative">
                <div className="h-2 bg-green-500 w-full"></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">M-Pesa</h3>
                      <p className="text-sm text-gray-500">Fast & Secure Mobile Money</p>
                    </div>
                    <Smartphone className="h-10 w-10 text-green-500" />
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 mb-6">
                    <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1">Paybill Number</p>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-mono font-bold text-gray-900">{BANK_DETAILS.mpesa.paybill}</span>
                      <button onClick={() => copyToClipboard(BANK_DETAILS.mpesa.paybill)} className="text-green-600 hover:text-green-800"><Copy size={20} /></button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex justify-between border-b border-gray-100 pb-2">
                      <span>Account Name:</span>
                      <span className="font-bold text-gray-900">{BANK_DETAILS.mpesa.account}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Transfer - Contact Us */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden relative">
                <div className="h-2 bg-blue-600 w-full"></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Bank Transfer</h3>
                      <p className="text-sm text-gray-500">Local & International Transfers</p>
                    </div>
                    <CreditCard className="h-10 w-10 text-blue-600" />
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 mb-4">
                      For bank transfer details, please contact us directly. We'll provide you with secure account information.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center text-gray-600">
                        <span className="font-semibold mr-2">Email:</span> info@a-cw.org
                      </p>
                      <p className="flex items-center text-gray-600">
                        <span className="font-semibold mr-2">Phone:</span> 0718271543
                      </p>
                    </div>
                  </div>

                  <Link to="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Us for Bank Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 mb-4">Prefer to pay with a card online?</p>
              <Button variant="default" className="px-8" onClick={() => navigate('/donate')}>
                Pay Online
              </Button>
            </div>
          </div>
        )}

        {/* VOLUNTEER SECTION */}
        {activeTab === 'volunteer' && (
          <div className="animate-fade-in max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Join Our Team of Volunteers</h2>
            <form className="space-y-6" onSubmit={handleVolunteerSubmit}>
              {/* Honeypot field - hidden from users, catches bots */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={volunteerForm.firstName}
                    onChange={(e) => setVolunteerForm(prev => ({ ...prev, firstName: e.target.value }))}
                    className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-amber-500 ${errors.firstName ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    value={volunteerForm.lastName}
                    onChange={(e) => setVolunteerForm(prev => ({ ...prev, lastName: e.target.value }))}
                    className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-amber-500 ${errors.lastName ? 'ring-2 ring-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  maxLength={100}
                  value={volunteerForm.email}
                  onChange={(e) => setVolunteerForm(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-amber-500 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area of Interest</label>
                <select
                  value={volunteerForm.areaOfInterest}
                  onChange={(e) => setVolunteerForm(prev => ({ ...prev, areaOfInterest: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option>Community Health</option>
                  <option>Elderly Care</option>
                  <option>Disability Support</option>
                  <option>Event Organizing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to volunteer?</label>
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={volunteerForm.motivation}
                  onChange={(e) => setVolunteerForm(prev => ({ ...prev, motivation: e.target.value }))}
                  className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-amber-500 ${errors.motivation ? 'ring-2 ring-red-500' : ''}`}
                ></textarea>
                {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
                <p className="text-gray-400 text-xs mt-1">{volunteerForm.motivation.length}/1000 characters</p>
              </div>
              <Button variant="secondary" className="w-full justify-center" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Application'}
              </Button>
            </form>
          </div>
        )}

        {/* PARTNER SECTION */}
        {activeTab === 'partner' && (
          <div className="animate-fade-in text-center">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner With Us</h2>
              <p className="text-gray-600">We collaborate with NGOs, government bodies, and private sector organizations to scale our impact.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 font-bold">1</div>
                <h3 className="font-bold mb-2">Corporate CSR</h3>
                <p className="text-sm text-gray-500">Sponsor a specific project or community center.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 font-bold">2</div>
                <h3 className="font-bold mb-2">Technical Partners</h3>
                <p className="text-sm text-gray-500">Provide expertise, medical equipment, or technology.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 font-bold">3</div>
                <h3 className="font-bold mb-2">Grant Funding</h3>
                <p className="text-sm text-gray-500">Support our long-term strategic goals.</p>
              </div>
            </div>

            <Link to="/contact">
              <Button variant="default" className="px-8">Contact Our Partnership Team</Button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default GetInvolved;