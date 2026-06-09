import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 72 },
  { name: 'Wed', value: 58 },
  { name: 'Thu', value: 85 },
  { name: 'Fri', value: 90 },
  { name: 'Sat', value: 78 },
]

export default function Chart() {
  return (
    <div className="apple-surface rounded-2xl p-8">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1C1C1E',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
              fontSize: '13px',
            }}
            cursor={{ fill: 'rgba(0, 122, 255, 0.08)' }}
          />
          <Bar
            dataKey="value"
            fill="url(#appleBlueGradient)"
            radius={[6, 6, 0, 0]}
            animationDuration={1000}
          />
          <defs>
            <linearGradient id="appleBlueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#007AFF" />
              <stop offset="100%" stopColor="#0062CC" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
