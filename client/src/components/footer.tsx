import { Facebook, Twitter, Instagram, Phone, Mail, MapPin, Shield, Award, CheckCircle, Star } from 'lucide-react';
import logoImage from '@assets/WhatsApp Image 2025-06-28 at 20.45.26_1751136519966.jpeg';

export function Footer() {
  const categories = [
    'Lighting Solutions',
    'Power Solutions', 
    'Appliance Alternatives',
    'Comfort & Utility Kits',
    'Premium Items',
    'Safety & Security'
  ];

  const support = [
    'Contact Us',
    'Installation Guide', 
    'Warranty',
    'Returns & Exchanges',
    'Safety Tips',
    'Technical Support'
  ];

  const companyInfo = [
    'About Us',
    'Our Mission',
    'Quality Assurance',
    'Careers',
    'News & Updates'
  ];

  // Professional Certificate/Trust Badge SVGs
  const CertificateBadge = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
    <div className="flex flex-col items-center bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50 hover:bg-gray-700/70 transition-all duration-300">
      <div className="text-electric mb-1">
        {icon}
      </div>
      <span className="text-xs font-semibold text-center leading-tight text-gray-200">{title}</span>
    </div>
  );

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Trust Badges Section */}
      <div className="bg-black/40 border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-electric mb-2">Trusted & Certified</h3>
            <p className="text-gray-300 text-sm">Your safety and satisfaction are our top priorities</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-4xl mx-auto">
            <CertificateBadge 
              title="UL Listed" 
              icon={<Shield className="w-6 h-6" />} 
            />
            <CertificateBadge 
              title="CE Certified" 
              icon={<CheckCircle className="w-6 h-6" />} 
            />
            <CertificateBadge 
              title="FCC Approved" 
              icon={<Award className="w-6 h-6" />} 
            />
            <CertificateBadge 
              title="ISO 9001" 
              icon={<Star className="w-6 h-6" />} 
            />
            <CertificateBadge 
              title="SABS Approved" 
              icon={<Shield className="w-6 h-6" />} 
            />
            <CertificateBadge 
              title="RoHS Compliant" 
              icon={<CheckCircle className="w-6 h-6" />} 
            />
            <CertificateBadge 
              title="Energy Star" 
              icon={<Award className="w-6 h-6" />} 
            />
            <CertificateBadge 
              title="3 Year Warranty" 
              icon={<Star className="w-6 h-6" />} 
            />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 bg-gray-800 rounded-xl flex items-center justify-center p-2 shadow-lg border border-gray-700">
                <img 
                  src={logoImage} 
                  alt="No Shedding Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">No Shedding</span>
                <p className="text-electric text-sm font-medium">Electrical Solutions</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              South Africa's premier electrical solutions provider, delivering reliable, certified, and innovative products for modern homes and businesses. Quality guaranteed.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-electric" />
                <span className="text-gray-300">+27 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-electric" />
                <span className="text-gray-300">info@noshedding.co.za</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-electric" />
                <span className="text-gray-300">Johannesburg, South Africa</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800/60 p-3 rounded-lg text-gray-400 hover:text-electric hover:bg-gray-700/70 transition-all duration-300 border border-gray-700/50">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800/60 p-3 rounded-lg text-gray-400 hover:text-electric hover:bg-gray-700/70 transition-all duration-300 border border-gray-700/50">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800/60 p-3 rounded-lg text-gray-400 hover:text-electric hover:bg-gray-700/70 transition-all duration-300 border border-gray-700/50">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Product Categories */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Product Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-300 hover:text-electric transition-colors text-sm">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Customer Support */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Customer Support</h4>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-electric transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              {companyInfo.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-electric transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm">
              &copy; 2025 No Shedding (Pty) Ltd. All rights reserved. Reg No: 2024/123456/07
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-electric transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-electric transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-electric transition-colors">Cookie Policy</a>
              <a href="/admin" className="text-electric hover:text-white transition-colors">Admin Portal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
