import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2, LogOut, Mail, Users, DollarSign,
  LayoutDashboard, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface VolunteerApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  area_of_interest: string;
  motivation: string | null;
  status: string;
  created_at: string;
}

interface Donation {
  id: string;
  donor_name: string | null;
  donor_email: string | null;
  amount: number;
  currency: string;
  payment_method: string;
  transaction_id: string | null;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const { toast } = useToast();

  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, isLoading, navigate]);

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [contactsRes, volunteersRes, donationsRes] = await Promise.all([
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('volunteer_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('donations').select('*').order('created_at', { ascending: false })
      ]);

      if (contactsRes.data) setContacts(contactsRes.data);
      if (volunteersRes.data) setVolunteers(volunteersRes.data);
      if (donationsRes.data) setDonations(donationsRes.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data. Please refresh the page.",
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  }, [toast]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin, fetchData]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center mr-3">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Contact Messages</CardTitle>
              <Mail className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{contacts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Volunteer Applications</CardTitle>
              <Users className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{volunteers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Donations</CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{donations.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="contacts" className="data-[state=active]:bg-teal-50">
              <Mail className="h-4 w-4 mr-2" />
              Contact Messages
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="data-[state=active]:bg-amber-50">
              <Users className="h-4 w-4 mr-2" />
              Volunteer Applications
            </TabsTrigger>
            <TabsTrigger value="donations" className="data-[state=active]:bg-green-50">
              <DollarSign className="h-4 w-4 mr-2" />
              Donations
            </TabsTrigger>
          </TabsList>

          {/* Contact Messages */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                ) : contacts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No contact submissions yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-medium">
                            {contact.first_name} {contact.last_name}
                          </TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{contact.subject}</Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {formatDate(contact.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Volunteer Applications */}
          <TabsContent value="volunteers">
            <Card>
              <CardHeader>
                <CardTitle>Volunteer Applications</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                ) : volunteers.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No volunteer applications yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Area of Interest</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {volunteers.map((volunteer) => (
                        <TableRow key={volunteer.id}>
                          <TableCell className="font-medium">
                            {volunteer.first_name} {volunteer.last_name}
                          </TableCell>
                          <TableCell>{volunteer.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{volunteer.area_of_interest}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={volunteer.status === 'pending' ? 'outline' : 'default'}>
                              {volunteer.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {formatDate(volunteer.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donations */}
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>Donation Records</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                ) : donations.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No donations recorded yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell className="font-medium">
                            {donation.donor_name || 'Anonymous'}
                            {donation.donor_email && (
                              <span className="block text-sm text-gray-500">{donation.donor_email}</span>
                            )}
                          </TableCell>
                          <TableCell className="font-bold text-green-600">
                            {donation.currency} {donation.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{donation.payment_method}</TableCell>
                          <TableCell>
                            <Badge variant={
                              donation.status === 'completed' ? 'default' :
                                donation.status === 'pending' ? 'outline' : 'destructive'
                            }>
                              {donation.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {formatDate(donation.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;