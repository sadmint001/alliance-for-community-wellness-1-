import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Founders = lazy(() => import("./pages/Founders"));
const Programs = lazy(() => import("./pages/Programs"));
const Projects = lazy(() => import("./pages/Projects"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const Donate = lazy(() => import("./pages/Donate"));
const Contact = lazy(() => import("./pages/Contact"));
const DonateSuccess = lazy(() => import("./pages/DonateSuccess"));
const Careers = lazy(() => import("./pages/Careers"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
  </div>
);

const queryClient = new QueryClient();

// Scroll to top helper component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public layout with navbar and footer
const PublicLayout = () => {
  return (
    <>
      <ScrollToTop />
      <div className="font-sans antialiased text-gray-800 bg-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/founders" element={<Founders />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donate/success" element={<DonateSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

// Admin routes without public navbar/footer
const AdminRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
};

const AppRoutes = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AdminRoutes />;
  }

  return <PublicLayout />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;