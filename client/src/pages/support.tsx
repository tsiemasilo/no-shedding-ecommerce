import { Phone, Mail, MessageCircle, FileText, Wrench, Shield, Clock, Award, ArrowLeft, ExternalLink, Send, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/header';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function Support() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    supportType: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.supportType || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Support Request Submitted",
          description: "We'll get back to you within 24 hours."
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          supportType: '',
          description: ''
        });
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportChannels = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      contact: "+27 11 123 4567",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
      color: "bg-green-500"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Send us detailed questions and get comprehensive answers",
      contact: "support@noshedding.co.za",
      hours: "Response within 24 hours",
      color: "bg-blue-500"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Get instant help with our online chat system",
      contact: "Available on website",
      hours: "Mon-Fri: 8AM-6PM",
      color: "bg-purple-500"
    }
  ];

  const supportResources = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Installation Guides",
      description: "Step-by-step instructions for all our products",
      items: ["LED Installation Guide", "UPS Setup Manual", "Solar Panel Installation", "Safety Guidelines"]
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Technical Support",
      description: "Expert assistance for complex technical issues",
      items: ["Troubleshooting Help", "Product Configuration", "Compatibility Check", "Performance Optimization"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Warranty & Returns",
      description: "Information about our warranty and return policies",
      items: ["3-Year Warranty", "Return Process", "Replacement Policy", "Repair Services"]
    }
  ];

  const faqItems = [
    {
      question: "What is your warranty policy?",
      answer: "All our products come with a comprehensive 3-year warranty covering manufacturing defects and performance issues. We also offer extended warranty options for additional peace of mind."
    },
    {
      question: "Do you provide installation services?",
      answer: "Yes, we have a network of certified installers across South Africa. Installation services are available for most products with professional certification and safety guarantees."
    },
    {
      question: "How do I return a product?",
      answer: "Returns are accepted within 30 days of purchase. Products must be in original condition with all packaging. Contact our support team to initiate the return process."
    },
    {
      question: "Are your products certified for South African standards?",
      answer: "Absolutely! All our products meet SABS, IEC, and other relevant South African electrical standards. We only stock certified, safe, and compliant electrical solutions."
    },
    {
      question: "Do you offer bulk discounts for businesses?",
      answer: "Yes, we provide competitive pricing for bulk orders and business customers. Contact our sales team for custom quotes and business account setup."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white hover:text-navy font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-3 group-hover:animate-pulse" />
            <span className="text-lg">Back to Home</span>
          </Button>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Customer Support</h1>
            <p className="text-xl text-sand max-w-3xl mx-auto">
              We're here to help you with all your electrical solution needs. Our expert team provides comprehensive support to ensure your complete satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Support Channels */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Get in Touch</h2>
            <p className="text-charcoal text-lg">Choose the support channel that works best for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-electric transition-all duration-300 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${channel.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                    {channel.icon}
                  </div>
                  <CardTitle className="text-xl text-navy">{channel.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-charcoal mb-4">{channel.description}</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-navy">{channel.contact}</p>
                    <p className="text-sm text-gray-600">{channel.hours}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Support Form */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Submit a Support Request</h2>
            <p className="text-charcoal text-lg">
              Get personalized assistance from our technical experts. Fill out the form below and we'll respond within 24 hours.
            </p>
          </div>

          <Card className="border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-navy text-white">
              <CardTitle className="flex items-center space-x-2 text-xl">
                <Zap className="w-6 h-6 text-electric" />
                <span>Technical Support Request</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-navy font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-2 border-gray-300 focus:border-electric"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-navy font-semibold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="border-2 border-gray-300 focus:border-electric"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-navy font-semibold">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+27 11 123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="border-2 border-gray-300 focus:border-electric"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportType" className="text-navy font-semibold">
                      Support Type *
                    </Label>
                    <Select value={formData.supportType} onValueChange={(value) => handleInputChange('supportType', value)}>
                      <SelectTrigger className="border-2 border-gray-300 focus:border-electric">
                        <SelectValue placeholder="Select support type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="installation">Installation Help</SelectItem>
                        <SelectItem value="product-info">Product Information</SelectItem>
                        <SelectItem value="warranty">Warranty Claim</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="emergency">Emergency Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-navy font-semibold">
                    Problem Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your issue or question in detail. Include any error messages, model numbers, or specific symptoms you're experiencing..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="border-2 border-gray-300 focus:border-electric min-h-[120px]"
                    required
                  />
                  <p className="text-sm text-gray-600">
                    The more details you provide, the better we can assist you.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Your information is secure and confidential</span>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-electric hover:bg-electric/90 text-navy font-semibold px-8 py-3 min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Submit Request</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <Clock className="w-8 h-8 text-electric mx-auto mb-2" />
              <h3 className="font-semibold text-navy mb-1">Quick Response</h3>
              <p className="text-sm text-charcoal">Most requests answered within 24 hours</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <User className="w-8 h-8 text-electric mx-auto mb-2" />
              <h3 className="font-semibold text-navy mb-1">Expert Support</h3>
              <p className="text-sm text-charcoal">Certified electrical technicians</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <Award className="w-8 h-8 text-electric mx-auto mb-2" />
              <h3 className="font-semibold text-navy mb-1">Satisfaction Guaranteed</h3>
              <p className="text-sm text-charcoal">We solve your problems effectively</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Resources */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Support Resources</h2>
            <p className="text-charcoal text-lg">Everything you need to get the most out of your electrical solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportResources.map((resource, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-electric transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-electric/20 rounded-lg flex items-center justify-center text-navy">
                      {resource.icon}
                    </div>
                    <CardTitle className="text-xl text-navy">{resource.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-charcoal mb-4">{resource.description}</p>
                  <ul className="space-y-2">
                    {resource.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-2">
                        <ExternalLink className="w-4 h-4 text-electric" />
                        <span className="text-sm text-charcoal hover:text-electric cursor-pointer transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-charcoal text-lg">Quick answers to common questions</p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-electric transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-navy mb-3">{faq.question}</h3>
                  <p className="text-charcoal leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Support */}
      <div className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Emergency Support</h2>
            <p className="text-sand text-lg mb-6">
              For electrical emergencies or safety concerns, contact our 24/7 emergency hotline immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-red-400" />
                <span className="text-xl font-bold">Emergency: +27 11 911 HELP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-electric" />
                <span className="text-sand">Available 24/7</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              * Emergency support is available for safety-critical issues and product failures that pose immediate risk.
            </p>
          </div>
        </div>
      </div>

      {/* Quality Commitment */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-electric rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-navy" />
            </div>
            <h2 className="text-3xl font-bold text-navy mb-4">Our Commitment to You</h2>
            <p className="text-charcoal text-lg leading-relaxed">
              At No Shedding, we're committed to providing exceptional customer support. Our certified technicians, 
              comprehensive warranty coverage, and 24/7 emergency support ensure that you always have reliable 
              electrical solutions when you need them most. Your satisfaction and safety are our top priorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}