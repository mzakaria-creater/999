import { useState } from 'react'
import WalletManagementTable from '@components/WalletManagementTable'

export default function Wallets() {
  return (
    <div className="ml-64 pt-20 pb-8 px-8">
      <div className="space-y-8">
        <div className="animate-slide-down">
          <h1 className="font-apple text-4xl font-bold text-text-primary mb-2">
            Wallet Management
          </h1>
          <p className="text-text-secondary">Monitor and manage payment provider wallets</p>
        </div>

        <div className="animate-slide-down" style={{ animationDelay: '0.1s' }}>
          <WalletManagementTable />
        </div>
      </div>
    </div>
  )
}
