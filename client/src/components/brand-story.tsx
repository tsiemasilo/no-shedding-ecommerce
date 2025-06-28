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
    <section className="py-16 bg-navy">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose No Shedding?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-electric rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-navy w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
