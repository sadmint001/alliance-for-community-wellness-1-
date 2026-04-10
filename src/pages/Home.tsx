import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { PILLARS, PROJECTS, IMPACT_STATS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/layout/Sidebar';
import communityHealthHero from '@/assets/community-health-hero.png';
import maternalHealthImg from '@/assets/maternal-health.png';
import elderlyCarePng from '@/assets/elderly-care.png';
import disabilitySupportImg from '@/assets/disability-support.png';

const Home = () => {
  const sidebarItems = [
    { label: "Monitoring & Evaluation", path: "/programs" },
    { label: "Business Architecture", path: "/programs" },
    { label: "Public Financial Management", path: "/programs" },
    { label: "Customer Relationship Management", path: "/programs" },
    { label: "Project Management", path: "/programs" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section - slides under the dark blue nav bar */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden -mt-12 lg:-mt-14">
        <img
          src={communityHealthHero}
          alt="Community Wellness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </section>

      {/* Main Content Area with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar */}
          <aside className="lg:w-1/4 hidden lg:block">
            <Sidebar items={sidebarItems} />
          </aside>

          {/* Right Main Content */}
          <main className="lg:w-3/4">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-glide-blue mb-2 hover:text-glide-teal transition-colors">
                Trainers
              </h2>
              <div className="h-0.5 w-full bg-glide-gold mb-6"></div>
              <p className="text-xl text-teal-700 font-medium">
                Expert trainers who provide real-world knowledge and practical solutions.
              </p>
            </div>

            {/* Re-using existing content sections but styled for the new layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {PILLARS.map((pillar, index) => {
                const Icon = pillar.icon;
                const pillarImages = {
                  health: maternalHealthImg,
                  ageism: elderlyCarePng,
                  disability: disabilitySupportImg
                };
                const pillarImage = pillarImages[pillar.id as keyof typeof pillarImages];

                return (
                  <div key={pillar.id} className="group border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden mb-4">
                      <img src={pillarImage} alt={pillar.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-xl font-bold text-glide-blue mb-3">{pillar.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{pillar.description}</p>
                    <Link to="/programs" className="text-glide-gold font-bold flex items-center hover:translate-x-1 transition-transform">
                      Learn More <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      {/* Impact Stats */}
      <section className="py-20 bg-teal-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {IMPACT_STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="p-4">
                  <div className="inline-flex p-3 rounded-full bg-white/10 mb-4">
                    <Icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-heading">{stat.value}</div>
                  <div className="text-teal-200 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Impact in Action</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-2">Featured Projects</h2>
            </div>
            <Link to="/projects" className="hidden md:inline-flex items-center text-teal-700 font-bold hover:text-amber-600 transition-colors mt-4 md:mt-0">
              View All Projects <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-56 bg-gray-200 rounded-2xl mb-4 overflow-hidden relative shadow-soft hover:shadow-soft-lg transition-smooth">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-smooth-slow" />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-teal-800 shadow-soft uppercase">
                    {project.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-smooth font-heading">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <Link to="/projects" className="inline-flex items-center text-teal-600 font-semibold group-hover:text-amber-500 transition-smooth focus-ring rounded-lg px-2 py-1 -mx-2">
                  View Details <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-smooth" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/projects">
              <Button variant="outline">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
            alt="Donate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-teal-900/90 mix-blend-multiply"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Be the Change You Want to See
          </h2>
          <p className="text-teal-50 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Your contribution directly empowers women, elderly citizens, and people with disabilities. Join us in building a more inclusive community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/donate">
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-amber-500 hover:from-teal-700 hover:to-amber-600 text-white font-bold px-12 py-7 text-xl shadow-soft-xl transition-smooth hover-lift border-0">
                <Heart className="mr-2 h-6 w-6 text-amber-200" fill="currentColor" />
                Donate Now
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button variant="outline" size="lg" className="glass-light text-white border-white/40 hover:bg-white/20 hover:border-white text-xl px-12 py-7 font-semibold transition-smooth hover-lift backdrop-blur-md">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Affiliates & Partners */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">Our Partners</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We collaborate with leading organizations to maximize our impact in community health and wellness.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-24">
            {/* Ministry of Health */}
            <div className="flex flex-col items-center group">
              <div className="h-24 w-48 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <img
                  src="/images/partners/ministry-of-health.png"
                  alt="Ministry of Health Kenya"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="mt-4 text-sm text-gray-500 font-medium">Ministry of Health</span>
            </div>

            {/* HENNET */}
            <div className="flex flex-col items-center group">
              <div className="h-24 w-48 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src="/images/partners/hennet.png"
                  alt="HENNET - Health NGOs Network"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="mt-4 text-sm text-gray-500 font-medium">HENNET</span>
            </div>

            {/* NCD Alliance Kenya */}
            <div className="flex flex-col items-center group">
              <div className="h-24 w-48 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src="/images/partners/ncd-alliance-kenya.png"
                  alt="NCD Alliance Kenya"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="mt-4 text-sm text-gray-500 font-medium">NCD Alliance Kenya</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
