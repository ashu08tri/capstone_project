import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import Login, { action as loginAction } from './pages/Login';
import Register from './pages/Register';
import AdminDashBoard, { loader as usersLoader } from './pages/AdminDashBoard';
import CustomerDashBoard, { loader as userLoader } from './pages/CustomerDashBoard';
import Profile, { loader as customerLoader } from './pages/Profile';
import Transactions, { loader as transactionLoader } from './pages/Transactions';
import AdminTransview, { loader as adminTransLoader } from './pages/AdminTransview';
import Requests, {loader as requestLoader} from './pages/Requests';

function App() {
  const route = createBrowserRouter([
    {
      path: '/', element: <Root />, errorElement: <ErrorPage />, children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login />, action: loginAction },
        { path: 'register', element: <Register /> },
        { path: 'admin_dashboard', element: <AdminDashBoard />, loader: usersLoader },
        { path: 'customer_dashboard', element: <CustomerDashBoard />, loader: userLoader },
        {
          path: '/customer/:id', children: [
            { index: true, element: <Profile />, loader: customerLoader },
            { path: 'transaction', element: <Transactions />, loader: transactionLoader }
          ]
        },
        { path: '/requests', element: <Requests />, loader: requestLoader },
        { path: 'admintransview/:id', element: <AdminTransview />, loader: adminTransLoader }
      ]
    }

  ])

  return (
    <RouterProvider router={route}></RouterProvider>
  )
}

export default App;
