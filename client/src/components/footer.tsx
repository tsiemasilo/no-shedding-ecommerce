import { Bolt, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  const categories = [
    'Lighting Solutions',
    'Power Solutions', 
    'Appliance Alternatives',
    'Comfort & Utility Kits',
    'Premium Items'
  ];

  const support = [
    'Contact Us',
    'Installation Guide', 
    'Warranty',
    'Returns',
    'Safety Tips'
  ];

  const certifications = [
    'UL Listed',
    'CE Certified',
    'FCC Approved'
  ];

  return (
    <footer className="bg-charcoal text-white py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-electric/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-electric rounded-xl p-2">
                <Bolt className="text-navy text-2xl" />
              </div>
              <div>
                <span className="text-2xl font-bold">No Shedding</span>
                <div className="text-electric text-xs font-medium">ELECTRICAL SOLUTIONS</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium electrical solutions engineered for safety, reliability, and modern living. Trusted by professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-navy/50 hover:bg-electric hover:text-navy p-3 rounded-xl transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-navy/50 hover:bg-electric hover:text-navy p-3 rounded-xl transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-navy/50 hover:bg-electric hover:text-navy p-3 rounded-xl transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6 text-electric">Categories</h4>
            <ul className="space-y-3 text-gray-300">
              {categories.map((category) => (
                <li key={category}>
                  <a href="#" className="hover:text-electric transition-colors hover:translate-x-2 transform duration-200 block">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6 text-electric">Support</h4>
            <ul className="space-y-3 text-gray-300">
              {support.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-electric transition-colors hover:translate-x-2 transform duration-200 block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6 text-electric">Certifications</h4>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert} className="bg-navy/30 border border-electric/30 text-electric px-4 py-3 rounded-xl font-semibold hover:bg-electric hover:text-navy transition-all duration-300">
                  {cert}
                </div>
              ))}
            </div>
            
            {/* Contact Info */}
            <div className="mt-8">
              <h5 className="font-semibold text-white mb-3">Emergency Support</h5>
              <div className="text-bright-orange font-bold text-lg">1-800-NO-SHED</div>
              <div className="text-gray-400 text-sm">Available 24/7</div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">
              &copy; 2025 No Shedding. All rights reserved.
            </div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-electric transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-electric transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-electric transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
