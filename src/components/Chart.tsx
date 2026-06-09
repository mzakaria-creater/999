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
    <div className="glass rounded-2xl p-8">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
          <YAxis stroke="rgba(255,255,255,0.5)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(10, 14, 39, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
            }}
            cursor={{ fill: 'rgba(0, 217, 255, 0.1)' }}
          />
          <Bar
            dataKey="value"
            fill="url(#colorGradient)"
            radius={[8, 8, 0, 0]}
            animationDuration={1000}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D9FF" />
              <stop offset="100%" stopColor="#00B8D4" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
