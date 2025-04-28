import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import 'swiper/css';
import 'swiper/css/pagination';
import './App.css';
import portrait from './assets/portrait.jpg';
import { SlMenu } from "react-icons/sl";
import { FaGithub, FaHeadphones, FaLaptopCode, FaRocket, FaTools } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa";
import mind_mapping_demo from './assets/mind_mapping_demo.png';
import resume from './assets/Austin Chima - Resume.pdf';
import logo from './assets/personal-brand.png';
import { Link} from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInView } from './hooks/useInView';  // Add this import at the top

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const [heroVisible, setHeroVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Validate email format
        const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
        if (!isValidEmail(formData.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        // Validate other fields
        if (!formData.name || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields.');
            return;
        }

        const response = await fetch('/.netlify/functions/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            toast.success('Thank you for your message! I will get back to you soon.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
        } else {
            const errorData = await response.json();
            toast.error(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('An error occurred. Please try again later.');
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
  },);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey) {
        let sectionId = '';
        switch (event.key) {

          case 'h'.toLowerCase():
              sectionId = 'home';
              break;
          case 'a'.toLowerCase():
              sectionId = 'about';
              break;
          case 'p'.toLowerCase():
              sectionId = 'projects';
              break;
          case 's'.toLowerCase():
              sectionId = 'skills';
              break;
          case 'c'.toLowerCase():
              sectionId = 'contact';
            break;
          default:
            return; // Exit if the key is not one of the specified ones
        }

        // Scroll to the specified section
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Check if the document is already in a loaded state
    if (document.readyState === 'complete') {
      setLoading(false);
      setHeroVisible(true);
    } else {
      // Set loading to false and show hero section when the page is ready
      window.addEventListener('load', () => {
        setLoading(false);
        setHeroVisible(true);
      });
    }
  }, []);

  // Create refs for each section
  const [aboutRef, aboutIsVisible] = useInView();
  const [skillsRef, skillsIsVisible] = useInView();
  const [projectsRef, projectsIsVisible] = useInView();
  const [contactRef, contactIsVisible] = useInView();

  return (
    <div className="app-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Navigation Bar */}
          <nav className="navbar">
            <div className="navbar-container">
              <div className="navbar-brand">
                <img src={logo} alt="Logo" style={{ width: '56px', marginRight: '10px' }} />
                <Link
                  to="home"
                  smooth={true}
                  duration={500}>AustinCodes
                </Link>
              </div>

              {/* Hamburger Menu */}
              {isSmallScreen && (
                <button className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
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
                {/* Social Icons */}
                <div className={`navbar-social ${isSmallScreen ? 'hamburger-menu-links' : ''}`}>
                  <a href="https://github.com/austinchima" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub Profile">
                    <FaGithub className="social-icon" />
                  </a>
                  <a href="https://linkedin.com/in/austin-chima-444883343" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn Profile">
                    <FaLinkedin className="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section id="home" className={`hero fade-in-section ${heroVisible ? 'is-visible' : ''}`}>
            <div className="hero-container">
              <div className="hero-text">
                <img 
                  src={portrait} 
                  alt="Portrait" 
                  className={`fade-in-element ${heroVisible ? 'is-visible delay-100' : ''}`}
                />
                <div className="hero-text-content">
                  <h1 className={`fade-in-element ${heroVisible ? 'is-visible delay-200' : ''}`}>
                    Hi, I'm <span className="highlight">Austin Chima</span>
                  </h1>
                  <p className={`hero-subtitle fade-in-element ${heroVisible ? 'is-visible delay-300' : ''}`}>
                    Full Stack Software Engineer
                  </p>
                  <p className={`hero-description fade-in-element ${heroVisible ? 'is-visible delay-400' : ''}`}>
                    Transforming ideas into elegant, functional digital experiences with a passion for clean code and intuitive design.
                  </p>
                  <div className={`hero-buttons fade-in-element ${heroVisible ? 'is-visible delay-500' : ''}`}>
                    <Link to="contact" smooth={true} duration={500} className="btn">
                      Get in Touch
                    </Link>
                    {/* <a href={resume} className="btn-resume" download="Austin_Chima_Resume.pdf">
                      Download Resume
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section 
            id="about" 
            ref={aboutRef}
            className={`fade-in-section ${aboutIsVisible ? 'is-visible' : ''}`}
          >
            <div className="section-container">
              <h2>About Me</h2>
              <div className="about-content">
                <div className="about-text">
                  <p>
                    I am a dedicated software engineer with a passion for creating elegant, efficient solutions. My expertise lies in full-stack development, where I combine clean design with robust functionality to deliver exceptional user experiences.
                  </p>
                  <p>
                    With a strong foundation in both frontend and backend technologies, I specialize in building scalable applications that solve real-world problems. I am committed to writing maintainable code and following best practices to ensure the long-term success of every project.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section 
            id="skills" 
            ref={skillsRef}
            className={`fade-in-section ${skillsIsVisible ? 'is-visible' : ''}`}
          >
            <div className="section-container">
              <h2>Skills & Expertise</h2>
              <div className="skills-grid">
                {[
                  { name: 'Frontend Development', icons: [FaReact], items: ['HTML, CSS', 'JavaScript','React'] },

                  { name: 'Backend Development', icons: [FaServer], items: ['Node.js'] },
                  
                  { name: 'Database', icons: [ SiMongodb], items: ['MongoDB'] },

                  { name: 'Mobile Development', icons: [FaMobileAlt], items: ['Kotlin', 'Jetpack Compose'] },

                  { name: 'Version Control', icons: [FaCodeBranch], items: ['Git', 'GitHub'] },

                  { name: 'Desktop Development', icons: [FaDesktop], items: ['.NET', 'C#'] },

                  { name: 'Development Tools', icons: [FaTools], items: ['Visual Studio', 'VS Code', 'Cursor', 'Copilot'] },

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
          <section 
            id="projects" 
            ref={projectsRef}
            className={`fade-in-section ${projectsIsVisible ? 'is-visible' : ''}`}
          >
            <div className="section-container">
              <h2>Featured Projects</h2>
              <div className="projects-grid">
                {[
                  // {
                  //   title: 'School Management System',
                  //   description: 'Online course management platform for students to manage deadlines and projects',
                  //   image: school_management_system,
                  //   tech: ['React', 'Node.js', 'MongoDB'],
                  //   comingSoon: true
                  // },
                  {
                    title: 'Cyber Guard Collective: Multi-Agent Threat Detection Platform',
                    description: 'Develop a cooperative swarm of lightweight AI agents for continuous, real-time network threat detection (anomalies, intrusions, malware). Agents monitor diverse data sources, share insights, and adapt using multi-agent reinforcement learning. The MVP will scan logs, flag patterns, and autonomously respond to threats.',
                    // image: mind_mapping_demo,
                    tech: ['Python', 'React', 'MongoDB'],
                    comingSoon: true
                  },
                  // {
                  //   title: 'AI Content Platform',
                  //   description: 'Content generation platform powered by machine learning algorithms.',
                  //   image: 'https://public.readdy.ai/ai/img_res/aa085a4498f6b8e88cac15659f9f3a9b.jpg',
                  //   tech: ['Python', 'TensorFlow', 'React'],
                  //   comingSoon: false
                  // }
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
                      {project.comingSoon && (
                        <span className="coming-soon-badge">Coming Soon</span>
                      )}
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

          {/* Contact Section */}
          <section 
            id="contact" 
            ref={contactRef}
            className={`fade-in-section ${contactIsVisible ? 'is-visible' : ''}`}
          >
            <div className="section-container">
              <h2>Get in Touch</h2>
              <div className={`contact-form-container ${contactIsVisible ? 'is-visible' : ''}`}>
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input
                      type="text"
                      id="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      id="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                    <label htmlFor="email">Your Email</label>
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      id="subject"
                      placeholder=" "
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                    <label htmlFor="subject">Subject</label>
                  </div>
                  <div className="input-group">
                    <textarea
                      id="message"
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                    <label htmlFor="message">Your Message</label>
                  </div>
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

          {/* Toast Container */}
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      )}
    </div>
  );
}

export default App;
