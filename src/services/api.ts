// API Service - Real Backend Integration
// Update API_BASE_URL to your actual backend

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  // Transactions
  getTransactions: (filters?: any) =>
    request('/transactions', { method: 'GET' }),

  getTransaction: (id: string) =>
    request(`/transactions/${id}`, { method: 'GET' }),

  createTransaction: (data: any) =>
    request('/transactions', { method: 'POST', body: JSON.stringify(data) }),

  // Wallets
  getWallets: () =>
    request('/wallets', { method: 'GET' }),

  getWallet: (id: string) =>
    request(`/wallets/${id}`, { method: 'GET' }),

  updateWallet: (id: string, data: any) =>
    request(`/wallets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Deposits
  getDeposits: () =>
    request('/deposits', { method: 'GET' }),

  createDeposit: (data: any) =>
    request('/deposits', { method: 'POST', body: JSON.stringify(data) }),

  approveDeposit: (id: string) =>
    request(`/deposits/${id}/approve`, { method: 'POST' }),

  // Payouts
  getPayouts: () =>
    request('/payouts', { method: 'GET' }),

  createPayout: (data: any) =>
    request('/payouts', { method: 'POST', body: JSON.stringify(data) }),

  approvePayout: (id: string) =>
    request(`/payouts/${id}/approve`, { method: 'POST' }),

  // Merchants
  getMerchants: () =>
    request('/merchants', { method: 'GET' }),

  getMerchant: (id: string) =>
    request(`/merchants/${id}`, { method: 'GET' }),

  // Users
  getUsers: () =>
    request('/users', { method: 'GET' }),

  createUser: (data: any) =>
    request('/users', { method: 'POST', body: JSON.stringify(data) }),

  // Dashboard Stats
  getDashboardStats: () =>
    request('/stats/dashboard', { method: 'GET' }),

  getTransactionStats: () =>
    request('/stats/transactions', { method: 'GET' }),

  getWalletStats: () =>
    request('/stats/wallets', { method: 'GET' }),

  // SMS
  getSMSMessages: () =>
    request('/sms', { method: 'GET' }),

  getSMSMessage: (id: string) =>
    request(`/sms/${id}`, { method: 'GET' }),

  // Compliance
  getComplianceReport: () =>
    request('/compliance/report', { method: 'GET' }),

  // Auth
  login: (email: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Authorization': '' },
    }),

  logout: () => {
    localStorage.removeItem('token')
    return Promise.resolve()
  },

  getCurrentUser: () =>
    request('/auth/me', { method: 'GET' }),
}

export default api
