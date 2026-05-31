import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'

import AdminLayout from './layouts/AdminLayout'
import LoginPage from './pages/auth/LoginPage'

import DashboardPage from './pages/admin/DashboardPage'
import OrdersPage from './pages/admin/OrdersPage'
import ProductsAdminPage from './pages/admin/ProductsAdminPage'
import DeliveryPage from './pages/admin/DeliveryPage'
import InventoryPage from './pages/admin/InventoryPage'
import CustomersPage from './pages/admin/CustomersPage'

function AdminGuard({ children }) {
  const user = useAuthStore((s) => s.user)
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />

        <Route
          path="/"
          element={<AdminGuard><AdminLayout /></AdminGuard>}
        >
          <Route index element={<DashboardPage />} />
          <Route path="pedidos" element={<OrdersPage />} />
          <Route path="productos" element={<ProductsAdminPage />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="inventario" element={<InventoryPage />} />
          <Route path="clientes" element={<CustomersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
