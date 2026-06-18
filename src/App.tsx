import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Layout from '@components/Layout'
import ProtectedRoute from '@components/ProtectedRoute'

// Pages
import Dashboard from '@pages/Dashboard'
import ProductionDashboard from '@pages/ProductionDashboard'
import GlossyShowcase from '@pages/GlossyShowcase'
import MerchantCommandCenter from '@pages/MerchantCommandCenter'
import RoutingEngine from '@pages/RoutingEngine'
import AuditMap from '@pages/AuditMap'
import MENAPaymentMethods from '@pages/MENAPaymentMethods'
import Deposits from '@pages/Deposits'
import Payouts from '@pages/Payouts'
import Approvals from '@pages/Approvals'
import Wallets from '@pages/Wallets'
import CostManagement from '@pages/CostManagement'
import Merchants from '@pages/Merchants'
import Users from '@pages/Users'
import Settings from '@pages/Settings'
import PaymentCheckout from '@pages/PaymentCheckout'
import AccountSettings from '@pages/AccountSettings'
import WalletPool from '@pages/WalletPool'
import Vault from '@pages/Vault'
import N8nIntegration from '@pages/N8nIntegration'
import BinanceAPI from '@pages/BinanceAPI'
import SMSReader from '@pages/SMSReader'
import DepositsTransaction from '@pages/DepositsTransaction'
import PayoutsTransaction from '@pages/PayoutsTransaction'
import TelegramSettings from '@pages/TelegramSettings'
import MerchantPortal from '@pages/MerchantPortal'
import AdminPortal from '@pages/AdminPortal'
import OperatorPortal from '@pages/OperatorPortal'
import FinancialPortal from '@pages/FinancialPortal'
import OwnerPortal from '@pages/OwnerPortal'
import MenaGateway from '@pages/MenaGateway'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/production" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><ProductionDashboard /></ProtectedRoute>} />
            <Route path="/glossy-showcase" element={<GlossyShowcase />} />
            <Route path="/command-center" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><MerchantCommandCenter /></ProtectedRoute>} />
            <Route path="/routing-engine" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><RoutingEngine /></ProtectedRoute>} />
            <Route path="/audit-map" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><AuditMap /></ProtectedRoute>} />
            <Route path="/mena-payments" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><MENAPaymentMethods /></ProtectedRoute>} />
            <Route path="/mena-gateway" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><MenaGateway /></ProtectedRoute>} />
            <Route path="/deposits" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'merchant', 'financial', 'owner']}><Deposits /></ProtectedRoute>} />
            <Route path="/payouts" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'merchant', 'financial', 'owner']}><Payouts /></ProtectedRoute>} />
            <Route path="/approvals" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><Approvals /></ProtectedRoute>} />
            <Route path="/wallets" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'financial', 'owner']}><Wallets /></ProtectedRoute>} />
            <Route path="/costs" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'financial', 'owner']}><CostManagement /></ProtectedRoute>} />
            <Route path="/merchants" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><Merchants /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute requiredRoles={['admin', 'owner']}><Users /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute requiredRoles={['admin', 'owner']}><Settings /></ProtectedRoute>} />
            <Route path="/checkout" element={<PaymentCheckout />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/wallet-pool" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'financial', 'owner']}><WalletPool /></ProtectedRoute>} />
            <Route path="/vault" element={<ProtectedRoute requiredRoles={['admin', 'owner']}><Vault /></ProtectedRoute>} />
            <Route path="/n8n" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><N8nIntegration /></ProtectedRoute>} />
            <Route path="/binance" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><BinanceAPI /></ProtectedRoute>} />
            <Route path="/sms-reader" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'owner']}><SMSReader /></ProtectedRoute>} />
            <Route path="/deposits-transaction" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'financial', 'owner']}><DepositsTransaction /></ProtectedRoute>} />
            <Route path="/payouts-transaction" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'financial', 'owner']}><PayoutsTransaction /></ProtectedRoute>} />
            <Route path="/telegram" element={<TelegramSettings />} />
            <Route path="/admin-portal" element={<ProtectedRoute requiredRoles={['admin', 'owner']}><AdminPortal /></ProtectedRoute>} />
            <Route path="/merchant-portal" element={<ProtectedRoute requiredRoles={['merchant', 'admin', 'owner', 'financial', 'operator']}><MerchantPortal /></ProtectedRoute>} />
            <Route path="/operator-portal" element={<ProtectedRoute requiredRoles={['operator', 'admin', 'owner']}><OperatorPortal /></ProtectedRoute>} />
            <Route path="/financial-portal" element={<ProtectedRoute requiredRoles={['financial', 'admin', 'owner']}><FinancialPortal /></ProtectedRoute>} />
            <Route path="/owner-portal" element={<ProtectedRoute requiredRoles={['owner', 'admin']}><OwnerPortal /></ProtectedRoute>} />
          </Route>
        </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}
