import { Target, Eye, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-0">
      {/* Header */}
      <div className="bg-teal-50 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-2 block">Who We Are</span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-teal-900 mb-6">About ACW</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The Alliance for Community Wellness (ACW) is a local non-profit organization committed to improving the well-being of the community. We work to foster inclusive interventions where people of all ages can access healthcare, economic empowerment opportunities, and engage in sustainable social connections.
          </p>
        </div>
      </div>

      {/* Mission Vision Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To create a healthier, more inclusive community where every individual has access to the resources, knowledge, and support needed to live a fulfilling life.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-teal-900 p-8 rounded-3xl shadow-lg border border-teal-800 flex flex-col items-center text-center text-white transform md:-translate-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-amber-400 mb-6">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-teal-100 leading-relaxed">
                To create empowered communities through collaboration where a culture of inclusivity, resilience, and wellness is cultivated.
              </p>
            </div>

            {/* Values */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:transform hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Inclusivity, Empathy, Integrity, and Community-First Action. We believe in the power of connection to transform lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Org Background */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-400 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-600 rounded-full opacity-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80"
                  alt="ACW Teamwork"
                  className="relative rounded-2xl shadow-2xl w-full object-cover z-10"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Transforming Communities for Prosperity</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ACW focuses on promoting maternal health, supporting the elderly, and addressing the needs of individuals living with disabilities. By doing so, we seek to build a more connected and resilient community for all.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our approach is holistic and human-centered. We don't just deliver aid; we build systems, foster relationships, and empower individuals to be agents of change in their own lives.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="text-3xl font-bold text-teal-600 mb-1">10+</div>
                  <div className="text-sm text-gray-500">Years of Experience</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="text-3xl font-bold text-amber-500 mb-1">4</div>
                  <div className="text-sm text-gray-500">Key Counties</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-10">Our Partners & Affiliates</h3>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-400">Partner 1</div>
            <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-400">Partner 2</div>
            <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-400">Partner 3</div>
            <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-400">Partner 4</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
