import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Careers = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-slate-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 pt-16 pb-24 text-center text-white">
                <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                        <Briefcase className="h-4 w-4 text-teal-300" />
                        <span className="text-sm font-medium text-teal-200">Join Our Team</span>
                    </div>

                    <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                        <span className="bg-gradient-to-r from-white via-teal-100 to-amber-100 bg-clip-text text-transparent">
                            Careers
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
                        Build a meaningful career making a difference in communities across Kenya
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative -mt-16 pb-32">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white p-8 md:p-12 shadow-xl ring-1 ring-slate-100">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Coming Soon</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                We're building something special here. Career opportunities with Alliance for Community Wellness will be posted soon.
                            </p>
                        </div>

                        <div className="bg-teal-50 rounded-xl p-6 mb-8">
                            <h3 className="text-xl font-semibold text-teal-900 mb-3">Why Work With Us?</h3>
                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start">
                                    <span className="text-teal-600 mr-2">•</span>
                                    <span>Make a real impact on community health and wellness</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-600 mr-2">•</span>
                                    <span>Work with dedicated professionals passionate about social change</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-600 mr-2">•</span>
                                    <span>Grow your career in the non-profit sector</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-teal-600 mr-2">•</span>
                                    <span>Collaborate with government and international partners</span>
                                </li>
                            </ul>
                        </div>

                        <div className="border-t border-slate-200 pt-8">
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Interested in Joining?</h3>
                            <p className="text-slate-600 mb-6">
                                Send us your CV and cover letter. We'll reach out when opportunities matching your skills become available.
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Mail className="h-5 w-5 text-teal-600" />
                                    <a href="mailto:info@a-cw.org" className="hover:text-teal-600 transition-colors">
                                        info@a-cw.org
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Phone className="h-5 w-5 text-teal-600" />
                                    <a href="tel:0718271543" className="hover:text-teal-600 transition-colors">
                                        0718271543
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Link to="/contact" className="flex-1">
                                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                                        Contact Us
                                    </Button>
                                </Link>
                                <Link to="/get-involved" className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        Volunteer Instead
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;
