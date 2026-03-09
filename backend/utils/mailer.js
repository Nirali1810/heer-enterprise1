import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send Welcome Email
export const sendWelcomeEmail = async (name, email) => {
  // Skip email if disabled
  if (process.env.ENABLE_EMAIL === 'false') {
    console.log(`⏭️  Email disabled - skipping welcome email for ${email}`);
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to StyleAI 🎨",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Welcome to StyleAI</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p style="color: #333; font-size: 16px;">Hi <strong>${name}</strong>,</p>
            <p style="color: #555; line-height: 1.6;">
              Thank you for creating an account with StyleAI! We're excited to help you discover your perfect style using our AI-powered color analysis tool.
            </p>
            <p style="color: #555; line-height: 1.6;">
              To get started, simply log in to your account and explore our collections or try our style scanner feature.
            </p>
            <div style="margin: 30px 0; text-align: center;">
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/login" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Go to Login
              </a>
            </div>
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
              If you didn't create this account, please ignore this email.
            </p>
          </div>
          <div style="background-color: #f0f0f0; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
            <p style="margin: 0;">© 2026 StyleAI. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
};

// Send Login Notification Email
export const sendLoginNotificationEmail = async (name, email) => {
  // Skip email if disabled
  if (process.env.ENABLE_EMAIL === 'false') {
    console.log(`⏭️  Email disabled - skipping login notification email for ${email}`);
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Login Notification - StyleAI",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Login Detected</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p style="color: #333; font-size: 16px;">Hi <strong>${name}</strong>,</p>
            <p style="color: #555; line-height: 1.6;">
              We've detected a login to your StyleAI account. If this wasn't you, please change your password immediately.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              <strong>Login Details:</strong><br>
              Date: ${new Date().toLocaleString()}<br>
              Account: ${email}
            </p>
            <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
              If you didn't log in, please change your password right away.
            </p>
          </div>
          <div style="background-color: #f0f0f0; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
            <p style="margin: 0;">© 2026 StyleAI. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Login notification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending login notification email:", error);
    throw error;
  }
};

// Send Order Confirmation Email
export const sendOrderConfirmationEmail = async (name, email, orderId, orderItems, totalPrice) => {
  // Skip email if disabled
  if (process.env.ENABLE_EMAIL === 'false') {
    console.log(`⏭️  Email disabled - skipping order confirmation email for ${email}`);
    return;
  }

  try {
    const itemsHTML = orderItems
      .map(
        (item) => `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 12px; text-align: left;">${item.name}</td>
          <td style="padding: 12px; text-align: center;">${item.qty}</td>
          <td style="padding: 12px; text-align: right;">₹${item.price.toFixed(2)}</td>
          <td style="padding: 12px; text-align: right;">₹${(item.qty * item.price).toFixed(2)}</td>
        </tr>
      `
      )
      .join("");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Order Confirmation - StyleAI #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Order Confirmed!</h1>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p style="color: #333; font-size: 16px;">Hi <strong>${name}</strong>,</p>
            <p style="color: #555; line-height: 1.6;">
              Thank you for your order! We're processing your purchase and will ship it soon.
            </p>
            
            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ddd;">
              <p style="color: #333; font-weight: bold; margin: 0 0 10px 0;">Order Details</p>
              <p style="color: #666; margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>

            <p style="color: #333; font-weight: bold; margin: 20px 0 10px 0;">Items Ordered:</p>
            <table style="width: 100%; border-collapse: collapse; background-color: white; border-radius: 5px; overflow: hidden;">
              <thead>
                <tr style="background-color: #f0f0f0; border-bottom: 2px solid #ddd;">
                  <th style="padding: 12px; text-align: left;">Product</th>
                  <th style="padding: 12px; text-align: center;">Qty</th>
                  <th style="padding: 12px; text-align: right;">Price</th>
                  <th style="padding: 12px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #ddd; text-align: right;">
              <p style="color: #333; font-size: 18px; font-weight: bold; margin: 0;">
                Total: <span style="color: #667eea;">₹${totalPrice.toFixed(2)}</span>
              </p>
            </div>

            <div style="margin: 30px 0; text-align: center;">
              <a href="${process.env.FRONTEND_URL || "http://localhost:5173"}/orders/${orderId}" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Track Your Order
              </a>
            </div>

            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              We'll send you updates as your order progresses. Thank you for shopping with StyleAI!
            </p>
          </div>
          <div style="background-color: #f0f0f0; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; color: #666;">
            <p style="margin: 0;">© 2026 StyleAI. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    throw error;
  }
};
