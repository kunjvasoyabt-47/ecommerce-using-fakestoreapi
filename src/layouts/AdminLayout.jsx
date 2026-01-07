import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar/AdminNavbar';
import AdminRoute from '../components/ProtectedRoute/AdminRoute';

const AdminLayout = () => {
  return (
    <AdminRoute>
      <AdminNavbar /> 
      <main className="admin-content">
        <Outlet /> {/* This renders AdminProducts, AdminUsers */}
      </main>
    </AdminRoute>
  );
};
export default AdminLayout;