import { Shield, Award, Headphones } from 'lucide-react';

export function BrandStory() {
  const features = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All our products meet the highest safety standards and certifications"
    },
    {
      icon: Award,
      title: "Quality Promise",
      description: "Premium materials and rigorous testing ensure long-lasting performance"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "Our electrical experts are available 24/7 for technical support"
    }
  ];

  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-electric rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-bright-orange rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Choose No Shedding?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry-leading electrical solutions backed by decades of expertise and innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-electric to-bright-orange rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <feature.icon className="text-navy w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-electric transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="border-l-4 border-electric pl-6">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="border-l-4 border-electric pl-6">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="border-l-4 border-electric pl-6">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-300">Uptime Guarantee</div>
            </div>
            <div className="border-l-4 border-electric pl-6">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
