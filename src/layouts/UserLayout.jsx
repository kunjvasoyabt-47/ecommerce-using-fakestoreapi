import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const UserLayout = () => {
  return (
    <>
      <Navbar /> {/* Standard White Navbar */}
      <main className="user-content">
        <Outlet /> {/* This renders Home, Products, Login, etc. */}
      </main>
    </>
  );
};
export default UserLayout;