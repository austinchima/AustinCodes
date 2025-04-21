# Austin Chima's Portfolio

## Overview

This portfolio showcases the work and skills of Austin Chima, a Software Engineering student and aspiring Full Stack Developer. The website is designed to provide a seamless user experience across devices, featuring a responsive layout, project showcases, and a contact form.

## Features

- **Responsive Design:** The portfolio adapts to various screen sizes, ensuring a consistent experience on desktops, tablets, and mobile devices.
- **Project Showcase:** Displays various projects with descriptions, technologies used, and links to view the projects.
- **Skills Section:** Highlights the technologies and skills Austin is proficient in.
- **Contact Form:** A functional contact form that allows visitors to send messages directly to Austin.
- **Loading Screen:** A loading screen with a cube loader animation enhances user experience during initial load.
- **Smooth Scrolling:** Implements smooth scrolling for navigation between different sections of the portfolio.
- **"Coming Soon" Badge:** Indicates projects that are currently under development.
- **Hamburger Menu:** A hamburger menu for navigation on smaller screens.
- **Social Media Links:** Links to GitHub and LinkedIn profiles.

## Technologies Used

### Frontend
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): A build tool that provides a fast and efficient development experience.
- [React Icons](https://react-icons.github.io/react-icons/): Incorporates various icons for enhanced UI.
- [React Scroll](https://www.npmjs.com/package/react-scroll): Enables smooth scrolling functionality.
- [React Toastify](https://www.npmjs.com/package/react-toastify): Adds toast notifications for user feedback.
- [Swiper](https://swiperjs.com/): Used for creating interactive and responsive sliders.
- CSS for styling and responsive design.

### Backend
- [Node.js](https://nodejs.org/): A JavaScript runtime for building the server-side application.
- [Express](https://expressjs.com/): A web application framework for Node.js.
- [Nodemailer](https://nodemailer.com/): Used for sending emails via SMTP.
- [Body-parser](https://www.npmjs.com/package/body-parser): Middleware to handle JSON and URL encoded form data.
- [CORS](https://www.npmjs.com/package/cors): Middleware to enable Cross-Origin Resource Sharing.
- [Dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a `.env` file.
- [Express-rate-limit](https://www.npmjs.com/package/express-rate-limit): Used for rate limiting to prevent abuse of the contact form.
- [Morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for Node.js.

## Setup Instructions

### Frontend

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:5173` to view the portfolio.

### Backend

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   In the `server` directory, create a `.env` file and add the following environment variables:

   ```
   EMAIL_USER=<your-email-address>
   EMAIL_PASS=<your-email-password>
   ```

   Replace `<your-email-address>` and `<your-email-password>` with your actual email credentials.

4. **Start the server:**

   ```bash
   node server.js
   ```

   Ensure that the server is running before using the contact form.

## Folder Structure

```
austins_portfolio/
├── client/ # React frontend
│ ├── src/ # Source code
│ │ ├── assets/ # Images, logos, and other assets
│ │ ├── components/ # Reusable React components
│ │ ├── App.jsx # Main application component
│ │ ├── main.jsx # Entry point for the React application
│ │ ├── index.css # Global styles
│ │ └── ...
│ ├── public/ # Static assets
│ ├── package.json # Frontend dependencies and scripts
│ ├── vite.config.js # Vite configuration
│ └── ...
├── api/ # C# backend
│ ├── server.js # Main server file
│ ├── package.json # Backend dependencies and scripts
│ └── ...
├── .gitignore # Specifies intentionally untracked files that Git should ignore
├── README.md # Project documentation
└── ...
```

## Environment Variables

The backend server uses the following environment variables:

- `EMAIL_USER`: The email address used to send emails.
- `EMAIL_PASS`: The password for the email address.

Make sure to set these variables in your `.env` file in the `api` directory.

<!-- ## Contributing

This project is private, but I may consider accepting contributions to enhance features. If you're interested in helping with this or any other tasks, please reach out to me directly. Thank you ^‿^ -->

## Author

- [Austin Chima](https://austincodes.netlify.app)

## License

This project is private and not licensed for public use.
