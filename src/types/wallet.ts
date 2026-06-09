export type AllocationStrategy = 'weighted' | 'round_robin' | 'load_balanced' | 'priority'

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
