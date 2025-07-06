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

  async sendSupportReply(data: {
    name: string;
    email: string;
    supportType: string;
    originalMessage: string;
    replyMessage: string;
  }): Promise<void> {
    const { name, email, supportType, originalMessage, replyMessage } = data;

    const supportTypeLabel = this.getSupportTypeLabel(supportType);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Support Response - No Shedding</title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  line-height: 1.6;
                  color: #333333;
                  background-color: #FDF6EC;
              }
              
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              
              .header {
                  background: linear-gradient(135deg, #0A2342 0%, #1a3a5c 100%);
                  color: white;
                  padding: 30px 40px;
                  text-align: center;
              }
              
              .logo {
                  font-size: 28px;
                  font-weight: bold;
                  margin-bottom: 8px;
              }
              
              .tagline {
                  font-size: 14px;
                  opacity: 0.9;
                  color: #FFC300;
              }
              
              .content {
                  padding: 40px;
              }
              
              .support-badge {
                  display: inline-block;
                  background-color: #FFC300;
                  color: #0A2342;
                  padding: 8px 16px;
                  border-radius: 20px;
                  font-size: 12px;
                  font-weight: bold;
                  text-transform: uppercase;
                  margin-bottom: 20px;
              }
              
              .original-request {
                  background-color: #f8f9fa;
                  border-left: 4px solid #0A2342;
                  padding: 20px;
                  margin: 20px 0;
                  border-radius: 0 8px 8px 0;
              }
              
              .reply-section {
                  background-color: #fff;
                  border: 2px solid #FFC300;
                  border-radius: 8px;
                  padding: 25px;
                  margin: 20px 0;
              }
              
              .footer {
                  background-color: #0A2342;
                  color: white;
                  padding: 30px 40px;
                  text-align: center;
              }
              
              .contact-info {
                  margin-top: 20px;
                  font-size: 14px;
                  opacity: 0.9;
              }
              
              @media (max-width: 600px) {
                  .container {
                      margin: 10px;
                      border-radius: 8px;
                  }
                  
                  .content, .header, .footer {
                      padding: 20px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <div class="logo">⚡ No Shedding</div>
                  <div class="tagline">Premium Electrical Solutions</div>
              </div>
              
              <div class="content">
                  <div class="support-badge">${supportTypeLabel} Response</div>
                  
                  <h1 style="color: #0A2342; font-size: 24px; margin-bottom: 20px;">
                      Hello ${name}!
                  </h1>
                  
                  <p style="font-size: 16px; margin-bottom: 20px;">
                      Thank you for contacting No Shedding support. Our technical team has reviewed your request and provided the following response:
                  </p>
                  
                  <div class="original-request">
                      <h3 style="color: #0A2342; margin-bottom: 10px;">Your Original Request:</h3>
                      <p style="color: #666; font-style: italic;">${originalMessage}</p>
                  </div>
                  
                  <div class="reply-section">
                      <h3 style="color: #0A2342; margin-bottom: 15px;">Our Response:</h3>
                      <div style="font-size: 16px; line-height: 1.8; white-space: pre-wrap;">${replyMessage}</div>
                  </div>
                  
                  <p style="font-size: 16px; margin: 20px 0;">
                      If you have any follow-up questions or need additional assistance, please don't hesitate to contact us again.
                  </p>
                  
                  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                      <h4 style="color: #0A2342; margin-bottom: 10px;">Need Further Assistance?</h4>
                      <p style="margin-bottom: 10px;">
                          📞 <strong>Phone:</strong> +27 11 123 4567<br>
                          📧 <strong>Email:</strong> support@noshedding.co.za<br>
                          ⏰ <strong>Hours:</strong> Mon-Fri 8AM-6PM, Sat 9AM-2PM
                      </p>
                  </div>
              </div>
              
              <div class="footer">
                  <p style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">
                      ⚡ No Shedding - Premium Electrical Solutions
                  </p>
                  <p style="margin-bottom: 15px;">
                      Powering South Africa with innovative electrical solutions
                  </p>
                  
                  <div class="contact-info">
                      <p>📍 Johannesburg, South Africa</p>
                      <p>📞 +27 11 123 4567 | 📧 support@noshedding.co.za</p>
                      <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">
                          © 2025 No Shedding. All rights reserved.
                      </p>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"No Shedding Support" <${process.env.SMTP_USER || 'nosheddingsupp@gmail.com'}>`,
      to: email,
      subject: `Re: ${supportTypeLabel} Request - No Shedding Support`,
      html: htmlContent,
    };

    await this.transporter.sendMail(mailOptions);
    console.log(`Support reply sent to: ${email}`);
  }

  private getSupportTypeLabel(type: string): string {
    switch (type) {
      case 'technical': return 'Technical Support';
      case 'installation': return 'Installation Help';
      case 'product-info': return 'Product Information';
      case 'warranty': return 'Warranty Claim';
      case 'billing': return 'Billing Question';
      case 'general': return 'General Inquiry';
      case 'emergency': return 'Emergency Support';
      default: return type;
    }
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