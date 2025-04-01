require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://austincodes.netlify.app', // Replace with your frontend domain
  credentials: true
}));

// Apply rate limiting to the contact form
const contactFormLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 6, // Limit each IP to 6 requests per windowMs
    message: 'Too many requests from this IP at this time. Please try again later ^_^.'
});

// Input validation middleware
const validateContactForm = (req, res, next) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).send({ message: 'All fields are required.' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send({ message: 'Invalid email format.' });
    }

    // Subject and message length validation (optional, adjust as needed)
    if (subject.length > 100) {
        return res.status(400).send({ message: 'Subject is too long.' });
    }
    if (message.length > 2000) {
        return res.status(400).send({ message: 'Message is too long.' });
    }

    next(); // Proceed to the next middleware or route handler
};

app.post('/api/contact', contactFormLimiter, validateContactForm, async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Create a transporter object using environment variables for credentials
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // Use environment variable
                pass: process.env.EMAIL_PASS  // Use environment variable
            }
        });

        // Verify the transporter
        transporter.verify((error, success) => {
            if (error) {
                console.error('SMTP server connection error:', error);
                return res.status(500).send({ message: 'Failed to connect to SMTP server.' });
            } else {
                console.log('Server is ready to send messages');

                // Define and call the async testEmail function
                async function testEmail() {
                    const testMailOptions = {
                        from: process.env.EMAIL_USER,
                        to: 'austinchima515@gmail.com',
                        subject: 'Test Email',
                        text: 'This is a test email from the server.'
                    };

                    try {
                        await transporter.sendMail(testMailOptions);
                        console.log('\nTest email sent successfully');
                    } catch (error) {
                        console.error('Error sending test email:', error);
                    }
                }

                testEmail(); // Call the async function after successful verification
            }
        });

        // Define the email options for the message to you (admin email)
        const mailToAdminOptions = {
            from: email, // Allow any email to be the sender
            to: 'austinchima515@gmail.com, chimaaustin2@gmail.com', // Your admin email addresses
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        };

        // Define email options for confirmation to sender
        const confirmationMailOptions = {
            from: process.env.EMAIL_USER, // Use your email for confirmation
            to: email, // Send confirmation to the user's email
            subject: 'Thank you for contacting AustinCodes',
            text: `Dear ${name},\n\nThank you for reaching out! Your message has been received and I will get back to you as soon as possible.\n\nHere is a copy of your message:\n\nSubject: ${subject}\nMessage: ${message}\n\nBest regards,\nAustin Chima`
        };

        // Send the email to admin addresses
        await transporter.sendMail(mailToAdminOptions);
        console.log('Email sent to admin successfully'); // Log success

        // Send the confirmation email to the user
        await transporter.sendMail(confirmationMailOptions);
        console.log('Confirmation email sent to user successfully'); // Log success

        res.status(200).send({ message: 'Message sent successfully!' }); // Success response to client

    } catch (error) {
        console.error('Error sending email:', error); // Detailed error logging
        res.status(500).send({ message: 'Failed to send message. Please try again later.' }); // User-friendly error response
    }
});

app.get('/test', (req, res) => {
    res.send('Server is reachable!');
});

console.log('\nEmail User:', process.env.EMAIL_USER);
console.log('\nEmail Pass:', process.env.EMAIL_PASS);

app.use(morgan('combined'));

app.listen(port, () => {
    console.log(`\nServer is running on port ${port}`);
}); 