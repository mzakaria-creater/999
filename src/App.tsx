import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Layout from '@components/Layout'
import ProtectedRoute from '@components/ProtectedRoute'

// Pages
import Dashboard from '@pages/Dashboard'
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

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/command-center" element={<ProtectedRoute requiredRoles={['admin', 'operator']}><MerchantCommandCenter /></ProtectedRoute>} />
            <Route path="/routing-engine" element={<ProtectedRoute requiredRoles={['admin', 'operator']}><RoutingEngine /></ProtectedRoute>} />
            <Route path="/audit-map" element={<ProtectedRoute requiredRoles={['admin', 'operator']}><AuditMap /></ProtectedRoute>} />
            <Route path="/mena-payments" element={<ProtectedRoute requiredRoles={['admin', 'operator']}><MENAPaymentMethods /></ProtectedRoute>} />
            <Route path="/deposits" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'merchant']}><Deposits /></ProtectedRoute>} />
            <Route path="/payouts" element={<ProtectedRoute requiredRoles={['admin', 'operator', 'merchant']}><Payouts /></ProtectedRoute>} />
            <Route path="/approvals" element={<ProtectedRoute requiredRoles={['admin', 'operator']}><Approvals /></ProtectedRoute>} />
            <Route path="/wallets" element={<ProtectedRoute requiredRoles={['admin', 'operator']}><Wallets /></ProtectedRoute>} />
            <Route path="/costs" element={<ProtectedRoute requiredRoles={['admin', 'operator']}><CostManagement /></ProtectedRoute>} />
            <Route path="/merchants" element={<ProtectedRoute requiredRoles={['admin', 'operator']}><Merchants /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute requiredRoles={['admin']}><Users /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute requiredRoles={['admin']}><Settings /></ProtectedRoute>} />
            <Route path="/checkout" element={<PaymentCheckout />} />
          </Route>
        </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}
