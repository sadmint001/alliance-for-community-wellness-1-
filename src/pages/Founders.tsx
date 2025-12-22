import { FOUNDERS } from '@/lib/constants';
import { Quote, Award, Sparkles, Target, HeartHandshake, TrendingUp, Linkedin, Twitter, Mail } from 'lucide-react';
import horaceImage from '@/assets/horace-nundu.jpg';
import jamesImage from '@/assets/james-ateng.jpg';
import { useEffect, useState } from 'react';

const founderImages = [horaceImage, jamesImage];

const Founders = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-slate-50">
      {/* Hero Section - Simplified */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 pt-32 pb-24 text-center text-white">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span className="text-sm font-medium text-amber-200">Leadership & Vision</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-white via-teal-100 to-amber-100 bg-clip-text text-transparent">
              Our Founders
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
            The visionary leaders behind Alliance for Community Wellness
          </p>
        </div>
      </div>

      {/* Founders Section */}
      <div className="relative -mt-16 pb-32">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-800/0 to-white"></div>
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {FOUNDERS.map((founder, index) => (
            <div
              key={index}
              className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="relative">
                <div className={`grid gap-8 lg:grid-cols-2 ${index % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Image Card - Perfectly Sized */}
                  <div className={`relative ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative group">
                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100">
                        {/* Background pattern for empty space */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100"></div>
                        
                        {/* Centered, perfectly sized image */}
                        <div className="relative h-[400px] md:h-[450px] flex items-center justify-center p-8">
                          <img
                            src={founderImages[index]}
                            alt={founder.name}
                            className="h-full w-auto max-w-full object-contain rounded-lg shadow-lg"
                            style={{ 
                              maxHeight: '350px',
                              objectPosition: 'center'
                            }}
                          />
                        </div>
                        
                        {/* Image overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
                        
                        {/* Image Badge */}
                        <div className={`absolute bottom-4 left-4 z-20 rounded-full ${index % 2 === 0 ? 'bg-teal-600' : 'bg-amber-600'} px-3 py-1.5 text-xs font-semibold text-white shadow-lg`}>
                          Founder & Visionary
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className={`absolute -bottom-4 -right-4 z-30 flex gap-2 ${index % 2 === 0 ? 'lg:-right-4' : 'lg:-left-4'}`}>
                        <button className={`h-10 w-10 rounded-full ${index % 2 === 0 ? 'bg-teal-100 text-teal-600' : 'bg-amber-100 text-amber-600'} flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                          <Linkedin className="h-4 w-4" />
                        </button>
                        <button className={`h-10 w-10 rounded-full ${index % 2 === 0 ? 'bg-teal-100 text-teal-600' : 'bg-amber-100 text-amber-600'} flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                          <Twitter className="h-4 w-4" />
                        </button>
                        <button className={`h-10 w-10 rounded-full ${index % 2 === 0 ? 'bg-teal-100 text-teal-600' : 'bg-amber-100 text-amber-600'} flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                          <Mail className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex items-center ${index % 2 !== 0 ? 'lg:col-start-1' : ''}`}>
                    <div className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 md:p-8">
                      <div className="mb-6">
                        <div className={`inline-flex items-center gap-2 rounded-full ${index % 2 === 0 ? 'bg-teal-50' : 'bg-amber-50'} px-4 py-2 mb-4`}>
                          <div className={`h-2 w-2 rounded-full ${index % 2 === 0 ? 'bg-teal-500' : 'bg-amber-500'}`}></div>
                          <span className="text-sm font-semibold uppercase tracking-wider text-slate-700">
                            Founder {index + 1}
                          </span>
                        </div>

                        <h2 className="mb-1 text-3xl font-bold text-slate-900 md:text-4xl">
                          {founder.name}
                        </h2>
                        
                        <div className={`text-lg font-semibold ${index % 2 === 0 ? 'text-teal-600' : 'text-amber-600'}`}>
                          {founder.role}
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="mb-6 relative pl-8">
                        <Quote className={`absolute left-0 top-0 h-6 w-6 ${index % 2 === 0 ? 'text-teal-300' : 'text-amber-300'}`} />
                        <blockquote>
                          <p className="text-xl font-light italic text-slate-800 leading-relaxed">
                            "{founder.quote}"
                          </p>
                        </blockquote>
                      </div>

                      {/* Bio */}
                      <div className="mb-6">
                        <p className="text-base leading-relaxed text-slate-600">
                          {founder.bio}
                        </p>
                      </div>

                      {/* Key Expertise */}
                      <div className="pt-6 border-t border-slate-100">
                        <div className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                          Key Expertise
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {['Community Health', 'Strategic Leadership', 'Public Policy', 'Social Innovation'].map((skill, i) => (
                            <span 
                              key={i}
                              className={`text-xs font-medium px-3 py-1.5 rounded-full ${index % 2 === 0 ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700'}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Team Values Section */}
          <div className="mt-24 rounded-2xl bg-gradient-to-r from-slate-50 to-gray-50 p-8 shadow-lg ring-1 ring-slate-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Shared Vision</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                United by a common goal of transforming community wellness through innovation, compassion, and sustainable impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                  <HeartHandshake className="h-6 w-6 text-teal-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Community First</h4>
                <p className="text-sm text-slate-600">Every decision centers on community needs and long-term wellbeing.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Measurable Impact</h4>
                <p className="text-sm text-slate-600">We track and optimize for tangible improvements in community health.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Sustainable Growth</h4>
                <p className="text-sm text-slate-600">Building programs that continue to benefit communities for generations.</p>
              </div>
            </div>
          </div>

          {/* Simple CTA */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Join Our Mission</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Partner with us to create healthier, more resilient communities across the nation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors">
                Contact Our Team
              </button>
              <button className="px-8 py-3 border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors">
                Learn About Our Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founders;