'use client';

import { useEffect, useRef, useCallback } from 'react';

// Nord color palette for particles
const nordColors = [
  '#88C9D8', // Cyan
  '#FFCA3F', // Yellow
  '#938CFF', // Purple
  '#D8DEE9', // White
  '#81A1C1', // Light blue
  '#B48EAD', // Pink
  '#A3BE8C', // Green
];

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.5; // Medium speed
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1.5; // 1.5-3.5px
    this.color = nordColors[Math.floor(Math.random() * nordColors.length)];
    this.glowIntensity = Math.random() * 0.5 + 0.5;
    this.pulsePhase = Math.random() * Math.PI * 2;
    
    // Store original position for spring return
    this.originalX = this.x;
    this.originalY = this.y;
  }

  update(canvasWidth, canvasHeight, mouseX, mouseY) {
    // Natural drift
    this.x += this.vx;
    this.y += this.vy;
    
    // Boundary wrapping
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
    
    // Mouse interaction - attract/repel physics
    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        // Attract when close
        const force = (150 - distance) / 150 * 0.02;
        this.vx += dx * force * 0.1;
        this.vy += dy * force * 0.1;
      } else if (distance < 300) {
        // Repel when medium distance
        const force = (300 - distance) / 150 * 0.01;
        this.vx -= dx * force * 0.05;
        this.vy -= dy * force * 0.05;
      }
    }
    
    // Spring return to original velocity (damping)
    this.vx *= 0.99;
    this.vy *= 0.99;
    
    // Update pulse phase
    this.pulsePhase += 0.02;
  }

  draw(ctx) {
    const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
    const currentRadius = this.radius * pulse;
    
    // Draw glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, currentRadius * 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color + '33'; // 20% opacity
    ctx.fill();
    
    // Draw particle
    ctx.beginPath();
    ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default function ParticleConstellation({
  particleCount = 200,
  connectionDistance = 100,
  mouseRadius = 150,
  className = '',
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const initParticles = useCallback((width, height) => {
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(width, height));
    }
  }, [particleCount]);

  const drawConnections = useCallback((ctx, particles) => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(136, 201, 216, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }, [connectionDistance]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = dimensionsRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    particlesRef.current.forEach(particle => {
      particle.update(width, height, mouseRef.current.x, mouseRef.current.y);
      particle.draw(ctx);
    });
    
    // Draw connections
    drawConnections(ctx, particlesRef.current);
    
    animationRef.current = requestAnimationFrame(animate);
  }, [drawConnections]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width;
      canvas.height = height;
      dimensionsRef.current = { width, height };
      
      // Reinitialize particles on resize
      initParticles(width, height);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    // Initial setup
    handleResize();
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Start animation
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        zIndex: 0,
        background: 'transparent',
      }}
    />
  );
}
