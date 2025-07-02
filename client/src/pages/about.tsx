import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArrowLeft, Zap, Shield, Award, Users, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-sand">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            onClick={() => setLocation('/')}
            variant="ghost"
            className="flex items-center space-x-2 text-navy hover:text-electric hover:bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:animate-pulse" />
            <span>Back to Home</span>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-navy mb-6">About No Shedding</h1>
          <p className="text-xl text-charcoal max-w-3xl mx-auto leading-relaxed">
            Powering South Africa's future with innovative electrical solutions that never let you down.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Our Mission</h2>
              <p className="text-lg text-charcoal leading-relaxed mb-6">
                At No Shedding, we're committed to eliminating power outages and electrical disruptions 
                from your life. Our comprehensive range of electrical solutions ensures continuous power, 
                enhanced safety, and improved quality of life for homes and businesses across South Africa.
              </p>
              <p className="text-lg text-charcoal leading-relaxed">
                We believe that reliable electricity is not a luxury—it's a necessity. That's why we've 
                dedicated ourselves to providing cutting-edge electrical equipment and solutions that 
                keep the lights on when it matters most.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-electric to-bright-orange p-8 rounded-2xl text-white">
                <Zap className="w-16 h-16 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-center">Zero Downtime</h3>
                <p className="text-center text-white/90 mt-2">
                  Our solutions ensure your power stays on
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="w-12 h-12 text-electric mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-3">Safety First</h3>
              <p className="text-charcoal">
                Every product we offer meets the highest safety standards and certifications.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Award className="w-12 h-12 text-electric mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-3">Quality Excellence</h3>
              <p className="text-charcoal">
                We source only premium electrical equipment from trusted manufacturers worldwide.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-electric mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-3">Customer Focus</h3>
              <p className="text-charcoal">
                Your satisfaction and power security are our top priorities.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-navy to-charcoal rounded-2xl p-8 mb-16 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">By the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-electric mb-2">10,000+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-electric mb-2">99.9%</div>
              <div className="text-white/80">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-electric mb-2">24/7</div>
              <div className="text-white/80">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-electric mb-2">5 Years</div>
              <div className="text-white/80">Average Warranty</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Why Choose No Shedding?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Star className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-navy mb-2">Premium Quality Products</h3>
                  <p className="text-charcoal">
                    We stock only the finest electrical equipment from internationally recognized brands.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-navy mb-2">Fast Delivery</h3>
                  <p className="text-charcoal">
                    Quick nationwide shipping ensures you get your power solutions when you need them.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-navy mb-2">Expert Support</h3>
                  <p className="text-charcoal">
                    Our team of electrical specialists is ready to help you choose the right solutions.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Shield className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-navy mb-2">Comprehensive Warranties</h3>
                  <p className="text-charcoal">
                    All our products come with extensive warranties for your peace of mind.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Award className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-navy mb-2">Certified Installation</h3>
                  <p className="text-charcoal">
                    Professional installation services available for complex electrical systems.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Zap className="w-6 h-6 text-electric flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-navy mb-2">Innovation Focus</h3>
                  <p className="text-charcoal">
                    We continuously update our inventory with the latest electrical technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-gradient-to-r from-electric to-bright-orange rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Eliminate Load Shedding?</h2>
          <p className="text-xl mb-6 text-white/90">
            Join thousands of satisfied customers who've made the switch to reliable power.
          </p>
          <Button
            onClick={() => setLocation('/')}
            className="bg-white text-navy hover:bg-white/90 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105"
          >
            Shop Now
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}