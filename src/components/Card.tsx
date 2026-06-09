interface CardProps {
  label: string
  value: string | number
  badge?: {
    text: string
    type: 'success' | 'pending' | 'error'
  }
  featured?: boolean
  onClick?: () => void
}

export default function Card({ label, value, badge, featured, onClick }: CardProps) {
  const badgeClasses = {
    success: 'badge-success',
    pending: 'badge-pending',
    error: 'badge-error',
  }

  return (
    <div
      className={`apple-card ${featured ? 'animate-apple-pulse' : ''} ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
      onClick={onClick}
    >
      <p className="text-xs uppercase tracking-widest text-text-secondary font-semibold font-apple mb-3">
        {label}
      </p>
      <p className="font-apple text-3xl font-bold text-white tracking-tight mb-3" style={{ letterSpacing: '-0.03em' }}>
        {value}
      </p>
      {badge && <span className={`badge ${badgeClasses[badge.type]}`}>{badge.text}</span>}
    </div>
  )
}
