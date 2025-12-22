-- Remove public read access from sensitive tables
-- Only authenticated users can read contact submissions
CREATE POLICY "Only authenticated users can view contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can read volunteer applications
CREATE POLICY "Only authenticated users can view volunteer applications"
ON public.volunteer_applications FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can view donations
CREATE POLICY "Only authenticated users can view donations"
ON public.donations FOR SELECT
TO authenticated
USING (true);