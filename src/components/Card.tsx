interface CardProps {
  label: string
  value: string | number
  badge?: {
    text: string
    type: 'success' | 'pending' | 'error'
  }
  featured?: boolean
}

export default function Card({ label, value, badge, featured }: CardProps) {
  const badgeClasses = {
    success: 'badge-success',
    pending: 'badge-pending',
    error: 'badge-error',
  }

  return (
    <div className={`card ${featured ? 'animate-subtleGlow' : ''}`}>
      <p className="text-xs uppercase tracking-wider text-text-secondary font-bold mb-3">
        {label}
      </p>
      <p className="font-jakarta text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
        {value}
      </p>
      {badge && <span className={`badge ${badgeClasses[badge.type]}`}>{badge.text}</span>}
    </div>
  )
}
