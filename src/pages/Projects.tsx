import { Link } from 'react-router-dom';
import { MapPin, Target, Calendar, CheckCircle, Loader2, AlertCircle, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  objectives: string[];
  image: string | null;
  category: string;
  status: string;
}

// Fallback demo projects in case Supabase is down
const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Community Health Initiative',
    location: 'Kakamega County, Kenya',
    description: 'A comprehensive program providing basic healthcare services, maternal care, and health education to underserved communities in Western Kenya.',
    objectives: [
      'Provide free medical checkups for 5,000 community members',
      'Establish 10 community health worker training programs',
      'Distribute essential medicines and sanitary products',
      'Conduct health education workshops in 20 villages'
    ],
    image: '/api/placeholder/600/400',
    category: 'Healthcare',
    status: 'active'
  },
  {
    id: '2',
    title: 'Youth Empowerment Program',
    location: 'Kisumu County, Kenya',
    description: 'Empowering young people through vocational training, entrepreneurship support, and leadership development to create sustainable livelihoods.',
    objectives: [
      'Train 500 youth in vocational skills',
      'Establish 5 youth-led business cooperatives',
      'Provide startup grants to 50 young entrepreneurs',
      'Create mentorship programs with local businesses'
    ],
    image: '/api/placeholder/600/400',
    category: 'Education',
    status: 'active'
  },
  {
    id: '3',
    title: 'Clean Water Access Project',
    location: 'Bungoma County, Kenya',
    description: 'Installing sustainable water systems and promoting hygiene practices in communities facing water scarcity challenges.',
    objectives: [
      'Install 15 borehole wells in remote villages',
      'Provide water purification systems to 1,000 households',
      'Train community members in water resource management',
      'Establish maintenance committees for each water point'
    ],
    image: '/api/placeholder/600/400',
    category: 'Infrastructure',
    status: 'active'
  }
];

const Projects = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const { data: projects, isLoading, error, refetch } = useQuery({
    queryKey: ['projects', retryCount],
    queryFn: async () => {
      try {
        console.log('Attempting to fetch projects from Supabase...');
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Projects fetched successfully:', data?.length || 0);
        return data as Project[];
      } catch (err) {
        console.error('Error fetching projects:', err);
        // Return fallback data if Supabase is down
        return fallbackProjects;
      }
    },
    retry: 2,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isOnline // Only try to fetch if online
  });

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    refetch();
  };

  // Use fallback projects if we have no data (even after error)
  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  if (isLoading && isOnline) {
    return (
      <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-teal-600 mb-4" />
        <p className="text-gray-600">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="pt-0">
      <div className="bg-gradient-to-b from-teal-900 to-gray-900 pt-16 pb-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 relative z-10">Our Projects</h1>
        <p className="text-xl text-gray-300 relative z-10">Current and ongoing initiatives transforming lives in Western Kenya and beyond.</p>

        {/* Network/Error Status Banner */}
        {!isOnline && (
          <div className="mt-8 mx-auto max-w-md bg-amber-900/50 backdrop-blur-sm border border-amber-700 rounded-lg p-4 relative z-10">
            <div className="flex items-center justify-center space-x-2">
              <WifiOff className="h-5 w-5 text-amber-300" />
              <p className="text-amber-200 text-sm">You are currently offline. Showing demo projects.</p>
            </div>
          </div>
        )}

        {error && isOnline && (
          <div className="mt-8 mx-auto max-w-md bg-red-900/50 backdrop-blur-sm border border-red-700 rounded-lg p-4 relative z-10">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-300" />
                <p className="text-red-200 text-sm">Connection issue. Showing demo projects.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="bg-white/10 text-white hover:bg-white/20"
              >
                Retry Connection
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {displayProjects.map((project, index) => (
          <div key={project.id} className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

            {/* Image Side */}
            <div className="lg:w-1/2 relative group">
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-white/95 backdrop-blur-sm text-teal-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg border border-teal-100 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  {project.status === 'active' ? 'Ongoing Project' : 'Completed'}
                </span>
              </div>
              <div className={`absolute -inset-4 bg-gradient-to-tr ${index % 2 === 0 ? 'from-teal-100 to-transparent' : 'from-amber-100 to-transparent'} rounded-3xl transform rotate-2 group-hover:rotate-1 transition-transform duration-500`}></div>
              <div className="relative w-full h-[500px] rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-amber-50">
                {project.image && project.image !== '/api/placeholder/600/400' ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // If image fails to load, show a placeholder
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.classList.add('flex', 'items-center', 'justify-center');
                        parent.innerHTML = `
                          <div class="text-center p-8">
                            <div class="text-6xl mb-4">🏥</div>
                            <h3 class="text-xl font-bold text-gray-800">${project.title}</h3>
                            <p class="text-gray-600 mt-2">${project.category}</p>
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {project.category === 'Healthcare' ? '🏥' :
                          project.category === 'Education' ? '📚' :
                            project.category === 'Infrastructure' ? '💧' : '🌟'}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                      <p className="text-gray-600 mt-2">{project.category} Project</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <span className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-3">{project.category}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 leading-tight">{project.title}</h2>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
                  <MapPin className="h-4 w-4 mr-2 text-teal-600" />
                  {project.location}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
                  <Calendar className="h-4 w-4 mr-2 text-teal-600" />
                  Status: {project.status === 'active' ? 'Ongoing' : project.status}
                </div>
              </div>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
                <h3 className="flex items-center text-lg font-bold text-gray-900 mb-6">
                  <Target className="h-5 w-5 mr-2 text-teal-600" />
                  Key Objectives
                </h3>
                <ul className="space-y-4">
                  {project.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link to="/get-involved">
                  <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-6">
                    Support This Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;