import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { PILLARS, PROJECTS, IMPACT_STATS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import communityHealthHero from '@/assets/community-health-hero.png';
import maternalHealthImg from '@/assets/maternal-health.png';
import elderlyCarePng from '@/assets/elderly-care.png';
import disabilitySupportImg from '@/assets/disability-support.png';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={communityHealthHero}
            alt="Community Wellness in Kenya"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-900/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center lg:text-left mt-16">
          <div className="max-w-3xl animate-fade-in-up">

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 tracking-tight">
              Together for <span className="text-amber-400">Health, Opportunity, and Social Inclusion</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed max-w-2xl font-light animate-fade-in-up animation-delay-100">
              We create healthier, more inclusive communities where every individual has access to the resources, knowledge, and support needed to live a fulfilling life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-200">
              <Link to="/donate">
                <Button size="lg" className="bg-gradient-to-r from-teal-600 to-amber-500 hover:from-teal-700 hover:to-amber-600 text-white font-bold px-10 py-7 text-lg shadow-soft-xl transition-smooth hover-lift border-0">
                  <Heart className="mr-2 h-5 w-5 text-amber-200" fill="currentColor" />
                  Donate Now
                </Button>
              </Link>
              <Link to="/get-involved">
                <Button variant="outline" size="lg" className="glass-light text-white border-white/40 hover:bg-white/20 hover:border-white text-lg px-10 py-7 font-semibold transition-smooth hover-lift backdrop-blur-md">
                  Join Our Cause
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-6">What we do</h2>
            <p className="text-gray-600 text-lg">
              Our interventions are tailored to support the most vulnerable, ensuring that no one is left behind in the journey towards prosperity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              // Map pillar IDs to images
              const pillarImages = {
                health: maternalHealthImg,
                ageism: elderlyCarePng,
                disability: disabilitySupportImg
              };
              const pillarImage = pillarImages[pillar.id as keyof typeof pillarImages];

              return (
                <div
                  key={pillar.id}
                  className="group rounded-3xl bg-white border border-gray-100 shadow-soft hover:shadow-soft-xl hover-lift transition-smooth text-center md:text-left relative overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pillarImage}
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth-slow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className={`absolute bottom-4 left-4 inline-flex p-3 rounded-2xl ${pillar.color} shadow-soft`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading">{pillar.title}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {pillar.description}
                    </p>
                    <Link to="/programs" className="inline-flex items-center font-bold text-teal-600 group-hover:text-amber-500 transition-smooth focus-ring rounded-lg px-2 py-1 -mx-2">
                      Learn More <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-smooth" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
