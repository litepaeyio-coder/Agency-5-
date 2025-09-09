import React from 'react';
import { FaPlay, FaStar, FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import useCollection from '../hooks/useCollection';

// Placeholder components for better readability
const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <div className="container mx-auto px-6">{children}</div>
  </section>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
    {children}
  </h2>
);

const Hero = () => (
    <div className="relative text-white min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg z-0"></div>
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
        <div className="container mx-auto px-6 text-center z-10">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
            >
                We Craft Digital Experiences That Inspire
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200"
            >
                CreativeHub is a full-service digital agency turning great ideas into beautiful, engaging products.
            </motion.p>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <a href="#portfolio" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                    View Our Work
                </a>
                <a href="#contact" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                    Get in Touch
                </a>
            </motion.div>
        </div>
    </div>
);

const About = () => (
  <Section id="about" className="bg-gray-50">
    <div className="flex flex-col lg:flex-row items-center gap-12">
      <div className="lg:w-1/2">
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Team collaborating" className="rounded-lg shadow-2xl" />
      </div>
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold mb-4">Over 3 Years of Creative Excellence</h2>
        <p className="text-gray-600 mb-6">
          We are a passionate team of designers, developers, and strategists dedicated to helping brands grow. Our data-driven approach ensures that we deliver solutions that not only look good but also perform exceptionally.
        </p>
        <div className="grid grid-cols-2 gap-6 text-center mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-3xl font-bold text-primary">50+</p>
            <p className="text-gray-500">Happy Clients</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-3xl font-bold text-primary">120+</p>
            <p className="text-gray-500">Projects Completed</p>
          </div>
        </div>
        <a href="#contact" className="text-primary font-semibold hover:underline">Learn more about our team →</a>
      </div>
    </div>
  </Section>
);

const Portfolio = () => {
  const { data: projects, loading, error } = useCollection('projects');

  return (
    <Section id="portfolio">
      <SectionTitle>Our Recent Work</SectionTitle>
      {loading && <div className="text-center">Loading projects...</div>}
      {error && <div className="text-center text-red-500">Failed to load projects.</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <motion.div 
            key={project.id}
            className="group relative overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={project.imageUrl || 'https://placehold.co/600x400/2563eb/ffffff?text=Project'} alt={project.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h3 className="text-white text-xl font-bold">{project.title}</h3>
              <p className="text-gray-300">{project.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

const Services = () => {
    const services = [
        { title: "Video Editing", description: "High-quality video production and post-production services to bring your story to life.", icon: <FaPlay /> },
        { title: "Social Media", description: "Strategic social media management to grow your audience and engagement.", icon: <FaStar /> },
        { title: "Brand Strategy", description: "Comprehensive brand strategies that define your identity and connect with your audience.", icon: <FaStar /> },
        { title: "Content Creation", description: "Engaging reels, stories, and posts that capture attention and drive results.", icon: <FaPlay /> }
    ];

    return (
        <Section id="services" className="bg-gray-50">
            <SectionTitle>What We Do</SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map(service => (
                    <div key={service.title} className="bg-white p-8 rounded-lg shadow-md text-center">
                        <div className="text-primary text-4xl mb-4 inline-block">{service.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const Testimonials = () => {
  const { data: testimonials, loading, error } = useCollection('testimonials');
  
  return (
    <Section id="testimonials">
      <SectionTitle>What Our Clients Say</SectionTitle>
      {loading && <div className="text-center">Loading testimonials...</div>}
      {error && <div className="text-center text-red-500">Failed to load testimonials.</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="bg-gray-50 p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              {[...Array(testimonial.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400" />)}
            </div>
            <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
            <p className="font-bold">{testimonial.name}</p>
            <p className="text-gray-500">{testimonial.company}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Contact = () => {
  // Add state and submission logic here
  return (
    <Section id="contact" className="bg-primary text-white">
      <SectionTitle>Let's Work Together</SectionTitle>
      <div className="max-w-xl mx-auto text-center">
        <p className="mb-8">Have a project in mind? We'd love to hear about it. Fill out the form below or reach out to us directly.</p>
        <form className="bg-white text-gray-800 p-8 rounded-lg shadow-lg text-left">
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">Name</label>
            <input type="text" id="name" className="w-full p-3 border rounded-lg" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">Email</label>
            <input type="email" id="email" className="w-full p-3 border rounded-lg" placeholder="Your Email" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-bold mb-2">Message</label>
            <textarea id="message" rows="5" className="w-full p-3 border rounded-lg" placeholder="Tell us about your project..."></textarea>
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300">Send Message</button>
        </form>
        <div className="mt-8 flex justify-center gap-8">
          <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-200">
            <FaWhatsapp size={24} /> WhatsApp
          </a>
          <a href="mailto:contact@creativehub.com" className="flex items-center gap-2 hover:text-gray-200">
            <FiMail size={24} /> Email Us
          </a>
        </div>
      </div>
    </Section>
  );
};

const Footer = () => (
    <footer className="bg-dark-200 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center">
            <p>&copy; {new Date().getFullYear()} CreativeHub. All Rights Reserved.</p>
        </div>
    </footer>
);

const AgencyPortfolio = () => {
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </motion.div>
  );
};

export default AgencyPortfolio;
                          
