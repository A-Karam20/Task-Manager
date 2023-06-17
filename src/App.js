import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
import Home from './Main/Home.js';
import LogIn from './Account/LogIn.js';
import CreateAccount from './Account/CreateAccount.js';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from './AuthorizeRouting/ProtectedRoutes';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
      <Home mainText="Manage your tasks" />
      </>
    },
    {
      path: '/login',
      element: (
        <>
          <Home mainText="Log In" />
          <LogIn />
        </>
      )
    },
    {
      path: '/createaccount',
      element: (
        <>
          <Home mainText="Create Account" />
          <CreateAccount />
        </>
      )
    },
    {
      path: '/TaskManager',
      element: (
        <ProtectedRoutes/>
      )
    },
    {
      path: '/AddTask',
      element: (
        <ProtectedRoutes/>
      )
    }
  ])

  return <>
    <RouterProvider router = {router}></RouterProvider>
    <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
  </>;
}

export default App;

