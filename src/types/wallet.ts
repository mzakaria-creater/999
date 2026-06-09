/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AllocationStrategy = 'weighted' | 'round_robin' | 'load_balanced' | 'priority'

// Real production wallet account structure
export interface WalletAccount {
  id: string
  provider: string
  phone_or_account: string
  owner_name: string
  label: string
  merchant_assignment: string
  daily_limit: number
  used_today: number
  priority: number
  active: boolean
  minimum_amount: number
  maximum_amount: number
  processor_name: string
  merchant: string
  retailer: string
  site: string
  currency: string
  cost_type: 'percentage' | 'fixed'
  cost_percentage: number
  fixed_fee: number
  min_cost: number
  max_cost: number
  monthly_limit: number
}

// Legacy wallet interface for backward compatibility
export interface Wallet {
  id: string
  provider: string
  balance: number
  daily_limit: number
  weight: number
  priority: number
  health_score: number
  transaction_fee: number
  currency: string
  icon: string
  color: string
}

export interface WalletHealth {
  wallet_id: string
  provider: string
  balance: number
  daily_limit: number
  health_percentage: number
  capacity_used: number
}

export interface RoutingMetrics {
  total_routed: number
  avg_confidence: number
  success_rate: number
  failover_count: number
}

export interface AllocationMetrics {
  strategy_used: AllocationStrategy
  total_allocated: number
  wallet_count: number
  distribution: Record<string, number>
}
