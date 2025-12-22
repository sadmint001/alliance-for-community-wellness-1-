import { PILLARS } from '@/lib/constants';
import communityHealthImg from '@/assets/Community-Health.jpg';
import elderlyCareImg from '@/assets/Elderly-care.jpg';
import disabilitySupportImg from '@/assets/Disability-Support.jpg';

const Programs = () => {
  const HealthIcon = PILLARS[0].icon;
  const AgeismIcon = PILLARS[1].icon;
  const DisabilityIcon = PILLARS[2].icon;

  return (
    <div className="pt-0">
      <div className="bg-teal-900 pt-32 pb-20 text-center relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 relative z-10">Our Programs</h1>
        <p className="text-xl text-teal-100 max-w-2xl mx-auto px-4 relative z-10">
          Holistic, community-driven interventions targeting the most vulnerable members of our society.
        </p>
      </div>

      {/* Community Health */}
      <section className="py-24 bg-white" id="health">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 lg:sticky lg:top-24">
              <div className="relative">
                <div className="absolute -inset-4 bg-teal-100 rounded-3xl transform rotate-3"></div>
                <img
                  src={communityHealthImg}
                  alt="Community Health workshop"
                  className="relative rounded-2xl shadow-2xl w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="inline-flex items-center space-x-2 text-teal-600 font-bold tracking-wider uppercase mb-4">
                <HealthIcon size={20} />
                <span>Pillar 01</span>
              </div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">Community Health</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Empowering families with a special emphasis on prenatal, antenatal, and postnatal care. We educate expectant mothers on nutrition, safe childbirth practices, and disease prevention to ensure thriving families.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-600 font-bold text-xl">1</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Maternal & Child Health</h4>
                    <p className="text-gray-600 mt-2">Guidance on proper dietary habits, importance of regular check-ups, and managing pregnancy complications.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-600 font-bold text-xl">2</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Nutrition Education</h4>
                    <p className="text-gray-600 mt-2">Providing resources to educate families about balanced diets to prevent malnutrition and chronic diseases.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-600 font-bold text-xl">3</div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Digital Health Access</h4>
                    <p className="text-gray-600 mt-2">Connecting communities to services via technology, including transportation referrals and outreach.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ageism */}
      <section className="py-24 bg-amber-50/50" id="ageism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-start">
            <div className="lg:w-1/2 lg:sticky lg:top-24">
              <div className="relative">
                <div className="absolute -inset-4 bg-amber-100 rounded-3xl transform -rotate-3"></div>
                <img
                  src={elderlyCareImg}
                  alt="Elderly Care"
                  className="relative rounded-2xl shadow-2xl w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="inline-flex items-center space-x-2 text-amber-600 font-bold tracking-wider uppercase mb-4">
                <AgeismIcon size={20} />
                <span>Pillar 02</span>
              </div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">Ageism & Elderly Care</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                ACW combats isolation, neglect, and stigma faced by the elderly. We create opportunities for social interaction, mental stimulation, and physical activity to enhance the overall quality of life for seniors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">Community Meals</h4>
                  <p className="text-sm text-gray-600">Regular social gatherings to share food and foster a sense of belonging.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-2">Games & Activities</h4>
                  <p className="text-sm text-gray-600">Promoting cognitive function and physical health through interactive play.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow md:col-span-2">
                  <h4 className="font-bold text-gray-900 mb-2">Advocacy Against Ageism</h4>
                  <p className="text-sm text-gray-600">Challenging stereotypes and advocating for a society where the elderly are respected.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disability */}
      <section className="py-24 bg-white" id="disability">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 lg:sticky lg:top-24">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-100 rounded-3xl transform rotate-2"></div>
                <img
                  src={disabilitySupportImg}
                  alt="Disability Support"
                  className="relative rounded-2xl shadow-2xl w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="inline-flex items-center space-x-2 text-blue-600 font-bold tracking-wider uppercase mb-4">
                <DisabilityIcon size={20} />
                <span>Pillar 03</span>
              </div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 mb-6">Disability Support</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We address the unique challenges faced by individuals with disabilities through tailored health programs and economic empowerment tools, ensuring no one is marginalized.
              </p>

              <div className="bg-blue-50 p-8 rounded-3xl">
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="h-2 w-2 bg-blue-600 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Targeted Health Support</h4>
                      <p className="text-gray-600 mt-1">Physical therapy, medical assistance, and specific health education designed for PWDs.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 bg-blue-600 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Economic Empowerment</h4>
                      <p className="text-gray-600 mt-1">Vocational training, workshops, and financial literacy to foster independence and employability.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="h-2 w-2 bg-blue-600 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Inclusive Community Support</h4>
                      <p className="text-gray-600 mt-1">Advocacy and training for families and employers to create a more inclusive environment.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
