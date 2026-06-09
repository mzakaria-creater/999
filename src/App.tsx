import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from '@pages/Dashboard'
import Deposits from '@pages/Deposits'
import Payouts from '@pages/Payouts'
import Approvals from '@pages/Approvals'
import Layout from '@components/Layout'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deposits" element={<Deposits />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/approvals" element={<Approvals />} />
        </Route>
      </Routes>
    </Router>
  )
}
