import { Award, BookOpen, PenTool, GraduationCap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            The Man Behind the Satire
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            "I earned a Master’s degree in Urban and Regional Planning, but I chose to plan stories instead of cities."
          </p>
        </div>
      </section>

      {/* Bio Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Image / Illustration Placeholder */}
          <div className="relative">
            <div className="aspect-4/5 bg-gray-200 rounded-lg overflow-hidden shadow-xl">
              {/* Ideally, place a photo of Mehedi or a self-caricature here */}
              <img 
                src="https://media.licdn.com/dms/image/v2/D5603AQFwF0zTzoHbTg/profile-displayphoto-shrink_200_200/B56ZbiFn0GGoAY-/0/1747549847819?e=2147483647&v=beta&t=AVefiGbj1EUcdeCXJEtdW_vIu7gjh3gK7v59U0FTe7I" 
                alt="Mehedi Haque" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs border border-gray-100 hidden md:block">
              <p className="text-sm font-bold text-gray-900">Professional Cartoonist since 1998</p>
              <p className="text-xs text-gray-500 mt-1">25+ Years of Experience</p>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Career & Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Mehedi Haque is a pivotal figure in the Bangladeshi cartoon and comic industry. 
              Starting his journey in 1998 with <strong>UNMAD Magazine</strong>, he rose to become its 
              Executive Editor, shaping the satirical voice of a generation.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Beyond satire, he is the founder of <strong>Dhaka Comics</strong>, a publishing house 
              dedicated to creating original Bangladeshi superheroes and stories. His work as a 
              Senior Cartoonist at <strong>New Age</strong> allows him to comment on contemporary 
              politics with wit and precision.
            </p>
            
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <BookOpen className="text-red-500 mt-1 mr-3" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Dhaka Comics</h3>
                  <p className="text-sm text-gray-500">Founder & Publisher</p>
                </div>
              </div>
              <div className="flex items-start">
                <PenTool className="text-red-500 mt-1 mr-3" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">New Age</h3>
                  <p className="text-sm text-gray-500">Senior Cartoonist</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="text-red-500 mt-1 mr-3" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">UNMAD Magazine</h3>
                  <p className="text-sm text-gray-500">Executive Editor</p>
                </div>
              </div>
              <div className="flex items-start">
                <GraduationCap className="text-red-500 mt-1 mr-3" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Akantis</h3>
                  <p className="text-sm text-gray-500">Cartoon Educator</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;