import './charts/ChartjsConfig';
import './css/style.scss';

import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/auth/RequireAuth';
import Analytics from './pages/Analytics';
import SitePages from './pages/cms/SitePages';
import ResetPassword from './pages/ResetPassword';
import Signin from './pages/Signin';
// import Signup from './pages/Signup';
// import SigninUser from './pages/SigninUser';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));

import { ToastContainer } from 'react-toastify';
import CompanyRoutes from './pages/company/CompanyRoutes';
import UserManagementRoutes from './pages/user-management/UserManagementRoutes';
import DashboardLoader from './pages/utility/DashboardLoader';
import PageNotFound from './pages/utility/PageNotFound';

import OrderRoutes from './pages/orders/OrderRoutes';
import EmployeeRoutes from './pages/employee/EmployeeRoutes';
import CompanySettingsRoutes from './pages/company-settings/CompanySettingsRoutes';

const ProductRoutes = React.lazy(() => import('./pages/products/ProductRoutes'));
const SubscriptionRoutes = React.lazy(() => import('./pages/subscription/SubscriptionRoutes'));

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html')!.style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html')!.style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<DashboardLoader />}>
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            </React.Suspense>
          }
        />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/sitepages" element={<SitePages />}></Route>
        <Route
          path="/dashboard-loader"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RequireAuth>
                <DashboardLoader />
              </RequireAuth>
            </React.Suspense>
          }></Route>
        {/* User Group  */}
        <Route
          path="/user/*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RequireAuth>
                <UserManagementRoutes />
              </RequireAuth>
            </React.Suspense>
          }></Route>

        {/* Company Group  */}
        <Route
          path="/company/*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RequireAuth>
                <CompanyRoutes />
              </RequireAuth>
            </React.Suspense>
          }></Route>

        {/* Company Settings Group  */}
        <Route
          path="/company-settings/*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RequireAuth>
                <CompanySettingsRoutes />
              </RequireAuth>
            </React.Suspense>
          }></Route>

        {/* Employee Group */}
        <Route
          path="/employee/*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RequireAuth>
                <EmployeeRoutes />
              </RequireAuth>
            </React.Suspense>
          }></Route>

        {/* Product Group  */}
        <Route
          path="/product/*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RequireAuth>
                <ProductRoutes />
              </RequireAuth>
            </React.Suspense>
          }></Route>

        {/* Order Group  */}
        <Route
          path="/order/*"
          element={
            <RequireAuth>
              <OrderRoutes />
            </RequireAuth>
          }></Route>

        {/* Subscription Group */}
        <Route
          path="/subscription/*"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <RequireAuth>
                <SubscriptionRoutes />
              </RequireAuth>
            </React.Suspense>
          }></Route>
        {/*/!* Components *!/*/}
        {/*<Route path="/component/modal" element={<ModalPage />}></Route>*/}
        {/*<Route path="/ecommerce/customers" element={<Customers />}></Route>*/}
        {/*<Route path="/ecommerce/orders" element={<Orders />}></Route>*/}
        {/*<Route path="/ecommerce/invoices" element={<Invoices />}></Route>*/}
        {/*<Route path="/ecommerce/shop" element={<Shop />}></Route>*/}
        {/*<Route path="/ecommerce/shop-2" element={<Shop2 />}></Route>*/}
        {/*<Route path="/ecommerce/product" element={<Product />}></Route>*/}
        {/*<Route path="/ecommerce/cart" element={<Cart />}></Route>*/}
        {/*<Route path="/ecommerce/cart-2" element={<Cart2 />}></Route>*/}
        {/*<Route path="/ecommerce/pay" element={<Pay />}></Route>*/}
        {/*<Route path="/campaigns" element={<Campaigns />}></Route>*/}
        {/*<Route path="/team/team-tabs" element={<TeamTabs />}></Route>*/}
        {/*<Route path="/team/team-tiles" element={<TeamTiles />}></Route>*/}
        {/*<Route path="/team/profile" element={<Profile />}></Route>*/}
        {/*<Route path="/messages" element={<Messages />}></Route>*/}
        {/*<Route path="/tasks" element={<Tasks />}></Route>*/}
        {/*<Route path="/inbox" element={<Inbox />}></Route>*/}
        {/*<Route path="/calendar" element={<Calendar />}></Route>*/}
        {/*<Route path="/settings/account" element={<Account />}></Route>*/}
        {/*<Route*/}
        {/*  path="/settings/notifications"*/}
        {/*  element={<Notifications />}*/}
        {/*></Route>*/}
        {/*<Route path="/settings/apps" element={<Apps />}></Route>*/}
        {/*<Route path="/settings/plans" element={<Plans />}></Route>*/}
        {/*<Route path="/settings/billing" element={<Billing />}></Route>*/}
        {/*<Route path="/settings/feedback" element={<Feedback />}></Route>*/}
        {/*<Route path="/utility/changelog" element={<Changelog />}></Route>*/}
        {/*<Route path="/utility/roadmap" element={<Roadmap />}></Route>*/}
        {/*<Route path="/utility/faqs" element={<Faqs />}></Route>*/}
        {/*<Route path="/utility/empty-state" element={<EmptyState />}></Route>*/}
        {/*<Route path="/utility/404" element={<PageNotFound />}></Route>*/}
        <Route path="/signin" element={<Signin />}></Route>
        {/* <Route path="/admin/signin" element={<SigninUser />}></Route>
        <Route path="/signup" element={<Signup />}></Route> */}
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </>
  );
};

export default App;
