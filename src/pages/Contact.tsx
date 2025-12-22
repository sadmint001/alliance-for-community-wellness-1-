import { useState } from 'react';
import { CONTACT_INFO } from '@/lib/constants';
import { Mail, Phone, MapPin, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(100, "Email must be less than 100 characters"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters")
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Honeypot check - if filled, silently reject (bot detected)
    if (honeypot) {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      return;
    }
    
    // Validate form data
    const result = contactSchema.safeParse(formData);
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
      const { error } = await supabase.from('contact_submissions').insert({
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-0">
      <div className="bg-gray-900 text-white pt-32 pb-20 text-center">
        <h1 className="text-4xl font-heading font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-400 max-w-xl mx-auto">Have questions about our programs or want to get involved? We'd love to hear from you.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
            <div className="space-y-10">
              <div className="flex items-start group">
                <div className="bg-teal-50 p-4 rounded-2xl group-hover:bg-teal-100 transition-colors">
                  <MapPin className="h-8 w-8 text-teal-600" />
                </div>
                <div className="ml-6">
                  <h4 className="text-xl font-bold text-gray-900">Visit Us</h4>
                  <p className="text-gray-600 mt-2 max-w-xs leading-relaxed">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-teal-50 p-4 rounded-2xl group-hover:bg-teal-100 transition-colors">
                  <Phone className="h-8 w-8 text-teal-600" />
                </div>
                <div className="ml-6">
                  <h4 className="text-xl font-bold text-gray-900">Call Us</h4>
                  <p className="text-gray-600 mt-2 text-lg">{CONTACT_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="bg-teal-50 p-4 rounded-2xl group-hover:bg-teal-100 transition-colors">
                  <Mail className="h-8 w-8 text-teal-600" />
                </div>
                <div className="ml-6">
                  <h4 className="text-xl font-bold text-gray-900">Email Us</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-600 mt-2 text-lg hover:text-teal-600 block">{CONTACT_INFO.email}</a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-16 h-80 bg-gray-200 rounded-3xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.817557345678!2d36.7909!3d-1.2833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10b000000001%3A0x0!2sHurlingham%20Plaza!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{border:0}}
                allowFullScreen
                loading="lazy"
                title="ACW Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center mb-8">
              <MessageSquare className="h-6 w-6 text-amber-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    required
                    maxLength={50}
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all ${errors.firstName ? 'ring-2 ring-red-500' : ''}`}
                    placeholder="John" 
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    required
                    maxLength={50}
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all ${errors.lastName ? 'ring-2 ring-red-500' : ''}`}
                    placeholder="Doe" 
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  maxLength={100}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="john@example.com" 
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select 
                  id="subject" 
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all"
                >
                  <option>General Inquiry</option>
                  <option>Donation Support</option>
                  <option>Volunteer Opportunities</option>
                  <option>Media & Partnership</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  required
                  maxLength={2000}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all ${errors.message ? 'ring-2 ring-red-500' : ''}`}
                  placeholder="How can we help? (minimum 10 characters)"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                <p className="text-gray-400 text-xs mt-1">{formData.message.length}/2000 characters</p>
              </div>

              <Button type="submit" variant="default" className="w-full justify-center py-4 text-lg" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : 'Send Message'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;