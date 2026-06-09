import { useEffect, useState } from 'react'

export default function TransactionFlow3D() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        background: 'linear-gradient(135deg, rgba(0,217,255,0.05) 0%, rgba(255,215,0,0.05) 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(0,217,255,0.2)',
        overflow: 'hidden',
        position: 'relative',
        padding: '40px',
      }}
    >
      {/* 3D Grid Background */}
      <svg
        style={{ position: 'absolute', inset: 0, opacity: 0.1 }}
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00D9FF" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            background: `hsl(${particle.id * 18}, 100%, 50%)`,
            borderRadius: '50%',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float 4s ease-in-out ${particle.delay}s infinite`,
            boxShadow: `0 0 20px hsl(${particle.id * 18}, 100%, 50%)`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Flow Paths */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Flow Lines */}
        <defs>
          <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Flow Animation Paths */}
        <path
          d="M 50 50 Q 100 100 150 120"
          fill="none"
          stroke="url(#flowGradient1)"
          strokeWidth="3"
          strokeDasharray="100"
          style={{
            animation: 'flowDash 3s linear infinite',
          }}
        />
        <path
          d="M 50 50 Q 100 80 150 90"
          fill="none"
          stroke="url(#flowGradient1)"
          strokeWidth="3"
          strokeDasharray="100"
          style={{
            animation: 'flowDash 3.5s linear infinite 0.5s',
          }}
        />
        <path
          d="M 50 50 Q 100 60 150 50"
          fill="none"
          stroke="url(#flowGradient1)"
          strokeWidth="3"
          strokeDasharray="100"
          style={{
            animation: 'flowDash 3s linear infinite 1s',
          }}
        />
      </svg>

      {/* Center Point */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '24px',
          height: '24px',
          background: 'radial-gradient(circle, #00D9FF 0%, #00B8D4 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 40px #00D9FF, inset 0 0 10px rgba(255,255,255,0.3)',
          zIndex: 10,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />

      {/* Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 1; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.6; }
        }
        @keyframes flowDash {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: -100; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 40px #00D9FF, inset 0 0 10px rgba(255,255,255,0.3), 0 0 0 0 rgba(0,217,255,0.7); }
          50% { box-shadow: 0 0 40px #00D9FF, inset 0 0 10px rgba(255,255,255,0.3), 0 0 0 15px rgba(0,217,255,0); }
        }
      `}</style>
    </div>
  )
}
