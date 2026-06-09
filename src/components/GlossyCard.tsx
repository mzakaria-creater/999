import { useState } from 'react'
import { Zap, TrendingUp, Activity } from 'lucide-react'

interface GlossyCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'orange' | 'purple'
  description?: string
  animated?: boolean
  gloss?: boolean
}

export default function GlossyCard({
  title,
  value,
  icon,
  color = 'blue',
  description,
  animated = true,
  gloss = true,
}: GlossyCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    blue: 'from-accent-blue to-[#0062CC]',
    green: 'from-accent-green to-[#229153]',
    orange: 'from-accent-orange to-[#FF8C00]',
    purple: 'from-purple-400 to-purple-600',
  }

  const containerClass = gloss ? 'glossy-card' : 'apple-surface rounded-2xl p-6'

  return (
    <div
      className={`${containerClass} ${animated ? 'stagger-item' : ''} ${isHovered && gloss ? 'glow-effect' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs md:text-sm font-semibold text-text-secondary uppercase tracking-wider mb-1">
              {title}
            </p>
          </div>
          {icon && (
            <div
              className={`text-2xl md:text-3xl transition-transform ${
                isHovered && gloss ? 'scale-110 rotate-12' : 'scale-100'
              }`}
            >
              {icon}
            </div>
          )}
        </div>

        {/* Value */}
        <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent mb-3`}>
          {value}
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs md:text-sm text-text-secondary">{description}</p>
        )}

        {/* Gradient Background */}
        {gloss && (
          <div
            className={`absolute inset-0 rounded-2xl opacity-0 ${isHovered ? 'opacity-20' : ''} transition-opacity`}
            style={{
              background: `linear-gradient(135deg, transparent, rgba(0,122,255,0.1))`,
            }}
          />
        )}
      </div>
    </div>
  )
}
