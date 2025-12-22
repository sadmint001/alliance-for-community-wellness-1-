-- Create contact_submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteer_applications table
CREATE TABLE public.volunteer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  area_of_interest TEXT NOT NULL,
  motivation TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT,
  donor_email TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'KES',
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  objectives TEXT[] NOT NULL DEFAULT '{}',
  image TEXT,
  category TEXT NOT NULL CHECK (category IN ('health', 'elderly', 'disability')),
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can submit contact forms (insert only)
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

-- Public can submit volunteer applications (insert only)
CREATE POLICY "Anyone can submit volunteer application"
ON public.volunteer_applications FOR INSERT
WITH CHECK (true);

-- Public can insert donation records
CREATE POLICY "Anyone can create donation record"
ON public.donations FOR INSERT
WITH CHECK (true);

-- Public can view projects
CREATE POLICY "Anyone can view projects"
ON public.projects FOR SELECT
USING (status = 'active');

-- Seed projects from constants
INSERT INTO public.projects (id, title, location, description, objectives, image, category, status) VALUES
  (gen_random_uuid(), 'Empowering Women Through Technology-Driven Family Planning Support', 'Homabay, Siaya, Kakamega & Kisumu', 'Empowering women with digital tools to make informed reproductive health choices. Generating reliable data to inform programming, policy, and resource allocation while strengthening health systems through targeted interventions and partnerships.', ARRAY['Empowering women with digital tools', 'Generating reliable data for policy', 'Strengthening health systems'], 'https://images.unsplash.com/photo-1576091160550-217358c7e618?auto=format&fit=crop&w=800&q=80', 'health', 'active'),
  (gen_random_uuid(), 'Wazee Bora Centers for Wellness and Wellbeing', 'Homabay, Siaya, Kakamega & Kisumu', 'Improving the wellbeing, health, dignity and livelihood of elderly persons by establishing a community-based Elderly Wellness & Livelihood Support Centre offering integrated nutrition, social engagement, and primary healthcare support.', ARRAY['Integrated nutrition support', 'Social engagement & mental well-being', 'Primary healthcare support'], 'https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?auto=format&fit=crop&w=800&q=80', 'elderly', 'active'),
  (gen_random_uuid(), 'Silent Skills, Strong Business', 'Western Kenya', 'Increasing income, safety, and business success of deaf boda boda riders and deaf market vendors in Western Kenya through entrepreneurship training, digital communication solutions, and signing-friendly business practices.', ARRAY['Entrepreneurship training', 'Digital communication solutions', 'Signing-friendly business practices'], 'https://images.unsplash.com/photo-1664575602276-acd073f104c1?auto=format&fit=crop&w=800&q=80', 'disability', 'active');