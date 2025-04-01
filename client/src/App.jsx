import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';
import portrait from './assets/portrait.jpg';
import { SlMenu } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa";
import school_management_system from './assets/school_task_management_application_dashboard.png';
import resume from './assets/Austin Chima - Resume.pdf'; // Import your resume file
import logo from './assets/personal-brand.png';
import { Link} from 'react-scroll';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setModalMessage('Thank you for your message! I will get back to you soon.');
            setShowModal(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setModalMessage('Failed to send message. Please try again later.');
            setShowModal(true);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        setModalMessage('An error occurred. Please try again later.');
        setShowModal(true);
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
          setActiveSection(section);
        }
      }
    });
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', checkScreenSize); // Update on resize
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <img src={logo} alt="Logo" style={{ width: '10%', marginRight: '10px' }} />
            <Link
              to="home"
              smooth={true}
              duration={500}
            >
              Austin Chima
            </Link>
          </div>

          {/* Hamburger Menu */}
          {isSmallScreen && (
            <button className="hamburger-menu" onClick={toggleMenu}>
              <SlMenu />
            </button>
          )}

          <div className={`navbar-links ${isMenuOpen && isSmallScreen ? 'active' : ''} ${isSmallScreen ? 'mobile' : ''}`}>
            {sections.map(section => (
              <Link
                key={section}
                to={section}
                smooth={true}
                duration={500}
                className={`nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {section}
              </Link>
            ))}
          </div>
          <div className={`navbar-social ${isMenuOpen && isSmallScreen ? 'active' : ''} ${isSmallScreen ? 'mobile' : ''}`}>
            <a href="https://github.com/austinchima" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub Profile">
              <i className="fab fa-github">
                <span className="sr-only"><FaGithub /></span>
              </i>
            </a>
            <a href="https://linkedin.com/in/austin-chima7364552/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn Profile">
              <i className="fab fa-linkedin">
                <span className="sr-only"><FaLinkedin/></span>
              </i>
            </a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Twitter Profile">
              <i className="fab fa-twitter"></i>
            </a> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <img src={portrait} alt="Portrait" />
            <h1>
              Hi, I'm <span className="highlight">Austin Chima</span>
            </h1>
          
            <p className="hero-subtitle">
              Software Engineering Student & Aspiring Full Stack Developer
            </p>
            <p className="hero-description">
              Transforming ideas into elegant, functional digital experiences with a passion for clean code and intuitive design.
            </p>
            <Link to="contact" smooth={true} duration={500} className="btn">
              Get in Touch
            </Link>
            <a href={resume} className="btn-resume" download="Austin_Chima_Resume.pdf">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="section-container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                As a passionate Software Engineering student, I'm dedicated to learning and applying modern development practices to create responsive, user-friendly applications. My journey in tech began with my love for problem-solving and has evolved into a deep passion for software development.
              </p>
              <p>
                Through academic projects and personal initiatives, I've gained hands-on experience with various technologies and frameworks. I'm constantly exploring new technologies and best practices to expand my skill set and prepare for a career in software development.
              </p>
            </div>
            <div className="about-achievements">
              <div className="achievement">
                <h3>Academic Achievements</h3>
                <ul>
                  <li>
                    <i className="fas fa-check-circle">
                      <span className="sr-only"><FaCheckCircle /></span>
                      </i> Dean's List for Academic Excellence 2024-2025
                  </li>
                  <li>
                    <i className="fas fa-check-circle">
                    <span className="sr-only"><FaCheckCircle /></span>
                      </i> Lead Developer in University Hackathon Team
                  </li>
                  <li>
                    <i className="fas fa-check-circle">
                    <span className="sr-only"><FaCheckCircle /></span>
                    </i> Active member of Computer Science Student Society
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="section-container">
          <h2>Skills & Expertise</h2>
          <div className="skills-grid">
            {[
              { name: 'Frontend Development', icons: [FaReact, FaHtml5, FaCss3, FaJs], items: ['React'] },
              { name: 'Backend Development', icons: [FaServer], items: ['Node.js', 'Express.js'] },
              // { name: 'UI/UX Design', icon: 'fa-palette', items: ['Figma', 'Adobe XD', 'Sketch'] },
              // { name: 'Cloud Services', icon: 'fa-cloud', items: ['AWS', 'Azure', 'GCP'] },
              { name: 'Database', icons: [FaDatabase, SiMongodb], items: ['MongoDB', 'MySQL', 'Oracle'] },
              // { name: 'DevOps', icon: 'fa-tools', items: ['Docker', 'Kubernetes', 'CI/CD'] },
              { name: 'Mobile Development', icons: [FaMobileAlt], items: ['Kotlin', 'Jetpack Compose'] },
              // { name: 'Testing', icon: 'fa-vial', items: ['Jest', 'Cypress', 'Selenium'] }
              { name: 'Version Control', icons: [FaCodeBranch], items: ['Git', 'GitHub'] },
              { name: 'Desktop Development', icons: [FaDesktop], items: ['C#'] }

            ].map((skill, index) => (
              <div key={index} className="skill-card">
                {skill.icons && skill.icons.map((Icon, iconIndex) => (
                  <Icon key={iconIndex} />
                ))}
                <h3>{skill.name}</h3>
                <ul>
                  {skill.items.map((item, i) => (
                    <li key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="section-container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {[
              {
                title: 'School Management System',
                description: 'Online course management platform for students to manage deadlines and projects',
                image: school_management_system, // Access the imported image
                tech: ['React', 'Node.js', 'MongoDB']
              },
              {
                title: 'Task Management App',
                description: 'Collaborative project management tool with real-time updates and analytics.',
                image: 'https://public.readdy.ai/ai/img_res/3a858c374cbaaa7855f8e11ff7dc4534.jpg',
                tech: ['Vue.js', 'Express', 'PostgreSQL']
              },
              {
                title: 'AI Content Platform',
                description: 'Content generation platform powered by machine learning algorithms.',
                image: 'https://public.readdy.ai/ai/img_res/aa085a4498f6b8e88cac15659f9f3a9b.jpg',
                tech: ['Python', 'TensorFlow', 'React']
              }
            ].map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <button className="btn project-btn">
                    View Project <i className="fas fa-arrow-right">
                      <span className="sr-only"><FaArrowRight /></span>
                    </i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/*
      
      <section id="testimonials" className="testimonials">
        <div className="section-container">
          <h2>Client Testimonials</h2>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="testimonials-swiper"
          >
            {[
              {
                name: 'Dr. Robert Martinez',
                position: 'Computer Science Professor',
                company: 'University Department',
                text: 'James demonstrates exceptional problem-solving abilities and a keen interest in software development. His academic projects consistently show innovation and technical proficiency.',
                image: 'https://public.readdy.ai/ai/img_res/74a80b2b15a906d13230ba2ca729afcf.jpg'
              },
              {
                name: 'Jennifer Liu',
                position: 'Hackathon Mentor',
                company: 'Tech Innovation Lab',
                text: 'During our university hackathon, James showed remarkable leadership and technical skills. His ability to learn and implement new technologies quickly is impressive.',
                image: 'https://public.readdy.ai/ai/img_res/d5477b9cc444e1b0199cabab4a602daf.jpg'
              },
              {
                name: 'David Cooper',
                position: 'Project Supervisor',
                company: 'Student Innovation Hub',
                text: 'James brings fresh perspectives to project challenges. His dedication to learning and ability to collaborate effectively make him a valuable team member.',
                image: 'https://public.readdy.ai/ai/img_res/f3284cae1cb2bebf16dda3900010de53.jpg'
              }
            ].map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    <img src={testimonial.image} alt={testimonial.name} />
                    <div className="testimonial-info">
                      <h3>{testimonial.name}</h3>
                      <p>{testimonial.position}</p>
                      <p className="company">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      */}

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="section-container">
          <h2>Get in Touch</h2>
          <div className="contact-form-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section-container footer-container">
          <div className="footer-text">
            <p>&copy; 2025 Austin Chima. All rights reserved.</p>
          </div>
          <div className="footer-social">
            <a href="https://github.com/austinchima" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub Profile">
              <i className="fab fa-github">
                <span className="sr-only"><FaGithub /></span>
              </i>
            </a>
            <a href="https://www.linkedin.com/in/austin-chima7364552/" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn Profile">
              <i className="fab fa-linkedin"><FaLinkedin /></i>
            </a>
            {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Twitter Profile">
              <i className="fab fa-twitter"></i>
            </a> */}
          </div>
        </div>
      </footer>

      {/* Modal Component */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Thank You!</h3>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
