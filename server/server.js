const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'your_email@gmail.com',
                pass: 'your_email_password'
            }
        });

        // Verify the transporter
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Failed to connect to SMTP server');
            } else {
                console.log('Server is ready to take our messages');
            }
        });

        // Define the email options
        const mailOptions = {
            from: email,
            to: 'austinchima515@gmail.com, chimmaustin2@gmail.com',
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send message');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 