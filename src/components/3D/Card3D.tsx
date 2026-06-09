import { useState } from 'react'

interface Card3DProps {
  title: string
  value: string
  icon?: string
  color?: string
}

export default function Card3D({ title, value, icon, color = '#00D9FF' }: Card3DProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientY - rect.top) / rect.height - 0.5
    const y = (e.clientX - rect.left) / rect.width - 0.5

    setRotateX(x * 15)
    setRotateY(y * 15)
    setScale(1.05)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        height: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, rgba(0,217,255,0.1) 0%, ${color}20 100%)`,
          border: `2px solid ${color}40`,
          borderRadius: '20px',
          padding: '24px',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
          boxShadow: `0 20px 40px ${color}30, inset 0 1px 0 rgba(255,255,255,0.1)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${50 + rotateY * 5}% ${50 + rotateX * 5}%, ${color}20 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {icon && <span style={{ fontSize: '18px' }}>{icon}</span>}
              {title}
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color, textShadow: `0 0 20px ${color}80` }}>
            {value}
          </div>
        </div>

        {/* Light Effect */}
        <div
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(40px)',
            opacity: 0.6,
            transform: `translate(${rotateY * 20}px, ${rotateX * 20}px)`,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
