-- Explicit DENY policies for contact_submissions
CREATE POLICY "Deny updates to contact submissions"
ON public.contact_submissions FOR UPDATE
USING (false);

CREATE POLICY "Deny deletes from contact submissions"
ON public.contact_submissions FOR DELETE
USING (false);

-- Explicit DENY policies for volunteer_applications
CREATE POLICY "Deny updates to volunteer applications"
ON public.volunteer_applications FOR UPDATE
USING (false);

CREATE POLICY "Deny deletes from volunteer applications"
ON public.volunteer_applications FOR DELETE
USING (false);

-- Explicit DENY policies for donations
CREATE POLICY "Deny updates to donations"
ON public.donations FOR UPDATE
USING (false);

CREATE POLICY "Deny deletes from donations"
ON public.donations FOR DELETE
USING (false);