import { Wallet, WalletHealth, AllocationStrategy } from '@/types/wallet'

export interface TransactionRequest {
  merchant_id: string
  amount: number
  currency: string
  transaction_type: 'deposit' | 'withdrawal' | 'payout' | 'deposit'
  payment_method: string
}

export interface RoutingResult {
  wallet_id: string
  provider: string
  allocated_amount: number
  confidence_score: number
  reason: string
}

export interface AllocationResult {
  wallet_id: string
  provider: string
  amount: number
  percentage: number
}

export interface RebalanceAction {
  wallet_id: string
  provider: string
  action: 'deposit' | 'withdraw'
  amount: number
  current_level: number
  target_level: number
}

export interface WalletHealthStatus {
  wallet_id: string
  provider: string
  balance: number
  daily_limit: number
  balance_health: number
  capacity_used: number
  status: 'healthy' | 'warning' | 'critical'
}

// Mock wallet data
const mockWallets: Wallet[] = [
  {
    id: 'wallet-1',
    provider: 'Vodafone Cash',
    balance: 500000,
    daily_limit: 1000000,
    weight: 0.35,
    priority: 1,
    health_score: 95,
    transaction_fee: 0.015,
    currency: 'EGP',
    icon: '📱',
    color: '#e60000',
  },
  {
    id: 'wallet-2',
    provider: 'InstaPay',
    balance: 250000,
    daily_limit: 800000,
    weight: 0.3,
    priority: 2,
    health_score: 88,
    transaction_fee: 0.01,
    currency: 'EGP',
    icon: '💳',
    color: '#0066cc',
  },
  {
    id: 'wallet-3',
    provider: 'Commercial Bank',
    balance: 750000,
    daily_limit: 2000000,
    weight: 0.25,
    priority: 3,
    health_score: 92,
    transaction_fee: 0.012,
    currency: 'EGP',
    icon: '🏦',
    color: '#1a5490',
  },
  {
    id: 'wallet-4',
    provider: 'Stripe',
    balance: 150000,
    daily_limit: 500000,
    weight: 0.1,
    priority: 4,
    health_score: 85,
    transaction_fee: 0.025,
    currency: 'EGP',
    icon: '💎',
    color: '#635bff',
  },
]

class WalletEngine {
  private wallets: Wallet[] = mockWallets
  private allocations: Map<string, AllocationResult[]> = new Map()

  /**
   * Score a wallet based on multiple factors
   */
  private scoreWallet(wallet: Wallet, transactionAmount: number): number {
    let score = 0

    // Balance health (40%)
    const balanceRatio = wallet.balance / wallet.daily_limit
    const balanceHealth = Math.min(balanceRatio * 100, 100)
    score += balanceHealth * 0.4

    // Available capacity (30%)
    const availableCapacity = wallet.daily_limit - wallet.balance
    const canHandle = availableCapacity >= transactionAmount ? 100 : (availableCapacity / transactionAmount) * 100
    score += Math.min(canHandle, 100) * 0.3

    // Priority weight (20%)
    score += (1 - (wallet.priority - 1) / 4) * 100 * 0.2

    // Health score (10%)
    score += wallet.health_score * 0.1

    return Math.round(score)
  }

  /**
   * Route transaction to the best available wallet
   */
  async routeTransaction(request: TransactionRequest): Promise<RoutingResult> {
    let bestWallet: Wallet | null = null
    let bestScore = -1
    let reason = ''

    for (const wallet of this.wallets) {
      // Check if wallet can handle the transaction
      const availableBalance = wallet.daily_limit - wallet.balance
      if (availableBalance < request.amount) {
        continue
      }

      const score = this.scoreWallet(wallet, request.amount)
      if (score > bestScore) {
        bestScore = score
        bestWallet = wallet
        reason = score > 85 ? 'Optimal wallet' : score > 70 ? 'Good wallet' : 'Acceptable wallet'
      }
    }

    if (!bestWallet) {
      throw new Error('No suitable wallet found for this transaction')
    }

    return {
      wallet_id: bestWallet.id,
      provider: bestWallet.provider,
      allocated_amount: request.amount,
      confidence_score: bestScore,
      reason,
    }
  }

  /**
   * Allocate transaction across multiple wallets using specified strategy
   */
  async allocateAcrossWallets(
    merchant_id: string,
    amount: number,
    currency: string,
    strategy: AllocationStrategy = 'weighted'
  ): Promise<AllocationResult[]> {
    const allocations: AllocationResult[] = []

    switch (strategy) {
      case 'weighted':
        allocations.push(...this.allocateWeighted(amount))
        break
      case 'round_robin':
        allocations.push(...this.allocateRoundRobin(amount))
        break
      case 'load_balanced':
        allocations.push(...this.allocateLoadBalanced(amount))
        break
      case 'priority':
        allocations.push(...this.allocatePriority(amount))
        break
      default:
        allocations.push(...this.allocateWeighted(amount))
    }

    // Store allocation for tracking
    this.allocations.set(merchant_id, allocations)

    return allocations
  }

  /**
   * Weighted allocation strategy
   */
  private allocateWeighted(amount: number): AllocationResult[] {
    const allocations: AllocationResult[] = []
    const totalWeight = this.wallets.reduce((sum, w) => sum + w.weight, 0)

    for (const wallet of this.wallets) {
      const percentage = wallet.weight / totalWeight
      const allocatedAmount = Math.round(amount * percentage)

      if (allocatedAmount > 0) {
        allocations.push({
          wallet_id: wallet.id,
          provider: wallet.provider,
          amount: allocatedAmount,
          percentage: Math.round(percentage * 100),
        })
      }
    }

    return allocations
  }

  /**
   * Round-robin allocation strategy
   */
  private allocateRoundRobin(amount: number): AllocationResult[] {
    const allocations: AllocationResult[] = []
    const perWallet = Math.round(amount / this.wallets.length)
    const percentage = Math.round((100 / this.wallets.length) * 10) / 10

    for (const wallet of this.wallets) {
      allocations.push({
        wallet_id: wallet.id,
        provider: wallet.provider,
        amount: perWallet,
        percentage,
      })
    }

    return allocations
  }

  /**
   * Load-balanced allocation strategy
   */
  private allocateLoadBalanced(amount: number): AllocationResult[] {
    const allocations: AllocationResult[] = []
    const walletsByCapacity = [...this.wallets].sort((a, b) => {
      const capacityA = a.daily_limit - a.balance
      const capacityB = b.daily_limit - b.balance
      return capacityB - capacityA
    })

    let remaining = amount
    for (const wallet of walletsByCapacity) {
      const availableCapacity = wallet.daily_limit - wallet.balance
      const allocatedAmount = Math.min(remaining, availableCapacity)

      if (allocatedAmount > 0) {
        const percentage = Math.round((allocatedAmount / amount) * 100)
        allocations.push({
          wallet_id: wallet.id,
          provider: wallet.provider,
          amount: allocatedAmount,
          percentage,
        })
        remaining -= allocatedAmount
      }

      if (remaining <= 0) break
    }

    return allocations
  }

  /**
   * Priority allocation strategy
   */
  private allocatePriority(amount: number): AllocationResult[] {
    const allocations: AllocationResult[] = []
    const walletsByPriority = [...this.wallets].sort((a, b) => a.priority - b.priority)

    let remaining = amount
    for (const wallet of walletsByPriority) {
      const availableCapacity = wallet.daily_limit - wallet.balance
      const allocatedAmount = Math.min(remaining, availableCapacity)

      if (allocatedAmount > 0) {
        const percentage = Math.round((allocatedAmount / amount) * 100)
        allocations.push({
          wallet_id: wallet.id,
          provider: wallet.provider,
          amount: allocatedAmount,
          percentage,
        })
        remaining -= allocatedAmount
      }

      if (remaining <= 0) break
    }

    return allocations
  }

  /**
   * Rebalance wallets to target levels
   */
  async rebalanceWallets(
    merchant_id: string,
    targetLevels: Record<string, number>
  ): Promise<RebalanceAction[]> {
    const actions: RebalanceAction[] = []

    for (const wallet of this.wallets) {
      const targetLevel = targetLevels[wallet.id]
      if (targetLevel === undefined) continue

      const difference = targetLevel - wallet.balance

      if (difference > 0) {
        actions.push({
          wallet_id: wallet.id,
          provider: wallet.provider,
          action: 'deposit',
          amount: difference,
          current_level: wallet.balance,
          target_level: targetLevel,
        })
      } else if (difference < 0) {
        actions.push({
          wallet_id: wallet.id,
          provider: wallet.provider,
          action: 'withdraw',
          amount: Math.abs(difference),
          current_level: wallet.balance,
          target_level: targetLevel,
        })
      }
    }

    return actions
  }

  /**
   * Get health status for a specific merchant's wallets
   */
  async getWalletHealth(merchant_id: string): Promise<WalletHealthStatus[]> {
    return this.wallets.map((wallet) => {
      const balanceRatio = wallet.balance / wallet.daily_limit
      const balanceHealth = Math.round(Math.min(balanceRatio * 100, 100))
      const capacityUsed = Math.round((wallet.balance / wallet.daily_limit) * 100)

      let status: 'healthy' | 'warning' | 'critical' = 'healthy'
      if (balanceHealth < 20 || capacityUsed > 90) {
        status = 'critical'
      } else if (balanceHealth < 40 || capacityUsed > 75) {
        status = 'warning'
      }

      return {
        wallet_id: wallet.id,
        provider: wallet.provider,
        balance: wallet.balance,
        daily_limit: wallet.daily_limit,
        balance_health: balanceHealth,
        capacity_used: capacityUsed,
        status,
      }
    })
  }

  /**
   * Get overall health status
   */
  async getOverallHealth(merchant_id: string): Promise<'healthy' | 'warning' | 'critical'> {
    const health = await this.getWalletHealth(merchant_id)
    const criticalCount = health.filter((h) => h.status === 'critical').length
    const warningCount = health.filter((h) => h.status === 'warning').length

    if (criticalCount > 0) return 'critical'
    if (warningCount > this.wallets.length / 2) return 'warning'
    return 'healthy'
  }

  /**
   * Get wallet details
   */
  getWallets(): Wallet[] {
    return this.wallets
  }

  /**
   * Get specific wallet
   */
  getWallet(walletId: string): Wallet | undefined {
    return this.wallets.find((w) => w.id === walletId)
  }

  /**
   * Update wallet balance (for simulation)
   */
  updateWalletBalance(walletId: string, newBalance: number): void {
    const wallet = this.wallets.find((w) => w.id === walletId)
    if (wallet) {
      wallet.balance = newBalance
    }
  }
}

export const walletEngine = new WalletEngine()
