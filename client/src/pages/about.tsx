import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArrowLeft, Zap, Shield, Award, Users, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Back Button Section */}
      <div className="bg-navy py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-navy font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            <span className="text-lg">Back to Home</span>
          </Button>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-light text-gray-900 mb-6 tracking-tight">About No Shedding</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            South Africa's premier electrical solutions provider, delivering uninterrupted power and innovative technology solutions for modern businesses and homes.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-8">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
                No Shedding is committed to eliminating power outages and electrical disruptions 
                from your daily operations. Our comprehensive portfolio of electrical solutions ensures 
                continuous power delivery, enhanced safety protocols, and improved operational efficiency 
                for businesses and residential clients across South Africa.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                We understand that reliable electricity is fundamental to modern life and business success. 
                Our dedication lies in providing cutting-edge electrical infrastructure and solutions that 
                deliver uninterrupted power when it matters most.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-900 p-12 rounded-lg">
                <Zap className="w-20 h-20 mb-6 mx-auto text-blue-400" />
                <h3 className="text-2xl font-light text-center text-white mb-3">Zero Downtime</h3>
                <p className="text-center text-gray-300 font-light">
                  Engineering reliable power solutions for uninterrupted operations
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Core Values</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Safety Excellence</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Every solution we provide adheres to international safety standards and undergoes rigorous quality assurance testing.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We partner exclusively with industry-leading manufacturers to deliver superior electrical infrastructure solutions.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Client Success</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Your operational continuity and satisfaction drive every decision in our solution design and implementation process.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-900 rounded-lg p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-white mb-4">Performance Metrics</h2>
            <div className="w-16 h-1 bg-blue-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-light text-blue-400 mb-3">10,000+</div>
              <div className="text-gray-300 font-light text-lg">Clients Served</div>
            </div>
            <div>
              <div className="text-5xl font-light text-blue-400 mb-3">99.9%</div>
              <div className="text-gray-300 font-light text-lg">System Reliability</div>
            </div>
            <div>
              <div className="text-5xl font-light text-blue-400 mb-3">24/7</div>
              <div className="text-gray-300 font-light text-lg">Technical Support</div>
            </div>
            <div>
              <div className="text-5xl font-light text-blue-400 mb-3">5 Years</div>
              <div className="text-gray-300 font-light text-lg">Standard Warranty</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Why Choose No Shedding</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Star className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-lg">Enterprise-Grade Solutions</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Premium electrical infrastructure sourced from global industry leaders, ensuring maximum reliability and performance.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-lg">Rapid Deployment</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Streamlined logistics and nationwide distribution network ensuring critical power solutions reach you efficiently.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-lg">Technical Excellence</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Certified electrical engineers and specialists providing comprehensive consultation and solution architecture.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-lg">Extended Coverage</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Comprehensive warranty programs and service level agreements protecting your investment long-term.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-lg">Professional Installation</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Certified installation and commissioning services for complex electrical infrastructure deployments.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-lg">Innovation Leadership</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Continuous technology advancement and integration of next-generation electrical solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-blue-600 rounded-lg p-12">
          <h2 className="text-4xl font-light text-white mb-6">Ready to Secure Your Power Infrastructure?</h2>
          <p className="text-xl mb-8 text-blue-100 font-light max-w-2xl mx-auto">
            Join industry leaders who trust No Shedding for their critical electrical infrastructure needs.
          </p>
          <Button
            onClick={() => setLocation('/')}
            className="bg-white text-blue-600 hover:bg-gray-50 font-medium py-4 px-10 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Explore Solutions
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}