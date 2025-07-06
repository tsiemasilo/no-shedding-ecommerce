import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const config: EmailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'nosheddingsupp@gmail.com',
        pass: process.env.SMTP_PASS || 'opla vtqm arzq lrgj',
      },
    };

    this.transporter = nodemailer.createTransport(config);
  }

  async sendNewsletterWelcome(email: string): Promise<void> {
    const mailOptions = {
      from: `"No Shedding" <${process.env.SMTP_USER || 'nosheddingsupp@gmail.com'}>`,
      to: email,
      subject: '🔌 Welcome to No Shedding Newsletter - Exclusive Deals Inside!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0A2342 0%, #FFC300 100%); color: white; border-radius: 10px; overflow: hidden;">
          <header style="background: rgba(0,0,0,0.2); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #FFC300; font-size: 28px;">⚡ No Shedding</h1>
            <p style="margin: 10px 0 0 0; color: #FDF6EC;">Premium Electrical Solutions</p>
          </header>
          
          <div style="padding: 40px 30px; background: white; color: #333;">
            <h2 style="color: #0A2342; margin-top: 0;">Welcome to the No Shedding Family!</h2>
            
            <p>Thank you for subscribing to our newsletter! You're now part of an exclusive community that gets first access to:</p>
            
            <div style="background: #FDF6EC; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FFC300;">
              <h3 style="color: #0A2342; margin-top: 0;">🎯 Exclusive Benefits:</h3>
              <ul style="color: #333; line-height: 1.6;">
                <li><strong>15% OFF</strong> your first order with code: <span style="background: #FFC300; color: #0A2342; padding: 2px 8px; border-radius: 4px; font-weight: bold;">WELCOME15</span></li>
                <li>Early access to new products and innovations</li>
                <li>Special discounts on load shedding solutions</li>
                <li>Expert tips and electrical safety guides</li>
                <li>Flash sales and limited-time offers</li>
              </ul>
            </div>
            
            <div style="background: #0A2342; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <h3 style="color: #FFC300; margin-top: 0;">🔥 This Week's Featured Deals</h3>
              <p>• Rechargeable LED Lanterns - Up to 30% OFF</p>
              <p>• Solar Powered Solutions - Buy 2 Get 1 Free</p>
              <p>• Surge Protectors - 25% OFF All Models</p>
              <p style="margin: 20px 0 0 0;">
                <a href="#" style="background: #FFC300; color: #0A2342; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Shop Now</a>
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Stay powered up with South Africa's leading electrical solutions provider. From load shedding essentials to premium safety equipment, we've got you covered.
            </p>
          </div>
          
          <footer style="background: #333; color: #FDF6EC; padding: 20px 30px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">No Shedding - Premium Electrical Solutions</p>
            <p style="margin: 5px 0 0 0;">📧 nosheddingsupp@gmail.com | 📞 +27 (0) 11 123-4567</p>
          </footer>
        </div>
      `
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendSupportRequest(data: {
    name: string;
    email: string;
    phone?: string;
    supportType: string;
    description: string;
  }): Promise<void> {
    // Email to admin
    const adminMailOptions = {
      from: `"No Shedding Support" <${process.env.SMTP_USER || 'nosheddingsupp@gmail.com'}>`,
      to: process.env.SMTP_USER || 'nosheddingsupp@gmail.com',
      subject: `🔧 New Support Request - ${data.supportType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
          <header style="background: #0A2342; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #FFC300;">🔧 New Support Request</h1>
          </header>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #0A2342; margin-top: 0;">Support Request Details</h2>
            
            <div style="background: #FDF6EC; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #0A2342; width: 120px;">Type:</td>
                  <td style="padding: 8px 0; color: #333;">${data.supportType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #0A2342;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #0A2342;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">${data.email}</td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #0A2342;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">${data.phone}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #0A2342;">Description:</h3>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 6px; border-left: 4px solid #FFC300;">
                ${data.description.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #FFF3CD; border-radius: 6px;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>Action Required:</strong> Please respond to this customer within 24 hours.
              </p>
            </div>
          </div>
        </div>
      `
    };

    // Confirmation email to customer
    const customerMailOptions = {
      from: `"No Shedding Support" <${process.env.SMTP_USER || 'nosheddingsupp@gmail.com'}>`,
      to: data.email,
      subject: '✅ Support Request Received - We\'ll Help You Soon!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0A2342 0%, #FFC300 100%); color: white; border-radius: 10px; overflow: hidden;">
          <header style="background: rgba(0,0,0,0.2); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #FFC300; font-size: 28px;">⚡ No Shedding Support</h1>
            <p style="margin: 10px 0 0 0; color: #FDF6EC;">We're Here to Help</p>
          </header>
          
          <div style="padding: 40px 30px; background: white; color: #333;">
            <h2 style="color: #0A2342; margin-top: 0;">Hi ${data.name}!</h2>
            
            <p>Thank you for contacting No Shedding support. We've received your request and our team is already on it!</p>
            
            <div style="background: #FDF6EC; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FFC300;">
              <h3 style="color: #0A2342; margin-top: 0;">📋 Your Request Summary:</h3>
              <ul style="color: #333; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li><strong>Support Type:</strong> ${data.supportType}</li>
                <li><strong>Request Date:</strong> ${new Date().toLocaleDateString('en-ZA', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</li>
                <li><strong>Reference:</strong> NS-${Date.now().toString().slice(-6)}</li>
              </ul>
            </div>
            
            <div style="background: #0A2342; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #FFC300; margin-top: 0;">⏰ What Happens Next?</h3>
              <p style="margin: 0; line-height: 1.6;">
                Our expert support team will review your request and respond within <strong>24 hours</strong>. 
                For urgent electrical safety issues, please call our emergency hotline: 
                <strong style="color: #FFC300;">+27 (0) 86 999-HELP</strong>
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              In the meantime, feel free to browse our <a href="#" style="color: #0A2342;">knowledge base</a> 
              or check out our latest <a href="#" style="color: #0A2342;">installation guides</a>.
            </p>
          </div>
          
          <footer style="background: #333; color: #FDF6EC; padding: 20px 30px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">No Shedding - Premium Electrical Solutions</p>
            <p style="margin: 5px 0 0 0;">📧 nosheddingsupp@gmail.com | 📞 +27 (0) 11 123-4567</p>
          </footer>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      this.transporter.sendMail(adminMailOptions),
      this.transporter.sendMail(customerMailOptions)
    ]);
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();