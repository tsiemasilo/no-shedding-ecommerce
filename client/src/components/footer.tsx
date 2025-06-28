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
    <footer className="bg-charcoal text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bolt className="text-electric text-2xl" />
              <span className="text-xl font-bold">No Shedding</span>
            </div>
            <p className="text-gray-400 mb-4">Premium electrical solutions for modern living</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-electric transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-electric transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.map((category) => (
                <li key={category}>
                  <a href="#" className="hover:text-electric transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              {support.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-electric transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span key={cert} className="bg-navy text-electric px-3 py-1 rounded text-sm">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 No Shedding. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
