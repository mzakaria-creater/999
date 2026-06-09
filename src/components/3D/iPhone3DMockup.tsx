import { useState } from 'react'

export default function iPhone3DMockup() {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientY - rect.top) / rect.height - 0.5
    const y = (e.clientX - rect.left) / rect.width - 0.5

    setRotateX(x * 20)
    setRotateY(y * 20)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '600px',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          width: '280px',
          height: '560px',
          backgroundColor: '#000',
          borderRadius: '40px',
          padding: '12px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 120px rgba(0, 217, 255, 0.3)',
          border: '8px solid #1C1C1E',
          position: 'relative',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(0deg) scale(1.02)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150px',
            height: '24px',
            backgroundColor: '#000',
            borderRadius: '0 0 30px 30px',
            zIndex: 10,
          }}
        />

        {/* Screen Content */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0A0E27',
            borderRadius: '32px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 20px 20px',
            fontSize: '11px',
            color: '#fff',
            background: 'linear-gradient(135deg, #0A0E27 0%, #111729 100%)',
            boxShadow: 'inset 0 0 20px rgba(0, 217, 255, 0.1)',
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '15px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#00D9FF', marginBottom: '5px' }}>
              OnTarget PSP
            </div>
            <div style={{ fontSize: '9px', color: '#94A3B8' }}>Payment Platform</div>
          </div>

          {/* KPI Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                background: 'rgba(0, 217, 255, 0.1)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '12px',
                padding: '8px',
              }}
            >
              <div style={{ fontSize: '8px', color: '#94A3B8' }}>Volume</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#00D9FF' }}>$2.48M</div>
            </div>
            <div
              style={{
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '12px',
                padding: '8px',
              }}
            >
              <div style={{ fontSize: '8px', color: '#94A3B8' }}>Txns</div>
              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#FFD700' }}>8,450</div>
            </div>
          </div>

          {/* Chart Mock */}
          <div
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '8px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              gap: '3px',
            }}
          >
            {[45, 65, 40, 80, 55, 70].map((height, i) => (
              <div
                key={i}
                style={{
                  height: `${height}%`,
                  width: '12%',
                  background: 'linear-gradient(180deg, #00D9FF 0%, #00B8D4 100%)',
                  borderRadius: '3px',
                  opacity: 0.8,
                }}
              />
            ))}
          </div>

          {/* Button */}
          <button
            style={{
              width: '100%',
              padding: '8px',
              background: 'linear-gradient(135deg, #00D9FF 0%, #FFD700 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontSize: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Make Payment
          </button>
        </div>

        {/* Glass Reflection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '150px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            borderRadius: '32px 32px 50% 50%',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
