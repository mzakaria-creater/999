interface Transaction {
  id: string
  type: 'deposit' | 'payout'
  amount: number
  status: 'completed' | 'processing' | 'pending'
  time: string
}

const transactions: Transaction[] = [
  {
    id: 'TXN-2024-0845',
    type: 'deposit',
    amount: 50000,
    status: 'completed',
    time: '14:32',
  },
  {
    id: 'TXN-2024-0844',
    type: 'payout',
    amount: 12500,
    status: 'processing',
    time: '12:15',
  },
  {
    id: 'TXN-2024-0843',
    type: 'deposit',
    amount: 75000,
    status: 'pending',
    time: '10:48',
  },
]

const statusBadge = (status: string) => {
  const classes = {
    completed: 'badge-success',
    processing: 'badge-success',
    pending: 'badge-pending',
  }
  return classes[status as keyof typeof classes] || 'badge-success'
}

export default function TransactionTable() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.08]">
            <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
              Reference
            </th>
            <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
              Type
            </th>
            <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
              Amount
            </th>
            <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs uppercase font-bold text-text-secondary tracking-wide">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              className="table-row transition-colors duration-200"
            >
              <td className="px-6 py-4 font-mono text-sm text-text-primary">{tx.id}</td>
              <td className="px-6 py-4 text-sm text-text-primary capitalize">{tx.type}</td>
              <td className="px-6 py-4 text-sm text-text-primary">
                {tx.amount.toLocaleString()} {tx.type === 'deposit' ? 'EGP' : '$'}
              </td>
              <td className="px-6 py-4">
                <span className={`badge ${statusBadge(tx.status)}`}>
                  {tx.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-text-secondary">{tx.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
