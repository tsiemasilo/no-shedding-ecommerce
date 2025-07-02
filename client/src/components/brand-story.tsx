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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-4">Why Choose No Shedding</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-blue-600 w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
