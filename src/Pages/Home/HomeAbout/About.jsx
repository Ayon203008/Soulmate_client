import React, { useState, useEffect } from 'react';
import marriageLottie from '../../../assets/marriage.json';
import Lottie from 'lottie-react';

const About = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust flex direction and padding based on screen width
  const isMobile = windowWidth < 768;

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fdf6f0 0%, #e8dfe5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Poppins', sans-serif",
        color: '#333',
        padding: isMobile ? '50px 20px' : '0',
      
      }}
    >
      {/* Background Lottie softly in the back */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 0.1,
        }}
      >
        <Lottie animationData={marriageLottie} loop={true} />
      </div>

      {/* Main content card with glass effect */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          backdropFilter: 'blur(15px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '25px',
          padding: isMobile ? '30px 20px' : '60px',
          maxWidth: '1000px',
          width: '90%',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: '50px',
        }}
      >
        {/* Lottie Animation */}
        <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
          <Lottie
            animationData={marriageLottie}
            loop={true}
            style={{ width: '100%', maxWidth: isMobile ? 300 : 400, height: 'auto' }}
          />
        </div>

        {/* Text Content */}
        <div style={{ flex: '1 1 400px', textAlign: isMobile ? 'center' : 'left' }}>
          <h2
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              marginBottom: '20px',
              fontWeight: '700',
              color: '#ff9f80',
            }}
          >
            Your Journey of Love Starts Here
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '15px',
            }}
          >
            Discover a premium matrimony experience designed for the modern, elegant soul. We bring
            technology and tradition together to make your search for love effortless, beautiful, and
            secure.
          </p>
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#555',
              marginBottom: '25px',
            }}
          >
            Join thousands of happy couples who found their perfect match on our platform. Your story
            deserves the very best — and that begins right here.
          </p>
          <button
            style={{
              padding: '15px 35px',
              background: 'linear-gradient(45deg, #ffd580, #ffb347)',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255,183,71,0.4)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 25px rgba(255,183,71,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 15px rgba(255,183,71,0.4)';
            }}
          >
            Explore More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
